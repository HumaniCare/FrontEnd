import React from "react";
import Button from "../components/Button";

const SignupPage = () => {
    return(
        <div style={styles.container}>
            <img src="heart.png" alt="heart" style={styles.image} />
            <h2 style={styles.title}>회원 정보 입력</h2>

            <input style={styles.input} placeholder="보호자 이름을 입력하세요."/>
            <input style={styles.input} placeholder="보호자 생일을 6글자로 입력하세요.."/>
            <input style={styles.input} placeholder="피보호자 이름을 입력하세요."/>
            <input style={styles.input} placeholder="피보호자 생일을 6글자로 입력하세요."/>

            <Button text="넘어가기" color="#DABEC9" />
        </div>
    );
};

const styles = {
    container: {
        display : "flex",
        flexDirection : "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#F8EAD2",
    },
    image: {
        width: "100px",
        marginBottom: "20px",
    },
    title: {
        fontSize: "24px",
        marginBottom: "20px",
    },
    input: {
        width: "80%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
    },
};

export default SignupPage;