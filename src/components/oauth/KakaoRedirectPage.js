import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../axios/TokenInterceptor";
import { LOCAL_SPRING_API_URL } from "../../constants/api";

const KakaoRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isCalled = useRef(false); // 한 번만 실행되도록 플래그

    useEffect(() => {
        const handleOAuthKakao = async (code) => {
            try {
                const response = await instance.get(
                    `${LOCAL_SPRING_API_URL}/oauth/login/kakao?code=${code}`
                );

                if (response.data.isSuccess) {
                    const accessToken =
                        response.headers["Authorization"] || response.headers["authorization"];
                    localStorage.setItem("accessToken", accessToken);

                    const role = response.data.result;
                    if (role === "ROLE_FIRST") {
                        navigate("/voice-training");
                    } else {
                        navigate("/keywords");
                    }
                } else {
                    console.error("OAuth2 로그인 오류");
                    console.log(response.data.code);
                    console.log(response.data.message);
                }
            } catch (error) {
                console.error("로그인 실패", error);
            }
        };

        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");

        if (code && !isCalled.current) {
            isCalled.current = true; // ✅ 한 번만 호출되도록 설정
            handleOAuthKakao(code);
        }
    }, [location, navigate]);

    return <div></div>;
};

export default KakaoRedirectPage;
