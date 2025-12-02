import axios from "axios";
import { loadAccessToken } from "../../tokenStorage";

const BACKEND_URL = "https://inha-dewbob.p-e.kr";


// 소비 현황 수정
export const getProfile = async () => {
	const loadAccessTokened = await loadAccessToken();
	if(loadAccessTokened == null) {	return null; }	
	
	try {
		const res = await axios.get(`${BACKEND_URL}/auth/profile`, {
			headers: {
				Authorization: `Bearer ${loadAccessTokened}`,
			},
		});
		console.log("Profile:", res.data);

		return res.data;

	} catch (e) {
		console.error("Profile fetch error:", e);
	}
};