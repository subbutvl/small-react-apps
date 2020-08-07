const checkValuesMatchType = (type: string, ...vals: any[]) =>
  vals.every((val) => typeof val === type);

const getFormattedDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("vi", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const getFormattedPhoneNumber = (phoneString: string) =>
  "(+84)" + phoneString.replace(/-/g, () => "");

const getTimeFromCurrent = (dateString: string) => {
  const dateItems = dateString.split("/");
  dateItems.reverse();

  return (
    new Date().getTime() -
    new Date(...(dateItems.map(Number) as [number, number, number])).getTime()
  );
};

export {
  checkValuesMatchType,
  getFormattedDate,
  getFormattedPhoneNumber,
  getTimeFromCurrent,
};
