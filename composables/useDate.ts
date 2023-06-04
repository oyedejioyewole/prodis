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

const _getSuffix = (day: number) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
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

export const useDate = (date: string) => {
  const dateObject = new Date(date);

  const day = dateObject.getDate();
  const month = _getMonthName(dateObject.getMonth());
  const suffix = _getSuffix(day);
  const year = dateObject.getFullYear();

  return `${day}${suffix} ${month}, ${year}`;
};
