import React, { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";
import { FASTAPI_API_URL } from "../constants/api";

const recorder = new MicRecorder({ bitRate: 128 });

const MicButton = () => {
    const [isRecording, setIsRecording] = useState(false);

    const handleMicClick = () => {
        // 마이크 명시적으로 권한 요청
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                // 권한 허용됨
                if (!isRecording) {
                    recorder.start().then(() => setIsRecording(true));
                } else {
                    recorder.stop()
                        .getMp3()
                        .then(([buffer, blob]) => {
                            setIsRecording(false);
                            const file = new File(buffer, "voice.mp3", {
                                type: blob.type,
                                lastModified: Date.now(),
                            });

                            const formData = new FormData();
                            formData.append("file", file);

                            fetch(`${FASTAPI_API_URL}/upload`, {
                                method: "POST",
                                body: formData,
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log("업로드 완료:", data);
                            })
                            .catch(err => console.error("업로드 실패:", err));
                        })
                        .catch(e => console.error("녹음 종료 실패:", e));
                }
            })
            .catch((err) => {
                alert("마이크 권한이 필요합니다.");
                console.error("마이크 권한 거부:", err);
            });
    };

    return (
        <button onClick={handleMicClick} style={styles.micButton}>
            <img src="/images/mic_icon.png" alt="Mic Icon" style={styles.micIcon} />
            <p>{isRecording ? "녹음 중... 클릭하면 종료" : "마이크 누르기"}</p>
        </button>
    );
};

const styles = {
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
};

export default MicButton;