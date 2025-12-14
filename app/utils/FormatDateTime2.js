// "2025-11-21T03:00:00.000Z" -> "2025-11-21 03:00:00"

export const formatDateTime2 = (date) => {
    if (!date) return "";

    const d = date instanceof Date ? date : new Date(date);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};
