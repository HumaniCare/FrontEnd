// components/Header.js

export const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.warn("accessToken이 없습니다.");
    }
    return token;
};
