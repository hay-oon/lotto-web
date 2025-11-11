# lotto-web 🎰

> 콘솔 기반 로또 프로그램을 **웹 서비스로 확장**한 풀스택 프로젝트입니다.  
> NestJS + TypeORM + PostgreSQL 백엔드와 Next.js 프론트엔드로 구성되어 있습니다.

---

## Project Overview

**lotto-web**은 우아한테크코스 프리코스에서 진행했던 콘솔 프로그램(로또 미션)을  
**웹 환경으로 확장 구현한 프로젝트**입니다.

이번 미션의 목표는 단순한 기능 복제나 언어 전환이 아니라,

> **"학습한 설계 원리를 실제 서비스 개발에 적용하고, 배포까지 완성하는 것"** 입니다.

---

## Tech Stack

**Frontend** : Next.js, React, TypeScript, TailwindCSS
**Backend** : NestJS, TypeScript, TypeORM, class-validator
**Database** : PostgreSQL
**Infra / DevOps** : Render, Vercel, Docker
**API** : 동행복권 실시간 당첨번호 API

---

## Features

### 기본 기능

- 원하는 개수만큼 랜덤 로또 번호 발행
- 외부 API를 통해 실제 당첨 번호 자동 조회
- 발행한 로또와 당첨 번호 비교 후 결과 표시
- 수익률 계산 및 시각화

### 확장 기능 (예정)

- 사용자 로그인 (JWT)
- 로또 구매 이력 저장 및 통계 페이지
- 회차별 당첨 확률 분석 대시보드

---

## Folder Structure

```bash
lotto-web/
├── frontend/               # Next.js 클라이언트
│   ├── app/               # Next.js App Router
│   ├── components/        # React 컴포넌트
│   ├── lib/              # API 클라이언트
│   ├── types/            # TypeScript 타입 정의
│   └── package.json
│
├── backend/              # NestJS 서버
│   ├── src/
│   │   ├── lotto/       # Lotto 모듈
│   │   │   ├── domain/  # 도메인 엔티티
│   │   │   ├── dto/     # 데이터 전송 객체
│   │   │   ├── util/    # 유틸리티
│   │   │   ├── lotto.controller.ts
│   │   │   ├── lotto.service.ts
│   │   │   └── lotto.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── package.json          # root workspace
```

## Quick Start

### 1. 의존성 설치

```bash
# 루트 디렉토리에서
npm install

# 백엔드 의존성 설치
cd backend && npm install

# 프론트엔드 의존성 설치
cd ../frontend && npm install
```

### 2. 환경변수 설정

**Backend** (backend/.env):
```
PORT=3001
DB_TYPE=sqlite
DB_DATABASE=lotto.db
```

**Frontend** (frontend/.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. 실행

**개별 실행:**
```bash
# 백엔드 실행 (포트 3001)
cd backend && npm run start:dev

# 프론트엔드 실행 (포트 3000)
cd frontend && npm run dev
```

**동시 실행 (루트에서):**
```bash
npm run dev
```

### 4. 접속

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:3001

## API 엔드포인트

### POST /lotto/purchase
로또 구매

**Request:**
```json
{
  "purchaseAmount": 8000
}
```

**Response:**
```json
{
  "purchaseCount": 8,
  "lottos": [
    { "numbers": [1, 2, 3, 4, 5, 6] }
  ]
}
```

### POST /lotto/check
당첨 확인

**Request:**
```json
{
  "winningNumbers": [1, 2, 3, 4, 5, 6],
  "bonusNumber": 7,
  "lottos": [
    { "numbers": [1, 2, 3, 4, 5, 6] }
  ]
}
```

**Response:**
```json
{
  "rankCounts": [
    {
      "rank": "FIRST",
      "count": 1,
      "prize": 2000000000
    }
  ],
  "totalPrize": 2000000000,
  "earningRate": 250000.0
}
```
