import { useEffect, useState } from 'react'
import { awards, projects, publicAsset, publications, skills } from './data'

const Arrow = () => <span aria-hidden="true">↗</span>

const researchNav = [
  { label: '연구', href: '#research' },
  { label: '논문', href: '#publications' },
  { label: '경험', href: '#experience' },
  { label: '프로젝트', href: '#projects' },
  { label: '수상', href: '#awards' },
]

const focusAreas = [
  {
    index: '01',
    title: 'Vision-Language Models',
    korean: '한국어 장면문자 인식',
    description: '현수막 영역 검출과 왜곡 보정, 데이터 구성, CoT 추론이 VLM의 OCR·유형 분류 성능에 미치는 영향을 분석했습니다.',
    tags: ['Qwen2.5-VL', 'Scene Text', 'CoT', 'Fine-tuning'],
    output: 'AISP 2025 · ICCE-Asia 2025',
    image: publicAsset('images/etri-banner-comparison.jpg'),
  },
  {
    index: '02',
    title: 'Remote Sensing Vision',
    korean: 'SAR 객체·선박 탐지',
    description: '주파수 영역 특징 보정, 도메인 적응, 준지도 학습과 SNN을 활용한 SAR 객체 탐지 연구를 수행했습니다.',
    tags: ['SAR', 'Object Detection', 'Domain Adaptation', 'SNN'],
    output: 'IGARSS · ICASSP · IEEE GRSL',
  },
]

const appliedProjects = [projects[1], projects[2]]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <div className="research-site">
    <header className="research-header">
      <a className="research-brand" href="#top"><span>JH</span><b>JUHYEON HAN</b></a>
      <nav className={menuOpen ? 'open' : ''}>{researchNav.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</nav>
      <div className="research-header-actions">
        <button onClick={() => setDark(!dark)} aria-label={`${dark ? '라이트' : '다크'} 테마로 전환`}>{dark ? '☼' : '◐'}</button>
        <button className="research-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기">{menuOpen ? '×' : '☰'}</button>
      </div>
    </header>

    <main id="top">
      <section className="research-hero">
        <div className="research-hero-copy reveal is-visible">
          <p className="research-kicker">MULTIMODAL AI · COMPUTER VISION</p>
          <h1>Juhyeon Han</h1>
          <h2>VLM과 원격탐사 연구</h2>
          <p className="research-hero-text">한국어 장면문자 인식과 SAR 객체 탐지를 연구합니다.</p>
          <div className="research-profile-line"><span>한국항공대학교 인공지능학과 석사과정</span><span>ETRI Visual Intelligence Lab 인턴</span></div>
          <div className="research-hero-actions"><a className="research-primary" href="#publications">논문 보기 <span>↓</span></a><a href="mailto:hjh5842@kau.kr">hjh5842@kau.kr <Arrow /></a></div>
        </div>
        <div className="research-hero-visual reveal is-visible">
          <div className="research-visual-head"><span>SELECTED RESEARCH</span><b>2025 — 2026</b></div>
          <img src={publicAsset('images/etri-banner-comparison.jpg')} alt="VLM 기반 한국어 장면문자 인식 결과" />
          <div className="research-visual-caption"><span>VLM · SCENE TEXT</span><p>Data composition and reasoning for Korean scene text recognition</p></div>
          <div className="research-counts"><div><strong>08</strong><span>PUBLICATIONS</span></div><div><strong>02</strong><span>VLM PAPERS</span></div><div><strong>06</strong><span>CV · SAR PAPERS</span></div></div>
        </div>
      </section>

      <section id="research" className="research-section">
        <div className="research-section-head reveal"><p><span>01</span> RESEARCH FOCUS</p><h2>연구 분야</h2></div>
        <div className="focus-grid">
          {focusAreas.map((area) => <article className={`focus-card focus-${area.index} reveal`} key={area.title}>
            <div className="focus-copy"><span className="focus-index">{area.index}</span><p>{area.title}</p><h3>{area.korean}</h3><div className="focus-tags">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="focus-description">{area.description}</p><b>{area.output}</b></div>
            {area.image ? <img src={area.image} alt="한국어 장면문자 인식 연구 결과" /> : <div className="sar-visual" aria-label="SAR 연구 시각화"><span>SAR</span><i /><i /><i /><b>FREQUENCY · DOMAIN · DETECTION</b></div>}
          </article>)}
        </div>
      </section>

      <section id="publications" className="research-section publication-showcase">
        <div className="research-section-head reveal"><p><span>02</span> PUBLICATIONS</p><h2>연구 논문 <em>08</em></h2></div>
        {publications.map((group) => <div className="research-paper-group reveal" key={group.category}>
          <div className="research-paper-category"><p>{group.category}</p><span>{String(group.items.length).padStart(2, '0')} PAPERS</span></div>
          <div>{group.items.map((paper, index) => <article className="research-paper" key={paper.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><p>{paper.venue} · {paper.year}</p><h3>{paper.title}</h3><div>{paper.keywords.slice(0, 3).map((keyword) => <small key={keyword}>{keyword}</small>)}</div></div>
            {paper.link !== '#' && group.showLinks !== false ? <a href={paper.link} target="_blank" rel="noreferrer" aria-label={`${paper.title} PDF 보기`}><Arrow /></a> : <b>게재</b>}
          </article>)}</div>
        </div>)}
      </section>

      <section id="experience" className="research-section experience-section">
        <div className="research-section-head reveal"><p><span>03</span> RESEARCH EXPERIENCE</p><h2>연구 경험</h2></div>
        <div className="experience-grid">
          <article className="experience-card reveal"><div><span>ETRI</span><small>인턴</small></div><h3>Visual Intelligence Lab</h3><p>Qwen2.5-VL 후보 모델 비교, Vision-only fine-tuning, 구조화 프롬프트 설계와 데이터 구성별 성능 평가를 수행했습니다.</p><ul><li>현수막 OCR·유형 분류</li><li>Detection·Segmentation·Warping 전처리</li><li>CoT 적용 및 오류 분석</li></ul></article>
          <article className="experience-card reveal"><div><span>KAU</span><small>석사과정</small></div><h3>Department of Artificial Intelligence</h3><p>멀티모달 학습과 컴퓨터 비전, 원격탐사 영상을 중심으로 객체 탐지와 도메인 적응 연구를 수행하고 있습니다.</p><ul><li>VLM · Multimodal Learning</li><li>SAR Object Detection</li><li>Frequency-domain Refinement</li></ul></article>
        </div>
        <div className="research-method reveal"><span>RESEARCH WORKFLOW</span><div><b>01</b><p>문제 정의</p></div><i>→</i><div><b>02</b><p>데이터·모델 설계</p></div><i>→</i><div><b>03</b><p>학습·비교 실험</p></div><i>→</i><div><b>04</b><p>정량·오류 분석</p></div></div>
      </section>

      <section id="projects" className="research-section applied-section">
        <div className="research-section-head reveal"><p><span>04</span> APPLIED AI</p><h2>응용 프로젝트</h2></div>
        <div className="applied-grid">{appliedProjects.map((project, index) => <article className="applied-card reveal" key={project.id}>
          <img src={project.images[0].src} alt={project.images[0].label} />
          <div><span>0{index + 1}</span><p>{index === 0 ? 'LEGAL AI' : 'MOBILE AI SERVICE'}</p><h3>{index === 0 ? '법률 LLM·RAG 질의응답' : 'CatchPlan'}</h3><small>{project.subtitle}</small><div className="applied-tags">{project.keywords.slice(0, 4).map((keyword) => <b key={keyword}>{keyword}</b>)}</div>{project.externalLinks?.[0] && <a href={project.externalLinks[0].href} target="_blank" rel="noreferrer">관련 자료 <Arrow /></a>}</div>
        </article>)}</div>
      </section>

      <section id="awards" className="research-section result-section">
        <div className="research-section-head reveal"><p><span>05</span> AWARDS · SKILLS</p><h2>성과와 역량</h2></div>
        <div className="result-layout">
          <div className="research-awards">{awards.map((award) => <article className="reveal" key={award.event}><span>{award.year}</span><div><b>대상</b><h3>{award.event}</h3><p>{award.organization}</p></div></article>)}</div>
          <div className="research-skills reveal">{skills.map((group) => <div key={group.category}><h3>{group.category}</h3><p>{group.items.join(' · ')}</p></div>)}</div>
        </div>
      </section>

      <section className="research-contact"><p>CONTACT</p><h2>Juhyeon Han</h2><a href="mailto:hjh5842@kau.kr">hjh5842@kau.kr <Arrow /></a><a href="tel:+821089372753">010-8937-2753</a></section>
    </main>
    <footer className="research-footer"><span>JUHYEON HAN · AI RESEARCHER</span><a href="#top">맨 위로 ↑</a></footer>
  </div>
}

export default App
