# MyAC
학점은행제를 사용하고 있는 사람들을 위한 학점 관리 사이트입니다. 이 사이트를 통해 학점 계산 및 관리를 편리하게 할 수 있습니다.

<div align='center'>
<img src="https://github.com/kimseowoo03/MyAC/assets/102151860/a444b4ac-a2f0-4e9f-9b0c-d8f7d9bc03a3" alt="MyAC_logo">
</div>

## 주요 기능
1. 학점 이수 계획표<br>
- 학점 등록, 삭제를 통한 관리
- 목표 학점을 기준으로 남은 이수 학점을 자동으로 계산하여 사용자에게 제공

2. 학점 계산기<br>
- 학점을 등록한 이력이 있는 경우, "내 학점 불러오기" 기능을 사용하여 등록된 학점 정보를 간편하게 제공

3. 교육원 등록<br>
- 자신이 다니는 교육원을 검색하고 선택된 교육원 등록
- 등록된 교육원은 헤더의 바로가기 버튼을 통해 손쉽게 해당 교육원으로 이동

## 개발 환경
- React, Typescript, scss
- Next,
- MongoDB, Mongoose, 
- HTTP 클라이언트: Axios
- 상태 관리: Zustand
- 인증: JWT (JSON Web Tokens)

## 개발 환경 설정
### Requirements
 - Node 16.16.0
 - Npm 8.11.0

### Installation
1. [MongoDB](https://www.mongodb.com/ko-kr) 사이트에 가입 후, Atlas에서 새로운 프로젝트를 생성해주세요.

2. 저장소 복제
```
git clone https://github.com/kimseowoo03/MyAC.git
```
3. NPM 패키지 설치
```
npm install
```
4. `.env` 추가 설정
```
MONGO_URI='ENTER YOUR MONGO_URl'
```
## 추가 문서 살펴보기

- [백엔드 API 프로세스 설명서](https://github.com/kimseowoo03/MyAC/blob/main/docs/backend-api-process.md)
