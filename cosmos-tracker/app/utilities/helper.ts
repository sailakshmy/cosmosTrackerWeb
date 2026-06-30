import { Data, NeoTableData, NeoTableObject, Order } from "./types";

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
};

export function createData(object: NeoTableObject): Data {
  // console.log("object", object);
  return {
    date: object?.close_approach_data?.[0]?.close_approach_date ?? "",
    id: object?.id ?? "",
    name: object?.name ?? "",
    isHazardous: object?.is_potentially_hazardous_asteroid ? "Yes" : "No",
    missDistance:
      object?.close_approach_data?.[0]?.miss_distance?.kilometers ?? "",
    relativeVelocity:
      object?.close_approach_data?.[0]?.relative_velocity
        ?.kilometers_per_hour ?? "",
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

export function getComparator<Key extends PropertyKey>(
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

export const fetchRowsFromTableData = (tableData: NeoTableData): Data[] => {
  const rows: Data[] = [];
  tableData.forEach((date) => {
    Object?.keys(date)?.forEach((datekey) => {
      const dateObj = date?.[datekey];
      if (dateObj?.length) {
        dateObj?.forEach((neo) => rows?.push(createData(neo)));
      }
    });
  });
  return rows;
};
