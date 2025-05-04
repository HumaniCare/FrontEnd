# FrontEnd

## 휴머니케어 - 실질적 독거노인을 위한 음성 상호작용 앱

**"혼자 계신 부모님이 걱정되시나요?"**  
이 앱은 실질적으로 혼자 거주하시는 고령자를 위해 설계되었습니다.  
보호자가 미리 지정한 키워드를 통해 질문을 음성으로 전달하고,  
어르신은 그 IoT에 응답함으로써 일상 상태를 간단히 공유할 수 있습니다.  
또한 보호자의 음성을 학습시켜 고령자에게 더 친근하고 정서적인 상호작용이 가능합니다.


###  프로젝트 실행 방법

#### 1. 프로젝트 클론
```bash
git clone https://github.com/HumaniCare/FrontEnd.git
cd FrontEnd
```

#### 2. 필요한 패키지 설치
```bash
npm install
```

#### 3. 개발 서버 실행
```bash
npm start
```
기본 포트는 `http://localhost:3000`입니다.


###  주요 의존성

다음은 `package.json` 기준으로 프로젝트에 사용된 주요 라이브러리입니다:

| 패키지명 | 설명 |
|---------|------|
| `react` | React 18 기반의 SPA 개발 |
| `react-router-dom` | 페이지 라우팅 처리 |
| `axios` | HTTP 통신 처리 (Spring/FASTAPI와 연동) |
| `mic-recorder-to-mp3` | 브라우저 마이크 녹음 및 mp3 변환 |
| `react-time-picker` | 시간 선택 기능 제공 |
| `@testing-library/react` 외 | 테스트용 도구들 |


###  음성 학습 기능

- 마이크 버튼을 누르면 음성이 녹음되고, mp3 형식으로 변환됩니다.
- 사용자가 직접 재생/삭제/전송할 수 있으며, 전송 시 FastAPI 서버로 POST 요청됩니다.
- 저장된 음성은 보호자 앱 또는 서버에서 활용 가능합니다.


### 기타 참고

- 녹음 전 `마이크 권한`을 요청합니다. 브라우저 설정에서 허용이 필요합니다.
- 실서비스 배포 시 HTTPS 환경과 CORS 설정 확인 필수입니다.


---

## HumaniCare – A Voice Interaction App for Elderly Living Alone

**"Worried about your parents living alone?"**  
This application is designed for elderly individuals who live independently.  
Guardians can set predefined questions that are delivered via voice to the elderly user,  
who can then respond through a simple IoT interface.  
Additionally, the app supports voice training using the guardian’s own voice, enabling more emotional and comforting interactions.

---

###  How to Run the Project

#### 1. Clone the Repository
```bash
git clone https://github.com/HumaniCare/FrontEnd.git
cd FrontEnd
```

#### 2. Install Required Packages
```bash
npm install
```

#### 3. Start the Development Server
```bash
npm start
```

The default development URL is `http://localhost:3000`.

---

###  Main Dependencies

The following are the key libraries used in the project based on `package.json`:

| Package | Description |
|---------|-------------|
| `react` | React 18 for single-page application development |
| `react-router-dom` | Routing between pages |
| `axios` | HTTP communication with Spring/FastAPI servers |
| `mic-recorder-to-mp3` | Recording audio from the browser and converting it to MP3 |
| `react-time-picker` | Provides time selection UI |
| `@testing-library/react` etc. | Tools for component testing |

---

###  Voice Training Feature

- Users can record audio by clicking the mic button. The recording is converted to an MP3 file.
- The user can preview, delete, or upload the file.
- Upon uploading, the audio file is sent to the FastAPI server via a `POST` request.
- The saved voice data can later be used in the guardian’s app or backend services.

---

###  Notes

- Microphone permissions are requested before recording. Please allow access in your browser.
- For production deployment, make sure to use **HTTPS** and properly configure **CORS** on the backend.