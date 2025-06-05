import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { SPRING_API_URL } from "../constants/api";

const ReportsPage = () => {
  const [report, setReport] = useState({
    imageUrl: null,
    report_text: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ENDPOINT = `${SPRING_API_URL}/reports`;
    const token = localStorage.getItem("accessToken") || "";
    const authHeader = `Bearer ${token}`;

    fetch(ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("서버 응답이 정상이 아닙니다.");
        }
        return res.json();
      })
      .then((json) => {
        const dto = json.data || {};
        setReport({
          imageUrl: dto.imageUrl || null,
          report_text: dto.report_text || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("리포트를 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <Logo />
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Logo />
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Logo />
        <h2 style={styles.title}>오늘의 리포트입니다.</h2>
      </div>

      <div style={styles.reportBox}>
        {report.report_text ? (
          <p style={styles.reportText}>{report.report_text}</p>
        ) : (
          <p style={styles.emptyText}>등록된 리포트가 없습니다.</p>
        )}
      </div>

      <div style={styles.imageContainer}>
        {report.imageUrl ? (
          <img
            src={report.imageUrl}
            alt="오늘의 감정 분석 결과"
            style={styles.reportImage}
          />
        ) : (
          <p style={styles.placeholderText}>
            감정 분석 결과 이미지가 여기에 표시됩니다.
          </p>
        )}
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
    margin: 0,
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
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  emptyText: {
    fontSize: "15px",
    color: "#999",
    fontStyle: "italic",
    margin: 0,
  },
  imageContainer: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#FFF",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "10px",
  },
  placeholderText: {
    color: "#999",
    fontStyle: "italic",
    margin: 0,
  },
  reportImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    borderRadius: "10px",
  },
};

export default ReportsPage;