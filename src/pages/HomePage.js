import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo"; // 올바른 경로

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.logoWrapper}>
        <Logo />
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/reports")}>
          리포트 확인하기
        </button>
        <button style={styles.button} onClick={() => navigate("/keywords")}>
          키워드 보기
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#F8EAD2",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // 수직 가운데
    alignItems: "center",     // 수평 가운데
    padding: "20px",
  },
  logoWrapper: {
    marginBottom: "40px",
  },
  buttonContainer: {
    display: "flex",
    gap: "30px",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: "140px",
    height: "100px",
    fontSize: "16px",
    border: "1px solid #555",
    borderRadius: "20px",
    backgroundColor: "#FFF",
    cursor: "pointer",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
  },
};

export default HomePage;