import { Data, Order } from "./types";

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

export const fetchNeoFeedData = async (
  startDate: string,
  endDate: string,
  signal?: AbortSignal,
) => {
  const neoFeedData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/neo?startDate=${startDate}&endDate=${endDate}`,
    { signal },
  );
  const neoFeed = await neoFeedData?.json();
  console.log("neoFeed", neoFeed);
  return neoFeed;
};

export const convertEpochDateToMonthDateYearFormat = (
  epochDate: EpochTimeStamp,
) => {
  return new Date(epochDate)?.toUTCString();
  // console.log(`"date", ${date?.toDateString()}, ${date?.toUTCString()}`);
  // return date;
};

export function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
