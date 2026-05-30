import HomeScreen from "./screens/HomeScreen";
import {
  fetchImageForSelectedDate,
  fetchISOStringDate,
} from "./utilities/helper";

export default async function Home() {
  let apod;
  try {
    const date = fetchISOStringDate(new Date());
    console.log("process.env.BASE_URL", process.env.NEXT_PUBLIC_BASE_URL);
    // const apodData = await fetch(`${process.env.BASE_URL}?date=${date}`);
    // apod = await apodData.json();
    apod = await fetchImageForSelectedDate(date, true);
    console.log("apod", apod.data);
  } catch (e) {
    console.log("err", e);
  }
  const { title, url, explanation, media_type, msg } = apod?.data;
  let updatedDate;
  if (!title && msg.includes("No data available for date")) {
    const previousDate = new Date();
    previousDate?.setDate(previousDate?.getDate() - 1);
    updatedDate = fetchISOStringDate(previousDate);
  }
  return (
    <HomeScreen
      title={title}
      src={url}
      description={explanation}
      mediaType={media_type}
      dateReceived={updatedDate}
    />
  );
}
