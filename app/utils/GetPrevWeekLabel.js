// 주차 계산

export const GetPrevWeekLabel = (month, week, diff) => {
    let newWeek = week - diff;
    let newMonth = month;

    while (newWeek <= 0) {
        newMonth -= 1;
        if (newMonth <= 0) newMonth = 12;

        newWeek += 4; 
    }

    return `${newMonth}월 ${newWeek}주차`;
};
