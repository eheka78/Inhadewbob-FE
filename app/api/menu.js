import api from "./api";


// 랜덤 식당 메뉴 조회(룰렛)
export const getMenusByRoulette = async (category, price) => {
    const date = new Date().toISOString().split("T")[0];

    try {
        const res = await api.get("/menus/roulette", {
            params: {
                date,
                category,
                price,
            },
        });

        console.log("getMenusByRoulette 조회 성공: ", res.data);

        return res.data;

    } catch (e) {
        console.error("getMenusByRoulette 실패: ", e);
    }
};


// 추천 예산 조회
export const getRecommendPrice = async () => {
    const date = new Date().toISOString().split("T")[0];

    try {
        const res = await api.get(`/menus/recom`, {
            params: { date: date }
        });

        console.log("getRecommendPrice 조회 성공: ", res.data.recommendPrice);

        return res.data.recommendPrice;

    } catch (e) {
        console.error("getRecommendPrice 실패: ", e);
    }
};