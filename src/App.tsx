import {
  awards,
  heroKeywords,
  navItems,
  projects,
  publicAsset,
  publications,
  skills,
  type ProjectBlock,
  type ProjectImage,
} from './data'

const cardClass =
  'rounded-[30px] border border-slate-200/90 bg-white/90 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.34)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_80px_-42px_rgba(15,23,42,0.38)]'

const sectionClass = 'scroll-mt-28'
const secondaryButtonClass =
  'inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-900'
const downloadButtonClass =
  'inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700'

const isPublicFile = (href: string) => href.includes('/files/') || href.startsWith('files/')

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-500">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}

function BadgeList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function ImagePlaceholder({ label, src, aspectClass, kind, fit }: ProjectImage) {
  if (kind === 'image') {
    return (
      <figure className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
        <div className={`overflow-hidden bg-slate-100 ${aspectClass}`}>
          <img
            src={src}
            alt={label}
            className={
              fit === 'contain'
                ? 'h-full w-full object-contain object-center p-3'
                : 'h-full w-full object-cover object-center'
            }
          />
        </div>
        <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600">
          {label}
        </figcaption>
      </figure>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-dashed border-slate-300 bg-slate-100 ${aspectClass}`}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(248, 250, 252, 0.94), rgba(226, 232, 240, 0.82)), url(${src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_38%)]" />
      <div className="relative flex h-full items-center justify-center p-6 text-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.08em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-xs text-slate-400">{src}</p>
        </div>
      </div>
    </div>
  )
}

function ProfileImageCard() {
  return (
    <div className="relative mx-auto w-full max-w-[14.5rem] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 aspect-[4/5] sm:max-w-[15.5rem]">
      <img
        src={publicAsset('images/profile-photo.jpg')}
        alt="Han Juhyeon profile"
        className="h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/10 via-slate-950/0 to-transparent" />
    </div>
  )
}

function ProjectBlockSection({ block }: { block: ProjectBlock }) {
  if (block.layout === 'grid') {
    return (
      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
          {block.title}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <div
              key={item}
              className="flex min-h-24 items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
            >
              <span className="break-keep text-pretty leading-7">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
        {block.title}
      </p>
      <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-700">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span className="leading-7">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 py-4">
            <a
              href="#about"
              className="font-serif text-xl font-semibold tracking-[0.03em] text-slate-900"
            >
              Han Juhyeon
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <nav className="scrollbar-hidden overflow-x-auto pb-3 md:hidden">
            <div className="flex min-w-max items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-500"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="pb-20 pt-28 sm:pt-32">
        <section
          id="about"
          className={`${sectionClass} mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.95fr)]">
            <div className={`${cardClass} p-8 sm:p-10 lg:p-12`}>
              <h1 className="font-serif text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Research Portfolio
              </h1>
              <div className="mt-6 text-xl font-semibold text-slate-800 sm:text-2xl">
                Han Juhyeon
              </div>
              <p className="mt-3 text-base font-medium text-slate-600 sm:text-lg">
                Fine-tuning · Prompt Engineering · Multimodal Evaluation · RAG
              </p>
              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                저는 한국항공대학교 AI 석사과정에서 컴퓨터비전과 멀티모달
                모델을 중심으로 연구하고 있습니다. ETRI 연구인턴 경험을 통해
                VLM fine-tuning, structured prompt engineering, 성능 평가
                파이프라인 구축을 수행했습니다. 학부 시기에는 LangChain 기반
                RAG 시스템과 QLoRA 기반 LLM 응용 프로젝트를 진행하며
                retrieval pipeline과 LLM application 구현 경험을 쌓았습니다.
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                최근에는 LLM/VLM이 실제 태스크에서 안정적으로 동작하기 위한
                prompt 설계, fine-tuning 전략, 평가 파이프라인에 관심을 두고
                있습니다. 특히 모델의 출력 일관성, reasoning 과정,
                task-specific adaptation을 분석하며 초거대 언어모델의 성능
                개선과 평가 방법을 더 깊이 연구하고자 합니다.
              </p>
              <div className="mt-8">
                <BadgeList items={heroKeywords} />
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  프로젝트 보기
                </a>
                <a
                  href="#publications"
                  className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                >
                  논문 및 성과 보기
                </a>
              </div>
            </div>

            <div className={`${cardClass} p-6 sm:p-7`}>
              <ProfileImageCard />
              <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Research Summary
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span className="leading-7 text-slate-700">
                      Computer Vision과 Multimodal Learning 기반 문제 정의 및
                      실험 설계
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span className="leading-7 text-slate-700">
                      VLM fine-tuning과 structured prompt engineering 수행
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span className="leading-7 text-slate-700">
                      LangChain, VectorStore 기반 RAG 시스템 구현 및 응답 품질
                      분석
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <span className="leading-7 text-slate-700">
                      QLoRA 기반 LLM 응용 프로젝트와 task-specific adaptation
                      실험
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className={`${sectionClass} mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8`}
        >
          <SectionHeader
            eyebrow="Main Projects"
            title="LLM/VLM 중심 프로젝트"
          />
          <div className="mt-10 space-y-8">
            {projects.map((project, index) => (
              <article key={project.id} className={`${cardClass} p-6 sm:p-8 lg:p-10`}>
                <div
                  className={
                    project.images.length > 0 && project.imagesPosition !== 'bottom'
                      ? 'grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]'
                      : ''
                  }
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Main Project 0{index + 1}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                      {project.title}
                    </h3>
                    {project.subtitle ? (
                      <p className="mt-3 text-base font-medium text-slate-500">
                        {project.subtitle}
                      </p>
                    ) : null}
                    <p className="mt-6 text-base leading-8 text-slate-600">
                      {project.description}
                    </p>

                    {project.detailBlocks.map((block) => (
                      <ProjectBlockSection key={block.title} block={block} />
                    ))}

                    {project.pipeline ? (
                      <div className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Pipeline
                        </p>
                        <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                          <div className="flex flex-wrap items-center gap-3">
                            {project.pipeline.map((step, stepIndex) => (
                              <div key={step} className="flex items-center gap-3">
                                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                                  {step}
                                </div>
                                {stepIndex < project.pipeline!.length - 1 ? (
                                  <span className="text-slate-400">→</span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-8">
                      <BadgeList items={project.keywords} />
                    </div>

                    {project.externalLinks?.length ? (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {project.externalLinks.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            download={link.download ? '' : undefined}
                            target={link.download ? undefined : '_blank'}
                            rel={link.download ? undefined : 'noreferrer'}
                            className={
                              link.download
                                ? downloadButtonClass
                                : secondaryButtonClass
                            }
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}

                    {project.relatedPublications?.length ? (
                      <div className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Publications
                        </p>
                        {project.relatedPublicationsIntro ? (
                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {project.relatedPublicationsIntro}
                          </p>
                        ) : null}
                        <div className="mt-4 grid gap-4 lg:grid-cols-2">
                          {project.relatedPublications.map((publication) => (
                            <article
                              key={publication.title}
                              className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    {publication.venue}
                                  </p>
                                  <h4 className="mt-3 text-base font-semibold leading-7 text-slate-900">
                                    {publication.title}
                                  </h4>
                                </div>
                                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600">
                                  {publication.year}
                                </span>
                              </div>
                              <div className="mt-4">
                                <BadgeList items={publication.keywords} />
                              </div>
                              <a
                                href={publication.link}
                                download={publication.link !== '#' ? '' : undefined}
                                onClick={(event) => {
                                  if (publication.link === '#') {
                                    event.preventDefault()
                                  }
                                }}
                                className={
                                  publication.link === '#'
                                    ? `mt-4 ${secondaryButtonClass}`
                                    : `mt-4 ${downloadButtonClass}`
                                }
                              >
                                {publication.link === '#' ? '논문 링크 추가 예정' : '논문 다운로드'}
                              </a>
                            </article>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {project.relatedAwards?.length ? (
                      <div className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Awards
                        </p>
                        {project.relatedAwardsIntro ? (
                          <p className="mt-3 text-sm leading-7 text-slate-600">
                            {project.relatedAwardsIntro}
                          </p>
                        ) : null}
                        <div className="mt-4 grid gap-4 lg:grid-cols-2">
                          {project.relatedAwards.map((award) => (
                            <article
                              key={`${award.event}-${award.year}`}
                              className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    {award.year}
                                  </p>
                                  <h4 className="mt-3 text-base font-semibold leading-7 text-slate-900">
                                    {award.title}
                                  </h4>
                                </div>
                                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-600">
                                  Award
                                </span>
                              </div>
                              <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
                                {award.event}
                              </p>
                              <p className="mt-2 text-sm leading-7 text-slate-500">
                                {award.organization}
                              </p>
                            </article>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {project.images.length && project.imagesPosition === 'bottom' ? (
                      <div className="mt-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Visuals
                        </p>
                        <div className="mt-4 grid gap-5 lg:grid-cols-2">
                          {project.images.map((image) => (
                            <ImagePlaceholder key={image.label} {...image} />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {project.images.length && project.imagesPosition !== 'bottom' ? (
                    <div className="space-y-5">
                      {project.images.map((image) => (
                        <ImagePlaceholder key={image.label} {...image} />
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50/90 p-5">
                  <p className="text-base leading-8 text-slate-600">
                    {project.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="publications"
          className={`${sectionClass} mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8`}
        >
          <SectionHeader
            eyebrow="Publications"
            title="연구 성과 및 논문"
          />
          <div className="mt-10 space-y-10">
            {publications.map((group) => (
              <div key={group.category}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl text-slate-900 sm:text-3xl">
                    {group.category}
                  </h3>
                  <span className="hidden h-px flex-1 bg-slate-200 sm:block" />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {group.items.map((publication) => (
                    <article key={publication.title} className={`${cardClass} p-6`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {publication.venue}
                          </p>
                          <h4 className="mt-3 text-xl font-semibold leading-8 text-slate-900">
                            {publication.title}
                          </h4>
                        </div>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-600">
                          {publication.year}
                        </span>
                      </div>
                      <div className="mt-6">
                        <BadgeList items={publication.keywords} />
                      </div>
                      {group.showLinks !== false ? (
                        <a
                          href={publication.link}
                          download={publication.link !== '#' ? '' : undefined}
                          onClick={(event) => {
                            if (publication.link === '#') {
                              event.preventDefault()
                            }
                          }}
                          className={
                            publication.link === '#'
                              ? `mt-6 ${secondaryButtonClass}`
                              : `mt-6 ${downloadButtonClass}`
                          }
                        >
                          {publication.link === '#' ? '논문 링크 추가 예정' : '논문 다운로드'}
                        </a>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Awards"
            title="수상 성과"
            description="프로젝트 구현과 문제 해결 경험이 실제 성과로 이어진 수상 이력을 정리했습니다."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {awards.map((award) => (
              <article key={`${award.event}-${award.year}`} className={`${cardClass} p-6`}>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {award.year}
                </p>
                <h3 className="mt-4 font-serif text-2xl text-slate-900">
                  {award.title}
                </h3>
                <p className="mt-3 text-base font-medium text-slate-700">
                  {award.event}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  {award.organization}
                </p>
                {award.relatedProject ? (
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Related Project
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {award.relatedProject}
                    </p>
                  </div>
                ) : null}
                {award.linkHref && award.linkLabel ? (
                  <a
                    href={award.linkHref}
                    download={isPublicFile(award.linkHref) ? '' : undefined}
                    target={isPublicFile(award.linkHref) ? undefined : '_blank'}
                    rel={isPublicFile(award.linkHref) ? undefined : 'noreferrer'}
                    className={
                      isPublicFile(award.linkHref)
                        ? `mt-4 ${downloadButtonClass}`
                        : `mt-4 ${secondaryButtonClass}`
                    }
                  >
                    {award.linkLabel}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section
          id="skills"
          className={`${sectionClass} mx-auto mt-20 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:px-8`}
        >
          <SectionHeader
            eyebrow="Technical Skills"
            title="연구형 포지션 중심 기술 스택"
            description="모델 실험, data preprocessing, inference pipeline, evaluation workflow에 직접 사용한 기술을 중심으로 정리했습니다."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((skillCategory) => (
              <article key={skillCategory.category} className={`${cardClass} p-6`}>
                <h3 className="font-serif text-2xl text-slate-900">
                  {skillCategory.category}
                </h3>
                <ul className="mt-5 space-y-3">
                  {skillCategory.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span className="text-sm leading-7 text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className={`${sectionClass} mx-auto mt-20 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:px-8`}
        >
          <div className="mx-auto max-w-3xl">
            <div className={`${cardClass} p-8`}>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-500">
                Contact
              </p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Email</p>
                  <a
                    href="mailto:hjh5842@kau.kr"
                    className="mt-2 inline-block text-base font-medium text-slate-900 hover:text-slate-600"
                  >
                    hjh5842@kau.kr
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500">Affiliation</p>
                  <p className="mt-2 text-base leading-7 text-slate-700">
                    Korea Aerospace University, Department of Artificial
                    Intelligence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
