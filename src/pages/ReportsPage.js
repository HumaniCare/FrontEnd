import React from "react";
import Logo from "../components/Logo";

const ReportsPage = () => {
  // 1) 더미 리포트 데이터: 실제로는 이 부분을 서버 응답 데이터로 교체하면 됩니다.
  const dummyReports = [
    {
      date: "2025-06-01",
      content: "오늘의 감정 분석 결과는 매우 긍정적이었습니다. 업무 효율도 좋았고, 전반적으로 만족스러운 하루였습니다.",
      imageUrl: null, // 이미지가 없을 땐 null 또는 빈 문자열
    },
    {
      date: "2025-05-31",
      content: "어제는 약간 우울한 기분이 들었지만, 저녁 산책 후 기분이 많이 좋아졌습니다.",
      imageUrl: null,
    },
    {
      date: "2025-05-30",
      content: "주말이라 휴식 시간이 많았고, 가족과 시간을 보내며 안정감을 느꼈습니다.",
      imageUrl: null,
    },
    {
      date: "2025-05-29",
      content: "업무 스트레스가 조금 쌓였지만, 운동을 통해 해소하였습니다.",
      imageUrl: null,
    },
    // 원한다면 7일치까지 더 추가해 보세요.
  ];

  return (
    <div style={styles.container}>
      {/* 헤더 */}
      <div style={styles.header}>
        <Logo />
        <h2 style={styles.title}>최근 7일간 리포트 보기 (더미 데이터)</h2>
      </div>

      {/* 가로 스크롤 컨테이너 */}
      <div style={styles.storyContainer}>
        {dummyReports.map((report, idx) => (
          <div key={idx} style={styles.reportCard}>
            {/* 날짜(타이틀) */}
            <h3 style={styles.cardDate}>{report.date} 리포트</h3>

            {/* 리포트 텍스트 박스 */}
            <div style={styles.reportBox}>
              <p style={styles.reportText}>{report.content}</p>
            </div>

            {/* 이미지 영역 (더미라 이미지 없음) */}
            <div style={styles.imagePlaceholder}>
              {report.imageUrl ? (
                <img
                  src={report.imageUrl}
                  alt={`${report.date} 감정 분석 결과`}
                  style={styles.reportImage}
                />
              ) : (
                <p style={styles.placeholderText}>
                  감정 분석 결과 이미지가 여기에 표시됩니다.
                </p>
              )}
            </div>
          </div>
        ))}
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

  // ─────────────────────────────────────────────────────────────────────
  // 가로 스크롤(스토리) 컨테이너
  storyContainer: {
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory", // 카드가 스냅되도록 하는 속성 (선택 사항)
  },
  // 스크롤바를 숨기고 싶다면 아래 CSS를 전역 또는 CSS 모듈에 추가하세요:
  // .storyContainer::-webkit-scrollbar { display: none; }
  // storyContainer: { scrollbarWidth: "none", msOverflowStyle: "none", /* 파이어폭스·IE용 */ }

  // 각 리포트 카드
  reportCard: {
    flex: "0 0 auto", // 가로 늘리지 않고 고정 폭 유지
    width: "100%",    // 컨테이너 전체 폭 (maxWidth: 500px 기준)
    boxSizing: "border-box",
    paddingRight: "10px",    // 카드 사이 간격
    scrollSnapAlign: "start",// 스냅 시 왼쪽에 정렬
  },

  // 카드 내부—날짜
  cardDate: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1C2C5B",
    marginBottom: "10px",
  },

  // 카드 내부—리포트 텍스트 박스
  reportBox: {
    width: "100%",
    backgroundColor: "#F8EAD2",
    border: "1px solid #888",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    maxHeight: "200px",
    overflowY: "auto",
    boxSizing: "border-box",
  },
  reportText: {
    fontSize: "15px",
    color: "#444",
  },

  // 카드 내부—이미지 영역
  imagePlaceholder: {
    width: "100%",
    height: "250px",
    backgroundColor: "#FFF",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
  placeholderText: {
    color: "#999",
    fontStyle: "italic",
  },
  reportImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "10px",
  },
  // ─────────────────────────────────────────────────────────────────────
};

export default ReportsPage;