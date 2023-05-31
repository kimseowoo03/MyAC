# 백엔드 API 프로세스 설명서

## API 처리 단계 설명
1. pages/api<br>
api폴더 내부 폴더들은 클라이언트에서 HTTP 요청을 받는 엔드포인트를 정의합니다.
  * 요청을 받고 필요한 데이터를 이용하여 컨트롤러에게 전달합니다.

2. 컨트롤러<br>
컨트롤러는 API 요청을 처리하고 필요한 로직을 수행합니다.
  * 데이터베이스와의 상호작용이 필요할 시 모델에게 데이터를 전달합니다.
  * 모델의 return된 값을 적절한 응답을 생성합니다.

3. 모델<br>
모델은 데이터베이스와의 상호작용을 담당합니다.
  * 컨트롤러에서 전달받은 데이터를 모델을 통해 데이터베이스에 저장하거나 데이터베이스로부터 데이터를 조회하거나 갱신할 수 있습니다.
  * 데이터베이스에 저장되는 스키마를 정의하고, CRUD(Create, Read, Update, Delete) 작업을 수행합니다.

## 현재 구현한 API
### auth
로그인, 회원가입, 로그아웃, refresh 재발급, email 중복 체크

### middleware
auth 미들웨어

## 폴더 구조
```
/api
  /auth : middleware auth test api입니다.
  /check-email-exist : email 중복 여부 체크합니다.
  /login
  /logout
  /refresh
  /register

/db
  /connectMongo.ts
  /userController.ts 

/middleware
  /auth.ts: 클라리언트에서 요청시 사용자의 인증 및 권한 검사를 수행합니다.

/model
  /user.ts
```

### 파일 분리 목적
- 각 파일을 분리하여 코드를 모듈화 하여 재사용성과 유지보수를 효율적으로 수행
- 각 파일의 역할을 분담하였으므로 개발할 때의 특정 기능에 집중할 수 있어서 코드를 이해하기 쉽고, 코드의 가독성 향상 목적