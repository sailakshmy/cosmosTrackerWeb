export const fetchISOStringDate = (date: Date) =>
  date?.toISOString()?.split("T")?.[0];

export const fetchImageForSelectedDate = async (date: string) => {
  const apodData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}?date=${date}`,
  );
  const apod = await apodData.json();
  return apod;
};
