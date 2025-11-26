// 식단 기록 등록
export const create = async (memberId, menuId) => {
    if (!memberId) {
        console.log("create: memberId를 입력하세요.");
        return;
    }
    if (!menuId) {
        console.log("create: menuId를 입력하세요.");
        return;
    }

    try {
        const res = await api.post(`/diets`, {
            memberId: memberId,
            menuId: menuId
        });

        console.log("create 조회 성공: ", res.data);

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
export const getDaily = async (memberId, date) => {
    if (!memberId) {
        console.log("getDaily: memberId를 입력하세요.");
        return;
    }
    if (!date) {
        console.log("getDaily: date를 입력하세요.");
        return;
    }

    try {
        const res = await api.get(`/diets/${memberId}/daily`, {
            params: {
                memberId: memberId,
                date: date
            }
        });

        console.log("getDaily 조회 성공: ", res.data);

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
        const res = await api.get(`/weekly`, {
            params: {
                start: start,
                end: end
            }
        });

        console.log("getWeekly 조회 성공: ", res.data);

    } catch (e) {
        console.error("getWeekly 실패: ", e);
    }
};


// 최근 식단 기록 조회
export const getLatest = async () => {
    try {
        const res = await api.get(`/latest`, {
            params: { }
        });

        console.log("getLatest 조회 성공: ", res.data);

    } catch (e) {
        console.error("getLatest 실패: ", e);
    }
};