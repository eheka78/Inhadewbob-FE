import { formatDateTime } from "../utils/FormatDateTime";
import api from "./api";

export const createDiet = async ({ date, time, restaurantName, menuName, price }) => {
  try {
    const payload = {
      date: date,
      time: time,
      restaurantName,
      menuName,
      price: Number(price),
    };

    console.log(' /diets 연결 api', payload);

    const res = await api.post('/diets', payload);

    console.log('diets api 연결 성공', res.status, res.data);
    return res.data;
  } catch (e) {
    console.log('diets api 연결 실패', e?.response?.status, e?.response?.data, e?.message);
    throw e;
  }
};
