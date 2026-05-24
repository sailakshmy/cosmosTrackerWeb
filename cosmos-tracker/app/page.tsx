import HomeScreen from "./screens/HomeScreen";

export default async function Home() {
  let apod;
  try {
    const date = new Date().toISOString()?.split("T")?.[0];
    console.log("process.env.BASE_URL", process.env.BASE_URL);
    const apodData = await fetch(`${process.env.BASE_URL}?date=${date}`);
    apod = await apodData.json();
    console.log("apod", apod.data);
  } catch (e) {
    console.log("err", e);
  }
  const { title, url, explanation, media_type } = apod?.data;
  return (
    <HomeScreen
      title={title}
      src={url}
      description={explanation}
      mediaType={media_type}
    />
  );
}
