"use client";
import Image from "next/image";
import { Video } from "../components/Video";
import DatePicker from "../components/DatePicker";
import { useEffect, useState } from "react";
import {
  fetchImageForSelectedDate,
  fetchISOStringDate,
} from "../utilities/helper";
import dynamic from "next/dynamic";

interface HomeProps {
  title: string;
  src: string;
  description: string;
  mediaType: string;
}

const DynamicThemeSwitcher = dynamic(
  () => import("../components/ThemeSwitcher"),
  { ssr: false },
);

const HomeScreen = ({ title, src, description, mediaType }: HomeProps) => {
  const [date, setDate] = useState(new Date());
  const [mediaDetails, setMediaDetails] = useState({
    title,
    src,
    description,
    mediaType,
  });
  useEffect(() => {
    let shouldUpdate = true;

    const updateImageForSelectedDate = async () => {
      const apod = await fetchImageForSelectedDate(fetchISOStringDate(date));
      if (!shouldUpdate || !apod) {
        return;
      }

      setMediaDetails({
        title: apod?.data?.title,
        src: apod?.data?.url,
        description: apod?.data?.explanation,
        mediaType: apod?.data?.media_type,
      });
    };

    updateImageForSelectedDate();

    return () => {
      shouldUpdate = false;
    };
  }, [date]);

  return (
    <main className="cosmos-home">
      <section className="cosmos-card">
        <div className="cosmos-heading">
          <p className="cosmos-kicker">Cosmos Tracker</p>
          <div className="gap-4 ">
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>

        <h1 className="cosmos-title">{mediaDetails?.title}</h1>
        <div className="cosmos-image-wrap">
          {mediaDetails?.mediaType === "image" && (
            <Image
              src={mediaDetails?.src}
              height={1000}
              width={1000}
              alt={mediaDetails?.title}
              loading="eager"
              priority
              className="cosmos-image"
              placeholder="blur"
              blurDataURL="..."
            />
          )}
          {mediaDetails?.mediaType === "video" && (
            <Video src={mediaDetails?.src} />
          )}
        </div>
        <div className="cosmos-copy-wrap">
          <p className="cosmos-copy">{mediaDetails?.description}</p>
        </div>
        <DynamicThemeSwitcher />
      </section>
    </main>
  );
};

export default HomeScreen;
