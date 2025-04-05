import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../axios/TokenInterceptor"; // instance를 계속 사용하려면
import { LOCAL_SPRING_API_URL } from "../../constants/api";
import Loading from "../Loading";

// 카카오 OAuth 인증 후 리디렉션 처리 페이지
const KakaoRedirectPage = () => {
    const location = useLocation();  // 현재 URL 정보
    const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수

    useEffect(() => {
        // 카카오 로그인 인증 코드 처리 함수
        const handleOAuthKakao = async (code) => {
            try {
                // 카카오 인증 코드로 서버에 로그인 요청 (여기서 instance 사용)
                const response = await instance.get(
                    `${ LOCAL_SPRING_API_URL}/oauth/login/kakao?code=${code}`
                );

                if (response.data.isSuccess) {
                    // 로그인 성공 시, Authorization 헤더에서 액세스 토큰 가져오기
                    const accessToken = response.headers["Authorization"] || response.headers["authorization"];
                    localStorage.setItem("accessToken", accessToken);  // 토큰을 로컬스토리지에 저장

                    // 사용자의 역할(role)에 따라 페이지 이동
                    const role = response.data.result;
                    if (role === "GUEST") {
                        navigate("/signup");  // 게스트 페이지로 이동
                    } else if (role === "USER") {
                        navigate("/signup");  // 사용자 메인 페이지로 이동
                    }
                } else {
                    // 로그인 실패 처리
                    console.error("OAuth2 로그인 오류");
                    console.log(response.data.code);
                    console.log(response.data.message);
                }
            } catch (error) {
                // 요청 실패 시 처리
                console.error("로그인 실패", error);
            }
        };

        // URL에서 카카오 인증 코드 추출
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");  // URL에서 'code' 파라미터 추출

        // 인증 코드가 존재하면 로그인 처리
        if (code) {
            handleOAuthKakao(code);
        }
    }, [location, navigate]);  // 의존성 배열에 'location'과 'navigate' 추가

    return (
        <div>
            <Loading />  {/* 로딩 화면 표시 */}
        </div>
    );
};

export default KakaoRedirectPage;
