export const fetchISOStringDate = (date: Date) =>
  date?.toISOString()?.split("T")?.[0];

export const fetchImageForSelectedDate = async (
  date: string,
  firstLoad = false,
  signal?: AbortSignal,
) => {
  const apodData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}?date=${date}&firstLoad=${firstLoad}`,
    { signal },
  );
  const apod = await apodData.json();
  return apod;
};
