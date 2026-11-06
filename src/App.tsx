import { useEffect, useState } from 'react'
import { awards, navItems, projects, publicAsset, publications, skills, type Project } from './data'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
const Tag = ({ children }: { children: string }) => <span className="tag">{children}</span>

function SectionHeading({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading reveal"><div className="section-kicker"><span>{index}</span>{eyebrow}</div><div><h2>{title}</h2>{copy && <p>{copy}</p>}</div></div>
}

function HeroVisuals() {
  return <div className="hero-visual" aria-label="법률 AI 웹 애플리케이션">
    <figure className="hero-product">
      <div className="product-bar"><span /><span /><span /><b>LEGAL AI · DOCUMENT INTELLIGENCE</b></div>
      <img src={publicAsset('images/legal-ai-app-overview.jpg')} alt="Legal AI document intelligence web application" />
      <figcaption><div><i />대표 프로젝트</div><p>법률 LLM · RAG · FastAPI</p></figcaption>
    </figure>
    <div className="hero-product-note"><span>01</span><p>판례 PDF 처리부터<br />실제 AI 서비스 구현까지</p></div>
  </div>
}

const projectPresentation: Record<string, { title: string; domain: string; summary: string; why: string; what: string; how: string; result: string }> = {
  'legal-qlora-rag': {
    title: '법률 LLM·RAG 질의응답 시스템',
    domain: '법률 AI 웹 서비스',
    summary: '판례 PDF를 구조화하고, 검색한 근거를 바탕으로 답변을 생성하는 법률 AI 웹 서비스입니다.',
    why: '긴 판례에서 사실관계와 판단 근거를 직접 찾는 데 시간이 많이 걸렸습니다.',
    what: '판례 검색, 요약, 근거 기반 질의응답을 하나의 웹 화면에서 제공했습니다.',
    how: 'PDF를 섹션별로 나누고 메타데이터와 임베딩을 저장했습니다. 검색 결과를 QLoRA로 학습한 LLM에 전달하고 FastAPI로 응답을 스트리밍했습니다.',
    result: '서비스 프로토타입을 완성하고 2024 AI Business Hackathon 대상을 수상했습니다.',
  },
  'event-rag-chatbot': {
    title: 'CatchPlan 행사 추천 챗봇',
    domain: '출시 모바일 서비스',
    summary: '전국 행사 탐색과 일정 관리, 대화형 추천을 결합해 실제 출시한 모바일 앱입니다.',
    why: '여러 곳에 흩어진 행사 정보 때문에 일정과 취향에 맞는 행사를 한 번에 찾기 어려웠습니다.',
    what: '행사 탐색, 캘린더, 대화형 추천 기능을 담은 CatchPlan 앱을 5인 팀으로 개발했습니다.',
    how: 'AI 담당으로 행사 데이터를 임베딩해 Pinecone에 저장하고, RetrievalQA와 Agent를 구성해 FastAPI 스트리밍 API로 앱과 연결했습니다.',
    result: '모바일 앱을 실제 출시하고 산학프로젝트와 ICT 융합 프로젝트 경진대회에서 대상을 수상했습니다.',
  },
  'vlm-scene-text': {
    title: 'VLM 기반 한국어 현수막 인식',
    domain: '멀티모달 AI 연구',
    summary: '한국어 현수막의 문자를 읽고 유형을 분류하기 위한 VLM 학습·평가 연구입니다.',
    why: '원근 왜곡과 복잡한 배경이 있는 현수막은 기존 OCR만으로 문자 인식과 유형 분류를 함께 처리하기 어려웠습니다.',
    what: 'Qwen2.5-VL-3B 기반 데이터 구성, Vision-only fine-tuning, 구조화 프롬프트와 CoT 비교 실험을 수행했습니다.',
    how: '영역 검출과 왜곡 보정 후 VLM이 OCR과 분류 결과를 함께 출력하도록 구성하고, 데이터 조합별 성능과 오류를 분석했습니다.',
    result: 'ETRI 인턴 연구 결과를 AISP 2025와 ICCE-Asia 2025 논문 2편으로 발표했습니다.',
  },
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const presentation = projectPresentation[project.id]
  const image = project.id === 'legal-qlora-rag' && project.images[1] ? project.images[1] : project.images[0]
  return <article id={project.id} className={`project-card reveal project-${index + 1}`}>
    <div className="project-copy"><div className="project-number">0{index + 1} <span>/ 프로젝트 사례</span></div><p className="project-domain">{presentation.domain}</p><h3>{presentation.title}</h3>{project.subtitle && <p className="project-affiliation">{project.subtitle}</p>}<p className="project-summary">{presentation.summary}</p><div className="tag-label">핵심 기술</div><div className="tag-row">{project.keywords.slice(0, 4).map((item) => <Tag key={item}>{item}</Tag>)}</div></div>
    <div className="project-media single-media"><img className="project-image-main" src={image.src} alt={image.label} loading="lazy" /><span className="media-label">프로젝트 이미지 · 0{index + 1}</span></div>
    <div className="case-study always-visible">
      <div className="project-story">
        <article><span>01</span><h4>문제</h4><p>{presentation.why}</p></article>
        <article><span>02</span><h4>결과물</h4><p>{presentation.what}</p></article>
        <article><span>03</span><h4>구현</h4><p>{presentation.how}</p></article>
        <article><span>04</span><h4>성과</h4><p>{presentation.result}</p></article>
      </div>
      <div className="project-overview-copy"><span>프로젝트 설명</span><p>{project.description}</p></div>
      {project.pipeline && <div className="architecture"><span>구현 흐름</span><div className="pipeline" aria-label="구현 흐름">{project.pipeline.map((step, stepIndex) => <div key={step}><b>{String(stepIndex + 1).padStart(2, '0')}</b><span>{step}</span></div>)}</div></div>}
      <div className="case-grid implementation-grid">{project.detailBlocks.map((block) => <div key={block.title}><span>{block.title}</span><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
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
    <header className="site-header"><a className="brand" href="#top" aria-label="한주현 포트폴리오 홈"><span>JH</span><b>JUHYEON HAN</b></a><nav className={menuOpen ? 'nav-open' : ''} aria-label="주요 메뉴">{navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</nav><div className="header-actions"><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`${dark ? '라이트' : '다크'} 테마로 전환`}>{dark ? '☼' : '◐'}</button><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기">{menuOpen ? '×' : '☰'}</button></div></header>
    <main id="top">
      <section className="hero" id="about"><div className="hero-copy reveal is-visible"><p className="hero-kicker">AI ENGINEER · MULTIMODAL AI RESEARCHER</p><h1 className="portfolio-name"><span>Juhyeon</span><span>Han</span></h1><h2 className="hero-role">VLM을 연구하고,<br />LLM 서비스를 구현합니다.</h2><p className="hero-intro">한국항공대학교 인공지능학과 석사과정에서 멀티모달 AI를 연구하며, ETRI 인턴과 실제 출시 프로젝트를 경험했습니다.</p><div className="identity-facts"><span><b>KAU</b> 인공지능학과 석사과정</span><span><b>ETRI</b> Visual Intelligence Lab 인턴</span><span><b>SEOUL</b> 대한민국</span></div><div className="hero-contact"><a href="mailto:hjh5842@kau.kr"><span>이메일</span>hjh5842@kau.kr</a><a href="tel:+821089372753"><span>연락처</span>010-8937-2753</a></div><div className="hero-actions"><a className="button-primary" href="#projects">프로젝트 보기 <Arrow /></a></div></div><HeroVisuals /><div className="scroll-cue">아래로 스크롤 <span>↓</span></div></section>
      <section id="projects" className="section-wrap"><SectionHeading index="01" eyebrow="주요 작업" title="프로젝트" copy="무엇을 해결했고, 어떤 역할을 맡아, 어떻게 구현했는지 정리했습니다." /><div className="projects-list">{orderedProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div></section>
      <section id="publications" className="section-wrap publications-section"><SectionHeading index="02" eyebrow="연구 · 08" title="연구 논문" copy="멀티모달 AI와 원격탐사 분야의 연구 성과입니다." />{publications.map((group) => <div className="publication-group reveal" key={group.category}><div className="publication-category"><h3>{group.category}</h3><span>논문 {String(group.items.length).padStart(2, '0')}편</span></div><div>{group.items.map((paper, index) => <article className="publication-row" key={paper.title}><span className="paper-index">{String(index + 1).padStart(2, '0')}</span><div><p><b>논문</b> · {paper.venue} · {paper.year}</p><h4>{paper.title}</h4><div className="paper-tags">{paper.keywords.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div></div>{paper.link !== '#' && group.showLinks !== false ? <a href={paper.link} target="_blank" rel="noreferrer" aria-label={`${paper.title} 논문 보기`} title="논문 보기"><Arrow diagonal /></a> : <span className="publication-status">게재</span>}</article>)}</div></div>)}</section>
      <section id="skills" className="section-wrap capabilities-section"><SectionHeading index="03" eyebrow="역량" title="기술" copy="프로젝트와 연구에서 직접 사용한 기술입니다." /><div className="capability-grid">{skills.map((skill, index) => <article className="capability-card reveal" key={skill.category}><span>0{index + 1}</span><h3>{skill.category}</h3><ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
      <section id="awards" className="section-wrap awards-section"><SectionHeading index="04" eyebrow="성과" title="수상" /><div className="award-grid">{awards.map((award, index) => <article className="award-card reveal" key={award.event}><div><span>{award.year}</span><b>0{index + 1}</b></div><p>대상</p><h3>{award.event}</h3><small>{award.organization}</small>{award.linkHref && <a href={award.linkHref} target="_blank" rel="noreferrer">관련 자료 보기 <Arrow diagonal /></a>}</article>)}</div></section>
    </main>
    <footer><div className="brand"><span>JH</span><b>JUHYEON HAN</b></div><p>AI ENGINEER · MULTIMODAL AI RESEARCHER</p><a href="#top">맨 위로 ↑</a></footer>
  </div>
}

export default App
