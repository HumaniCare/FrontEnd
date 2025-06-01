import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";

const SignupPage = () => {
    const navigate = useNavigate();

    const [guardianName, setGuardianName] = useState("");
    const [guardianBirth, setGuardianBirth] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientBirth, setPatientBirth] = useState("");
    const [showPopup, setShowPopup] = useState(false); // 팝업 상태

    const handleSubmit = () => {
        if (!guardianName || !guardianBirth || !patientName || !patientBirth) {
            setShowPopup(true);
            return;
        }

        navigate("/voice-training");
    };

    return (
        <div style={styles.container}>
            <Logo />
            <h2 style={styles.title}>회원 정보 입력</h2>

            <div style={styles.inputGroup}>
                <label style={styles.label}>보호자 이름</label>
                <input
                    style={styles.input}
                    placeholder="이름을 입력하세요"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>보호자 생년월일 (6자리)</label>
                <input
                    style={styles.input}
                    placeholder="예: 900101"
                    value={guardianBirth}
                    onChange={(e) => setGuardianBirth(e.target.value)}
                />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>피보호자 이름</label>
                <input
                    style={styles.input}
                    placeholder="이름을 입력하세요"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                />
            </div>

            <div style={styles.inputGroup}>
                <label style={styles.label}>피보호자 생년월일 (6자리)</label>
                <input
                    style={styles.input}
                    placeholder="예: 800101"
                    value={patientBirth}
                    onChange={(e) => setPatientBirth(e.target.value)}
                />
            </div>

            <Button text="넘어가기" color="#DABEC9" onClick={handleSubmit} />

            {/* 팝업 표시 */}
            {showPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <p style={{ marginBottom: 20 }}>모든 정보를 입력해 주세요.</p>
                        <button style={styles.popupButton} onClick={() => setShowPopup(false)}>
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F8EAD2",
        padding: "0 20px",
    },
    title: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    inputGroup: {
        width: "100%",
        maxWidth: "400px",
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
    },
    popupOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
    },
    popup: {
        backgroundColor: "#fff",
        padding: "30px 40px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
    },
    popupButton: {
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#DABEC9",
        cursor: "pointer",
    },
};

export default SignupPage;
