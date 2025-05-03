import React from "react";
import { useNavigate } from "react-router-dom";
import MicButton from "../components/MicButton";
import Logo from "../components/Logo";

const VoiceTrainingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <Logo />
            <h2 style={styles.title}>목소리를 학습하겠습니다.</h2>
            <p style={styles.subtitle}>(아래의 마이크 버튼을 누르고 텍스트를 읽어주세요.)</p>

            <div style={styles.memoContainer}>
                <img src="/images/memo_background.png" alt="Memo" style={styles.memoImage}/>
                <div style={styles.memoText}>
                    <p>오늘 하루는 어땠나요? 기분이 괜찮으신가요?</p>
                    <p>밖에 나가서 산책도 하셨어요?</p>
                    <p>식사는 잘 챙기셨는지 궁금합니다.</p>
                    <p>약은 꼭 챙겨드셔야 해요. 잊지 마세요.</p>
                    <p>목소리를 들으니 안심이 됩니다.</p>
                </div>
            </div>

            <MicButton />

            <button style={styles.nextButton} onClick={() => navigate("/keywords")}>
                넘어가기
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent : "center",
        minHeight : "100vh",
        backgroundColor : "#F8EAD2",
    },
    title: {
        fontSize: "20px",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: "14px",
        color: "#555",
        marginBottom: "20px",
    },
    memoContainer: {
        position: "relative",
        width: "300px",  // 너비 약간 키움
        padding: "20px", // 내부 여백
        backgroundImage: "url('/images/memo_background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        marginBottom: "20px",
        borderRadius: "10px",
      },
      
      memoImage: {
        display: "none", // 안 써도 됨 (backgroundImage로 대체했기 때문)
      },
      
      memoText: {
        fontSize: "14px",
        lineHeight: "1.6",
        fontWeight: "bold",
        textAlign: "left",
      },
    nextButton: {
        backgroundColor : "#DABEC9",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

export default VoiceTrainingPage;