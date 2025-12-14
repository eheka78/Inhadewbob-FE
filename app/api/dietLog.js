import api from "./api";


// 식단 기록 등록
export const create = async (menuId) => {
    console.log("create menuId: " + menuId);
    
    console.log("########");
    try {
        const res = await api.post(`/diets`, {
            menuId
        });

        console.log("create 식단 등록 성공: ", res.data);

        return res.data;

    } catch (e) {
        console.error("create 실패: ", e);
    }
};


// ???????????????
export const getByMember = async (memberId) => {
    if (!memberId) {
        console.log("getByMember: memberId를 입력하세요.");
        return;
    }

    try {
        const res = await api.get(`/diets/${memberId}`, {
            params: {
                memberId: memberId,
                menuId: menuId
            }
        });

        console.log("getByMember 조회 성공: ", res.data);

    } catch (e) {
        console.error("getByMember 실패: ", e);
    }
};


// 식단 기록 조회
export const getDaily = async (date) => {
    console.log("date: " + date);
    if (!date) {
        console.log("getDaily: date를 입력하세요.");
        return;
    }

    try {
        const res = await api.get(`/diets/daily`, {
            params: {
                date
            }
        });

        console.log("getDaily 조회 성공: ", res.data);

        return res.data;

    } catch (e) {
        console.error("getDaily 실패: ", e);
    }
};


// 주별 식단 기록 조회
export const getWeekly = async (start, end) => {
    if (!start) {
        console.log("getWeekly: start를 입력하세요.");
        return;
    }
    if (!end) {
        console.log("getWeekly: end를 입력하세요.");
        return;
    }

    try {
        const res = await api.get(`/diets/weekly`, {
            params: {
                start: start,
                end: end
            }
        });

        console.log("getWeekly 조회 성공: ", res.data);

        return res.data;

    } catch (e) {
        console.error("getWeekly 실패: ", e);
    }
};


// 최근 식단 기록 조회
export const getLatest = async () => {
    try {
        const res = await api.get(`/diets/latest`);

        console.log("getLatest 조회 성공: ", res.data);

        return res.data;

    } catch (e) {
        console.error("getLatest 실패: ", e);
    }
};