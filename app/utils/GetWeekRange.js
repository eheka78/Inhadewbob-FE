export const GetWeekRange = (date) => {
    const d = new Date(date);

    const day = d.getDay(); // 0 (일) ~ 6 (토)
    const diffToMonday = day === 0 ? -6 : 1 - day;

    const start = new Date(d);
    start.setDate(d.getDate() + diffToMonday);

    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return {
        start,
        end
    };
};