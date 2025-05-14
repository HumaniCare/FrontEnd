import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MicRecorder from "mic-recorder-to-mp3";
import Logo from "../components/Logo";
import { FASTAPI_API_URL } from "../constants/api";

const recorder = new MicRecorder({ bitRate: 128 });

const VoiceTrainingPage = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobURL] = useState("");
    const [audioFile, setAudioFile] = useState(null);
    const audioRef = useRef(null);

    const handleMicClick = async () => {
        if (!isRecording) {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                await recorder.start();
                setIsRecording(true);
            } catch (err) {
                alert("마이크 권한이 필요합니다.");
            }
        } else {
            try {
                const [buffer, blob] = await recorder.stop().getMp3();
                const file = new File(buffer, "voice.mp3", {
                    type: blob.type,
                    lastModified: Date.now(),
                });
                setAudioFile(file);
                setBlobURL(URL.createObjectURL(blob));
                setIsRecording(false);
            } catch (e) {
                console.error("녹음 종료 실패:", e);
                setIsRecording(false);
            }
        }
    };

    const handleUpload = async () => {
        if (!audioFile) {
            alert("녹음된 음성이 없습니다.");
            return;
        }

        const formData = new FormData();
        formData.append("file", audioFile);

        try {
            const res = await fetch(`${FASTAPI_API_URL}/voices`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            console.log("업로드 성공:", data);
            alert("업로드 완료!");
        } catch (error) {
            console.error("업로드 실패:", error);
            alert("업로드 실패");
        }
    };

    const handleReset = () => {
        setBlobURL("");
        setAudioFile(null);
    };

    return (
        <div style={styles.container}>
            <Logo />
            <h2 style={styles.title}>목소리를 학습하겠습니다.</h2>
            <p style={styles.subtitle}>(아래의 마이크 버튼을 누르고 텍스트를 읽어주세요.)</p>

            <div style={styles.memoContainer}>
                <div style={styles.memoText}>
                    <p>오늘 하루는 어땠나요? 기분이 괜찮으신가요?</p>
                    <p>밖에 나가서 산책도 하셨어요?</p>
                    <p>식사는 잘 챙기셨는지 궁금합니다.</p>
                    <p>약은 꼭 챙겨드셔야 해요. 잊지 마세요.</p>
                    <p>목소리를 들으니 안심이 됩니다.</p>
                </div>
            </div>

            <button onClick={handleMicClick} style={styles.micButton}>
                <img src="/images/mic_icon.png" alt="Mic" style={styles.micIcon} />
                <p>{isRecording ? "녹음 중... 누르면 종료" : "마이크 누르기"}</p>
            </button>

            {blobURL && (
                <div style={styles.audioControls}>
                    <audio ref={audioRef} src={blobURL} controls />
                    <div style={styles.controlButtons}>
                        <button onClick={handleUpload} style={styles.uploadButton}>전송하기</button>
                        <button onClick={handleReset} style={styles.resetButton}>다시 녹음</button>
                    </div>
                </div>
            )}

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
        width: "300px",
        padding: "20px",
        backgroundImage: "url('/images/memo_background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        marginBottom: "20px",
        borderRadius: "10px",
    },
    memoText: {
        fontSize: "14px",
        lineHeight: "1.6",
        fontWeight: "bold",
        textAlign: "left",
    },
    micButton: {
        background: "none",
        border: "none",
        cursor: "pointer",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    micIcon: {
        width: "60px",
        height: "60px",
    },
    audioControls: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px"
    },
    controlButtons: {
        display: "flex",
        gap: "10px",
    },
    uploadButton: {
        backgroundColor: "#A0D468",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer"
    },
    resetButton: {
        backgroundColor: "#ED5565",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer"
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