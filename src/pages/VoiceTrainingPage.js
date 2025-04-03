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
                <p style = {styles.memoText}>
                    안촉촉한 초코칩 나라에 살던 안촉촉한 초코칩이 초초초초초초콬초코촠칩.. 아직 미정이에유.. 텍스트 분석하기 좋은 글들을 넣어봅시다. 
                </p>
            </div>

            <MicButton />

            <button style={styles.nextButton} onClick={() => navigate("/")}>
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
        width: "250px",
        height: "200px",
        marginBottom: "20px",
    },
    memoImage: {
        width : "100%",
        height : "100%",
        objectFit : "cover",
    },
    memoText: {
        position: "absolute",
        top: "20px",
        left: "20px",
        right: "20px",
        fontSize: "14px",
        textAlign : "center",
        lineHeight : "1.5",
        fontWeight : "bold",
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