import { useEffect, useState } from 'react'
import { awards, navItems, projects, publicAsset, publications, skills, type Project } from './data'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
const Tag = ({ children }: { children: string }) => <span className="tag">{children}</span>

function SectionHeading({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading reveal"><div className="section-kicker"><span>{index}</span>{eyebrow}</div><div><h2>{title}</h2>{copy && <p>{copy}</p>}</div></div>
}

function HeroVisuals() {
  return <div className="hero-visual" aria-label="Featured Legal AI web application">
    <figure className="hero-product">
      <div className="product-bar"><span /><span /><span /><b>LEGAL AI · DOCUMENT INTELLIGENCE</b></div>
      <img src={publicAsset('images/legal-ai-app-overview.jpg')} alt="Legal AI document intelligence web application" />
      <figcaption><div><i />FEATURED PRODUCT</div><p>QLoRA fine-tuning · RetrievalQA · FastAPI streaming</p></figcaption>
    </figure>
    <div className="hero-product-note"><span>01</span><p>From legal PDF processing<br />to a usable AI web experience.</p></div>
  </div>
}

const projectPresentation: Record<string, { title: string; domain: string; summary: string; why: string; what: string; how: string; result: string }> = {
  'legal-qlora-rag': {
    title: 'QLoRA-based Legal LLM & RetrievalQA System',
    domain: 'AI Web Application',
    summary: 'A domain-adapted legal intelligence system connecting structured document processing to a streaming web experience.',
    why: '길고 구조가 일정하지 않은 법률 판례 PDF. 필요한 사실관계와 판단 근거를 빠르게 찾기 어려운 문제.',
    what: '판례 섹션 구조화, QLoRA 도메인 적응 LLM, RetrievalQA를 결합한 법률 문서 질의응답 웹 애플리케이션.',
    how: 'PDF 텍스트 추출, 섹션 분리, 메타데이터·임베딩 검색, QLoRA LLM 생성, FastAPI 스트리밍 응답을 단일 파이프라인으로 구성.',
    result: '2024 AI Business Hackathon Grand Prize. 프로젝트 PDF와 실제 애플리케이션 화면 보유.',
  },
  'event-rag-chatbot': {
    title: 'CatchPlan — RAG-Powered Conversational Agent',
    domain: 'Released Mobile Product',
    summary: 'An event discovery app released as a real mobile product, featuring a RAG-powered conversational recommendation agent.',
    why: '여러 곳에 흩어진 행사 정보. 원하는 일정과 조건에 맞는 행사를 한 번에 탐색하기 어려운 문제.',
    what: '캘린더와 행사 탐색, 대화형 추천을 결합하고 실제 출시까지 진행한 CatchPlan 모바일 앱.',
    how: '행사 CSV 문서화, OpenAI Embeddings, Pinecone 검색, RetrievalQA·Agent, FastAPI 스트리밍 연동.',
    result: '모바일 앱 실제 출시. 2023 산학프로젝트 및 ICT 융합 프로젝트 경진대회 Grand Prize.',
  },
  'vlm-scene-text': {
    title: 'VLM Fine-tuning & Structured Prompt Optimization',
    domain: 'Multimodal AI Research',
    summary: 'A multimodal research pipeline for Korean scene-text recognition, structured prompting, and model evaluation.',
    why: '비정형 배치, 원근 왜곡, 복잡한 배경이 섞인 한국어 현수막. OCR과 유형 분류를 동시에 처리하기 어려운 문제.',
    what: 'Qwen2.5-VL-3B-Instruct 기반 데이터 구성, Vision-only fine-tuning, 구조화 프롬프트·CoT 비교 연구.',
    how: 'Detection·Segmentation·Warping 전처리, 구조화 프롬프트, VLM 추론, OCR·분류 평가, 오류 분석 파이프라인.',
    result: 'ETRI Visual Intelligence Lab 인턴 연구. AISP 2025·ICCE-Asia 2025 논문 2편.',
  },
}

function ProjectOverview({ orderedProjects }: { orderedProjects: Project[] }) {
  return <div className="work-overview reveal">
    {orderedProjects.map((project, index) => {
      const presentation = projectPresentation[project.id]
      return <a href={`#${project.id}`} className="overview-card" key={project.id}>
        <div className={`overview-images ${project.images.length === 1 ? 'single' : ''}`}>
          <img src={project.images[0].src} alt="" />
          {project.images[1] && <img src={project.images[1].src} alt="" />}
        </div>
        <div><span>0{index + 1} · {presentation.domain}</span><h3>{presentation.title}</h3><b>View project ↓</b></div>
      </a>
    })}
  </div>
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const presentation = projectPresentation[project.id]
  return <article id={project.id} className={`project-card reveal project-${index + 1}`}>
    <div className="project-copy"><div className="project-number">0{index + 1} <span>/ ENGINEERING CASE STUDY</span></div><p className="project-domain">{presentation.domain}</p><h3>{presentation.title}</h3>{project.subtitle && <p className="project-affiliation">{project.subtitle}</p>}<p className="project-summary">{presentation.summary}</p><div className="tag-row">{project.keywords.slice(0, 5).map((item) => <Tag key={item}>{item}</Tag>)}</div></div>
    <div className={`project-media ${project.images[1] ? 'has-secondary' : 'single-media'}`}><img className="project-image-main" src={project.images[0].src} alt={project.images[0].label} loading="lazy" />{project.images[1] && <div className="project-image-secondary"><img src={project.images[1].src} alt={project.images[1].label} loading="lazy" /><small>MORE PROJECT VISUALS</small></div>}<span className="media-label">REAL PROJECT ASSETS · 0{index + 1}</span></div>
    <div className="case-study always-visible">
      <div className="project-story">
        <article><span>01</span><h4>문제</h4><p>{presentation.why}</p></article>
        <article><span>02</span><h4>결과물</h4><p>{presentation.what}</p></article>
        <article><span>03</span><h4>구현</h4><p>{presentation.how}</p></article>
        <article><span>04</span><h4>성과</h4><p>{presentation.result}</p></article>
      </div>
      <div className="project-overview-copy"><span>PROJECT OVERVIEW</span><p>{project.description}</p></div>
      {project.pipeline && <div className="architecture"><span>SYSTEM ARCHITECTURE</span><div className="pipeline" aria-label="System architecture">{project.pipeline.map((step, stepIndex) => <div key={step}><b>{String(stepIndex + 1).padStart(2, '0')}</b><span>{step}</span></div>)}</div></div>}
      <div className="case-grid implementation-grid">{project.detailBlocks.map((block) => <div key={block.title}><span>MY CONTRIBUTIONS · {block.title}</span><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
      <div className="case-links">{project.externalLinks?.map((link) => <a key={link.href} href={link.href} target={link.download ? undefined : '_blank'} rel="noreferrer">{link.label} <Arrow diagonal /></a>)}{project.relatedPublications?.map((paper) => <a key={paper.title} href={paper.link} target="_blank" rel="noreferrer">{paper.venue} {paper.year} PDF <Arrow diagonal /></a>)}</div>
    </div>
  </article>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible') }), { threshold: 0.1 }); document.querySelectorAll('.reveal').forEach((element) => observer.observe(element)); return () => observer.disconnect() }, [])
  const orderedProjects = [projects[1], projects[2], projects[0]]
  return <div className="site-shell">
    <header className="site-header"><a className="brand" href="#top" aria-label="Juhyeon Han home"><span>JH</span><b>JUHYEON HAN</b></a><nav className={menuOpen ? 'nav-open' : ''} aria-label="Primary navigation">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</nav><div className="header-actions"><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>{dark ? '☼' : '◐'}</button><span className="resume-missing" title="Resume file is not included in the repository">Resume <small>FILE NEEDED</small></span><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button></div></header>
    <main id="top">
      <section className="hero" id="about"><div className="hero-copy reveal is-visible"><h1 className="portfolio-name"><span>Juhyeon</span><span>Han</span></h1><h2 className="hero-role">AI Engineer & Researcher</h2><div className="hero-contact"><a href="mailto:hjh5842@kau.kr"><span>EMAIL</span>hjh5842@kau.kr</a><a href="tel:+821089372753"><span>PHONE</span>010-8937-2753</a></div><div className="identity-facts"><span><b>KAU</b> 인공지능학과 석사과정</span><span><b>ETRI</b> Visual Intelligence Lab 인턴 경험</span><span><b>BASED IN</b> Seoul, Korea</span></div><div className="hero-actions"><a className="button-primary" href="#projects">프로젝트 보기 <Arrow /></a></div><div className="hero-stack"><span>INTERESTS</span><p>VLM · Legal LLM · RAG · FastAPI · PyTorch · Evaluation</p></div></div><HeroVisuals /><div className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></div></section>
      <section id="projects" className="section-wrap"><SectionHeading index="01" eyebrow="Selected work" title="Projects" copy="주요 프로젝트를 문제, 결과물, 구현, 성과 순서로 정리했습니다." /><ProjectOverview orderedProjects={orderedProjects} /><div className="projects-list">{orderedProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></section>
      <section id="publications" className="section-wrap publications-section"><SectionHeading index="02" eyebrow="Research · 08" title="Publications" copy="멀티모달 AI와 원격탐사 분야의 연구 성과입니다." />{publications.map((group) => <div className="publication-group reveal" key={group.category}><div className="publication-category"><h3>{group.category}</h3><span>{String(group.items.length).padStart(2, '0')} PUBLICATIONS</span></div><div>{group.items.map((paper, index) => <article className="publication-row" key={paper.title}><span className="paper-index">{String(index + 1).padStart(2, '0')}</span><div><p><b>PUBLICATION</b> · {paper.venue} · {paper.year}</p><h4>{paper.title}</h4><div className="paper-tags">{paper.keywords.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div></div>{paper.link !== '#' && group.showLinks !== false ? <a href={paper.link} target="_blank" rel="noreferrer" aria-label={`View paper: ${paper.title}`} title="View paper"><Arrow diagonal /></a> : <span className="publication-status">PUBLISHED</span>}</article>)}</div></div>)}</section>
      <section id="skills" className="section-wrap capabilities-section"><SectionHeading index="03" eyebrow="Capabilities" title="Technical Skills" copy="프로젝트와 연구에서 사용한 기술입니다." /><div className="capability-grid">{skills.map((skill, index) => <article className="capability-card reveal" key={skill.category}><span>0{index + 1}</span><h3>{skill.category}</h3><ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul><p>{index === 0 ? 'VLM + Legal AI' : index === 1 ? 'Research pipelines' : index === 2 ? 'Legal AI + CatchPlan' : 'SAR research'}</p></article>)}</div></section>
      <section id="awards" className="section-wrap awards-section"><SectionHeading index="04" eyebrow="Recognition" title="Awards" /><div className="award-grid">{awards.map((award, index) => <article className="award-card reveal" key={award.event}><div><span>{award.year}</span><b>0{index + 1}</b></div><p>GRAND PRIZE</p><h3>{award.event}</h3><small>{award.organization}</small>{award.linkHref && <a href={award.linkHref} target="_blank" rel="noreferrer">View evidence <Arrow diagonal /></a>}</article>)}</div></section>
    </main>
    <footer><div className="brand"><span>JH</span><b>JUHYEON HAN</b></div><p>AI ENGINEER & RESEARCHER · SEOUL</p><a href="#top">BACK TO TOP ↑</a></footer>
  </div>
}

export default App
