// 랜덤 식당 메뉴 조회(룰렛)
export const getMenusByRoulette = async (date, category, price) => {
    if (!date) {
        console.log("getMenusByRoulette: date를 입력하세요.");
        return;
    }

    const paramsData = {};

    paramsData.date = date;
    if (category) { paramsData.category = category; }
    if (price) { paramsData.price = price; }

    try {
        const res = await api.get(`/menus/roulette`, {
            params: { paramsData },
        });

        console.log("getMenusByRoulette 조회 성공: ", res.data);

    } catch (e) {
        console.error("getMenusByRoulette 실패: ", e);
    }
};


// 추천 예산 조회
export const getRecommendPrice = async (date) => {
    if (!date) {
        console.log("getRecommendPrice: date를 입력하세요.");
        return;
    }

    try {
        const res = await api.get('/menus/recom', {
            params: { date: date },
        });

        console.log("getRecommendPrice 조회 성공: ", res.data);

    } catch (e) {
        console.error("getRecommendPrice 실패: ", e);
    }
};