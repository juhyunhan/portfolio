export type NavItem = {
  label: string
  href: string
}

export type ProjectBlock = {
  title: string
  items: string[]
  layout: 'grid' | 'list'
}

export type ProjectImage = {
  label: string
  src: string
  aspectClass: string
  kind?: 'placeholder' | 'image'
  fit?: 'cover' | 'contain'
}

export type ProjectPublication = {
  title: string
  venue: string
  year: string
  keywords: string[]
  link: string
}

export type ProjectAward = {
  title: string
  event: string
  organization: string
  year: string
}

export type ProjectLink = {
  label: string
  href: string
  download?: boolean
}

export type Project = {
  id: string
  title: string
  subtitle?: string
  description: string
  detailBlocks: ProjectBlock[]
  pipeline?: string[]
  images: ProjectImage[]
  imagesPosition?: 'side' | 'bottom'
  keywords: string[]
  externalLinks?: ProjectLink[]
  relatedPublicationsIntro?: string
  relatedPublications?: ProjectPublication[]
  relatedAwardsIntro?: string
  relatedAwards?: ProjectAward[]
  note: string
}

export type Publication = {
  title: string
  venue: string
  year: string
  keywords: string[]
  link: string
}

export type PublicationGroup = {
  category: string
  showLinks?: boolean
  items: Publication[]
}

export type Award = {
  title: string
  event: string
  organization: string
  year: string
  relatedProject?: string
  linkLabel?: string
  linkHref?: string
}

export type SkillCategory = {
  category: string
  items: string[]
}

export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const heroKeywords = [
  'Computer Vision',
  'Multimodal Learning',
  'LLM',
  'VLM',
  'Fine-tuning',
  'prompt engineering',
  'RAG',
  'QLoRA',
]

export const projects: Project[] = [
  {
    id: 'vlm-scene-text',
    title: 'VLM 기반 한국어 현수막 OCR 및 유형 분류 성능 분석',
    subtitle: 'ETRI Visual Intelligence Lab Research Intern',
    description:
      '한국어 현수막 이미지의 OCR 및 유형 분류 성능을 분석하기 위해 여러 VLM 후보 모델을 비교하고, Qwen2.5-VL-3B-Instruct를 기반으로 fine-tuning, structured prompt 설계, benchmark evaluation을 수행했습니다.',
    detailBlocks: [
      {
        title: 'My Role',
        layout: 'grid',
        items: [
          'VLM 후보 모델 비교 및 최종 모델 선정',
          'OCR 전용 및 OCR+근거+분류 통합형 prompt 설계',
          'Qwen2.5-VL-3B-Instruct 기반 Vision-only fine-tuning',
          'Crop / Flat / Warp 데이터 조합별 성능 비교',
          'CoT 적용 여부에 따른 출력 품질 및 분류 근거 분석',
          'Detection / Segmentation / Warping / VLM 파이프라인 효과 분석',
        ],
      },
    ],
    pipeline: [
      'Banner Image',
      'Detection',
      'Segmentation / Warping',
      'Structured Prompt',
      'Qwen2.5-VL-3B Inference / Fine-tuned Checkpoint',
      'OCR Output & Type Classification',
      'Error Analysis',
    ],
    images: [
      {
        label: 'Qwen baseline 대비 OCR 개선 예시',
        src: publicAsset('images/etri-banner-comparison.jpg'),
        aspectClass: 'aspect-[9/10]',
        kind: 'image',
        fit: 'contain',
      },
      {
        label: 'Direct Prompt와 Reasoning Prompt 설계 예시',
        src: publicAsset('images/etri-prompt-design.jpg'),
        aspectClass: 'aspect-[4/3]',
        kind: 'image',
      },
    ],
    imagesPosition: 'bottom',
    keywords: [
      'Qwen2.5-VL-3B',
      'VLM Fine-tuning',
      'Vision-only Tuning',
      'Structured Prompt',
      'CoT',
      'Detection',
      'Warping',
      'OCR+Classification',
      'Benchmark Evaluation',
      'HuggingFace',
      'PyTorch',
    ],
    relatedPublicationsIntro:
      '현수막 OCR 및 유형 분류 실험에서 분석한 데이터 구성 전략, CoT inference, reasoning-augmented VLM 설계는 아래 멀티모달 연구 성과로 이어졌습니다.',
    relatedPublications: [
      {
        title:
          'Data Composition Strategies and CoT Inference for VLM-based Korean Scene Text Recognition',
        venue: 'AISP',
        year: '2025',
        keywords: ['VLM', 'CoT', 'Korean Scene Text', 'Data Composition'],
        link: publicAsset('files/papers/AISP_2025_VLM_juhyeonHan.pdf'),
      },
      {
        title:
          'Reasoning-augmented Vision-Language Models for Improved Competency in Scene Text Recognition',
        venue: 'ICCE-Asia',
        year: '2025',
        keywords: ['VLM', 'Reasoning', 'Scene Text Recognition', 'Multimodal'],
        link: publicAsset('files/papers/ICCE_Asia_2025_VLM_juhyeonHan.pdf'),
      },
    ],
    note: '',
  },
  {
    id: 'legal-qlora-rag',
    title: 'QLoRA 기반 법률 LLM Fine-tuning 및 RetrievalQA 시스템',
    description:
      '법률 판례 PDF를 섹션 단위로 구조화하고 임베딩 기반 지식베이스를 구축한 뒤, QLoRA fine-tuning과 RetrievalQA pipeline을 결합하여 법률 문서 요약 및 질의응답 시스템을 개발했습니다. 사용자의 질문에 대해 관련 판례를 검색하고, 검색된 context를 바탕으로 LLM이 답변을 생성하도록 구성했습니다.',
    detailBlocks: [
      {
        title: '구성 요소',
        layout: 'list',
        items: [
          '법률 판례 PDF 텍스트 추출 및 전처리',
          '사실관계 / 법률적 판단 / 판결 섹션 구조화',
          '판례 번호 및 관련 법률 조항 metadata 추출',
          '문서 embedding 및 Vector DB 기반 검색',
          'QLoRA fine-tuning',
          'RetrievalQA chain 구성',
          'FastAPI 기반 streaming response API 구현',
        ],
      },
    ],
    pipeline: [
      'Legal PDF',
      'Text Extraction',
      'Section-based Preprocessing',
      'Metadata Extraction',
      'Embedding / Vector DB',
      'RetrievalQA',
      'QLoRA-tuned LLM',
      'FastAPI Streaming Response',
    ],
    images: [
      {
        label: '법률 AI 서비스 개요 및 앱 화면 예시',
        src: publicAsset('images/legal-ai-app-overview.jpg'),
        aspectClass: 'aspect-[2/1]',
        kind: 'image',
        fit: 'contain',
      },
      {
        label: '법률 리포트 생성 및 챗봇 인터페이스 예시',
        src: publicAsset('images/legal-ai-report-flow.jpg'),
        aspectClass: 'aspect-[2/1]',
        kind: 'image',
        fit: 'contain',
      },
    ],
    imagesPosition: 'bottom',
    keywords: [
      'QLoRA',
      'LLM Fine-tuning',
      'RetrievalQA',
      'RAG',
      'Prompt Engineering',
      'Domain Adaptation',
      'Data Preprocessing',
      'FastAPI',
      'Streaming Inference',
    ],
    externalLinks: [
      {
        label: '프로젝트 PDF 다운로드',
        href: publicAsset('files/projects/legal-ai-project.pdf'),
        download: true,
      },
    ],
    relatedAwardsIntro:
      '법률 도메인 LLM adaptation 및 RetrievalQA 구현 경험은 아래 수상 성과와도 연결됩니다.',
    relatedAwards: [
      {
        title: 'Grand Prize',
        event: 'AI Business Hackathon',
        organization: 'Korea Aerospace University',
        year: '2024',
      },
    ],
    note: '',
  },
  {
    id: 'event-rag-chatbot',
    title: 'LangChain 기반 행사 추천 RAG 챗봇 및 Conversational Agent',
    description:
      '행사 정보 CSV를 Document Loader로 처리하고 VectorStore에 저장한 뒤, RetrievalQA와 ConversationBufferWindowMemory를 결합해 사용자 질문에 맞는 행사 정보를 검색·추천하는 LangChain 기반 RAG 챗봇을 구현했습니다. 단순 질의응답보다 retrieval quality, prompt structure, context-aware response generation에 초점을 두었습니다.',
    detailBlocks: [
      {
        title: '주요 구현',
        layout: 'list',
        items: [
          'Document Loader 기반 CSV 데이터 처리',
          'OpenAIEmbeddings 기반 문서 embedding',
          'Pinecone VectorStore indexing 및 retrieval',
          'RetrievalQA chain 구성',
          'ChatPromptTemplate 기반 prompt 설계',
          'ConversationBufferWindowMemory 기반 대화 기록 관리',
          'Agent 기반 event.csv 정보 검색',
          'AsyncIteratorCallbackHandler 기반 streaming response 처리',
          'FastAPI 기반 프론트엔드 연동',
        ],
      },
    ],
    pipeline: [
      'Event CSV',
      'Document Loader',
      'Text Splitter',
      'Embedding',
      'Pinecone VectorStore',
      'Retriever',
      'RetrievalQA / Agent',
      'Streaming Response',
    ],
    images: [
      {
        label: 'CatchPlan 앱 주요 화면 및 추천 인터랙션 예시',
        src: publicAsset('images/catchplan-app-screens.jpg'),
        aspectClass: 'aspect-[16/10]',
        kind: 'image',
      },
      {
        label: '프로젝트 구현 화면 및 챗봇 인터페이스 예시',
        src: publicAsset('images/ict-project-app-screens.jpg'),
        aspectClass: 'aspect-[16/10]',
        kind: 'image',
      },
    ],
    imagesPosition: 'bottom',
    keywords: [
      'RAG',
      'LangChain',
      'RetrievalQA',
      'VectorStore',
      'Prompt Engineering',
      'Conversation Memory',
      'Agent',
      'Streaming Inference',
      'FastAPI',
    ],
    externalLinks: [
      {
        label: 'CatchPlan Android GitHub',
        href: 'https://github.com/VeritasKau/CatchPlan-Android',
      },
    ],
    relatedAwardsIntro:
      '행사 추천 RAG 챗봇 및 Conversational Agent 구현 경험은 아래 서비스/프로젝트 성과로 이어졌습니다.',
    relatedAwards: [
      {
        title: 'Grand Prize',
        event: 'Industry-Academia Project - CatchPlan App Launch',
        organization: 'Korea Aerospace University',
        year: '2023',
      },
      {
        title: 'Grand Prize',
        event: '2023 ICT Convergence Project Competition',
        organization: 'Korea Aerospace University',
        year: '2023',
      },
    ],
    note: '',
  },
]

export const publications: PublicationGroup[] = [
  {
    category: 'VLM / Multimodal Learning',
    showLinks: true,
    items: [
      {
        title:
          'Data Composition Strategies and CoT Inference for VLM-based Korean Scene Text Recognition',
        venue: 'AISP',
        year: '2025',
        keywords: ['VLM', 'CoT', 'Korean Scene Text', 'Data Composition'],
        link: publicAsset('files/papers/AISP_2025_VLM_juhyeonHan.pdf'),
      },
      {
        title:
          'Reasoning-augmented Vision-Language Models for Improved Competency in Scene Text Recognition',
        venue: 'ICCE-Asia',
        year: '2025',
        keywords: ['VLM', 'Reasoning', 'Scene Text Recognition', 'Multimodal'],
        link: publicAsset('files/papers/ICCE_Asia_2025_VLM_juhyeonHan.pdf'),
      },
    ],
  },
  {
    category: 'Computer Vision / Remote Sensing',
    showLinks: false,
    items: [
      {
        title: 'Stage-Dependent Frequency-Domain Refinement for SAR Object Detection',
        venue: 'IGARSS',
        year: '2026',
        keywords: ['SAR', 'Object Detection', 'Frequency Domain'],
        link: '#',
      },
      {
        title:
          '2 in 1: A Dual-Purpose Approach for EO-SAR Ship Detection with Source-Free Domain Adaptation',
        venue: 'ICASSP',
        year: '2026',
        keywords: ['EO-SAR', 'Ship Detection', 'Domain Adaptation'],
        link: '#',
      },
      {
        title:
          'Enhancing SAR Semi-Supervised Ship Detection with Hard-Sigmoid Weighted Pseudo-Labels and Space-Frequency-Selection Convolution',
        venue: 'ICEIC',
        year: '2026',
        keywords: ['SAR', 'Semi-Supervised Learning', 'Ship Detection'],
        link: '#',
      },
      {
        title: 'Deep Spiking Neural Network for Energy-Efficient SAR Ship Detection',
        venue: 'IEEE GRSL',
        year: '2025',
        keywords: ['SNN', 'SAR', 'Energy-Efficient AI'],
        link: '#',
      },
      {
        title:
          'An Enhanced Object Detection Model Combining Energy-Efficient Spiking Neural Networks and Bidirectional Feature Pyramid Networks',
        venue: 'Journal of Broadcast Engineering',
        year: '2025',
        keywords: ['Object Detection', 'SNN', 'Feature Pyramid Network'],
        link: '#',
      },
      {
        title: 'Frequency-Domain Feature Refinement for HiViT-FPN Based SAR Object Detection',
        venue: 'Journal of Broadcast Engineering',
        year: '2025',
        keywords: ['SAR', 'HiViT', 'Frequency Domain'],
        link: '#',
      },
    ],
  },
]

export const awards: Award[] = [
  {
    title: 'Grand Prize',
    event: 'AI Business Hackathon',
    organization: 'Korea Aerospace University',
    year: '2024',
    relatedProject: 'QLoRA 기반 법률 LLM Fine-tuning 및 RetrievalQA 시스템',
  },
  {
    title: 'Grand Prize',
    event: 'Industry-Academia Project - CatchPlan App Launch',
    organization: 'Korea Aerospace University',
    year: '2023',
    relatedProject: 'LangChain 기반 행사 추천 RAG 챗봇 및 Conversational Agent',
    linkLabel: 'CatchPlan Android GitHub',
    linkHref: 'https://github.com/VeritasKau/CatchPlan-Android',
  },
  {
    title: 'Grand Prize',
    event: '2023 ICT Convergence Project Competition',
    organization: 'Korea Aerospace University',
    year: '2023',
    relatedProject: 'LangChain 기반 행사 추천 RAG 챗봇 및 Conversational Agent',
    linkLabel: 'PDF 다운로드',
    linkHref: publicAsset('files/awards/2023_ICT_Convergence_Project_Competition_Grand_Prize.pdf'),
  },
]

export const skills: SkillCategory[] = [
  {
    category: 'LLM & Multimodal AI',
    items: [
      'HuggingFace Transformers',
      'LoRA / QLoRA fine-tuning',
      'Prompt Engineering',
      'Vision-Language Models',
      'RAG / LangChain',
      'Model Evaluation',
    ],
  },
  {
    category: 'Deep Learning',
    items: ['PyTorch', 'TensorFlow'],
  },
  {
    category: 'Backend & Data',
    items: [
      'FastAPI',
      'REST API',
      'Pandas',
      'NumPy',
      'JSON-based inference pipeline',
    ],
  },
  {
    category: 'Computer Vision',
    items: ['Object Detection', 'OpenCV', 'SAR image processing'],
  },
]
