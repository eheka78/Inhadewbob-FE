import api from "./api";

export const getProfile = async () => {
    try{
        const res = await api.get("/auth/profile");

        console.log("getProfile 조회 성공", res.data);

        return res.data;
    }
    catch (e) {
        console.log("getProfile 조회 실패", e);
        throw e;
    }
}

export const patchProfile = async ({weeklyBudget, eatoutCount}) => {
    try{
        const payload = {
            weeklyBudget: Number(weeklyBudget),
            eatoutCount: Number(eatoutCount),
        };

        const res = await api.patch("/auth/profile", payload);
        console.log("patchProfile 수정 성공", res.data);
        return res.data;
    } catch(e) {
        console.log("patchProfile 수정 실패", e?.response?.status, e?.response?.data, e?.message );
        throw e;
    }
}