import React from "react";
import { SPRING_API_URL } from "../constants/api";
import Logo from "../components/Logo";

const LoginPage = () => {
    const handleKakaoLogin = () => {
        window.location.href = `${SPRING_API_URL}/oauth/kakao`;
    };

    return (
        <div style={styles.container}>
            <Logo />
            <p style={styles.message}>
                혼자 계신 부모님이 걱정되시나요? <br />
                휴머니케어로 함께하세요.
            </p>
            <img
                src={process.env.PUBLIC_URL + "/images/kakao_login.svg"}
                alt="카카오 로그인 버튼"
                style={styles.kakaoButton}
                onClick={handleKakaoLogin}
            />
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
        backgroundColor: "#FAE8D4",
        padding: "0 20px",
        textAlign: "center",
    },
    message: {
        fontSize: "18px",
        color: "#333",
        margin: "30px 0 40px",
        lineHeight: "1.5",
        fontWeight: "500",
    },
    kakaoButton: {
        width: "250px",
        cursor: "pointer",
    },
};

export default LoginPage;