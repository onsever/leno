// LocalDateTime to JavaScript Date

export const convertDate = (date: number[]) => {
  const [year, month, day, hour, minute, second, nanoseconds] = date;
  const millisecond = nanoseconds / 1e6; // Convert nanoseconds to milliseconds
  const jsDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    millisecond
  );
  return jsDate.toLocaleString();
};
