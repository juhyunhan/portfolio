# Han Juhyeon Portfolio

React, TypeScript, Vite 기반 연구 포트폴리오 사이트입니다.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

빌드 결과물은 `dist/`에 생성됩니다.

## GitHub Pages Deployment

이 저장소는 `.github/workflows/deploy.yml`을 통해 `main` 브랜치에 push될 때 GitHub Pages로 자동 배포됩니다.

GitHub 저장소 생성 후 최초 1회:

1. GitHub repository의 `Settings > Pages`로 이동합니다.
2. `Build and deployment`의 Source를 `GitHub Actions`로 설정합니다.
3. 로컬 저장소에 remote를 연결하고 push합니다.

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```
