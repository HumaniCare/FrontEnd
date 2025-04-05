import React from "react";
import KakaoRedirectPage from "./components/oauth/KakaoRedirectPage";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VoiceTrainingPage from "./pages/VoiceTrainingPage";
import KeywordSelectionPage from "./pages/KeywordSelectionPage";
import FinalPage from "./pages/FinalPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/voice-training" element={<VoiceTrainingPage/>} />
        <Route path="/keywords" element={<KeywordSelectionPage/>} />
        <Route path="/final" element={<FinalPage/>} />

        {/* 카카오 로그인 리다이렉트 경로 추가 */}
        <Route path="/login/oauth2/code/kakao" element={<KakaoRedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;