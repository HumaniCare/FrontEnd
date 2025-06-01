import React from "react";
import Logo from "../components/Logo";

const ReportsPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Logo />
        <h2 style={styles.title}>몇월 몇주차 리포트입니다.</h2>
      </div>

      <div style={styles.reportBox}>
        <p style={styles.reportText}>
            리포트 내용
        </p>
      </div>

      <div style={styles.imagePlaceholder}>
        <p style={styles.placeholderText}>감정 분석 결과 이미지가 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#F8EAD2",
    minHeight: "100vh",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1C2C5B",
  },
  reportBox: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#F8EAD2",
    border: "1px solid #888",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    maxHeight: "250px",        
    overflowY: "auto",         
    boxSizing: "border-box",   
  },
  reportText: {
    fontSize: "15px",
    color: "#444",
  },
  imagePlaceholder: {
    width: "100%",
    maxWidth: "500px",
    height: "300px",
    backgroundColor: "#FFF",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
    fontStyle: "italic",
  },
};

export default ReportsPage;