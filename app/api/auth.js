import axios from "axios";
import { loadAccessToken } from "../../tokenStorage";
import api from "./api";


// 소비 현황 수정
export const getProfile = async () => {
	const loadAccessTokened = await loadAccessToken();
	if(loadAccessTokened == null) {	return null; }	
	
	try {
		const res = await api.get(`/auth/profile`);
		console.log("Profile:", res.data);

		return res.data;

	} catch (e) {
		console.error("Profile fetch error:", e);
	}
};