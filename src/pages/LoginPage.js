import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { LOCAL_SPRING_API_URL } from "../../constants/api";

const LoginPage = () => {
    const navigate = useNavigate();
    const handleKakaoLogin = () => {
        window.location.href = `${LOCAL_SPRING_API_URL}/oauth/kakao`;
    };

    return (
        <div style = {styles.container}>
            <Logo />
            <h2 style={styles.title} >회원가입하기</h2>
            <button style={styles.signupButton}>SIGN UP</button>
            <Button text="카카오 로그인" color="#FEE500" onClick={handleKakaoLogin} icon="/images/kakao_login.svg"/>
        </div>
    );
};

const styles = {
    container: {
        display : "flex", 
        flexDirection : "column",
        alignItems : "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#FAE8D4",
    },
    title: {
        fontSize : "20px",
        marginBottom: "20px",
    },
    signupButton: {
        backgroundColor: "transparent",
        border: "1px solid black",
        padding: "10px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        marginBottom: "20px",
        cursor: "pointer",
    },
};

export default LoginPage;