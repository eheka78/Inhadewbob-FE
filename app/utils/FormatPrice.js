// 360000 -> ₩360,000

export const formatPrice = (price) => {
    if (!price) return;

    // 숫자를 문자열로 변환하고 3자리마다 콤마 추가
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // ₩ 붙이기
    return `₩${formatted}`;
};