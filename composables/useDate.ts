export const useDate = (date: string) => {
  const _getMonthName = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[month];
  };

  const _getSuffix = (dayOfMonth: number) => {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return "th";
    }
    switch (dayOfMonth % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = _getMonthName(dateObject.getMonth());
  const day = {
    body: dateObject.getDate(),
    suffix: _getSuffix(dateObject.getDate()),
  };

  return `${day.body}${day.suffix} ${month}, ${year}`;
};
