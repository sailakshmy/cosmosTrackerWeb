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
  dateReceived?: string;
}

const DynamicThemeSwitcher = dynamic(
  () => import("../components/ThemeSwitcher"),
  { ssr: false },
);

const ImageSkeleton = () => (
  <div className="cosmos-image-skeleton" aria-hidden="true" />
);

const HomeScreen = ({
  title,
  src,
  description,
  mediaType,
  dateReceived,
}: HomeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dateHasBeenUpdated =
    dateReceived !== undefined && dateReceived !== null;
  const [date, setDate] = useState(
    dateHasBeenUpdated ? new Date(dateReceived) : new Date(),
  );
  const [showDateChangeMessage, setShowDateChangeMessage] =
    useState(dateHasBeenUpdated);
  console.log("dateHasBeenUpdated", dateHasBeenUpdated);
  console.log("showDateChangeMessage", showDateChangeMessage);
  const [mediaDetails, setMediaDetails] = useState({
    title,
    src,
    description,
    mediaType,
  });

  useEffect(() => {
    console.log("date inside", date);
    const updateImageForSelectedDate = async () => {
      const apod = await fetchImageForSelectedDate(fetchISOStringDate(date));
      if (!apod) {
        setIsLoading(false);
        return;
      }

      setMediaDetails({
        title: apod?.data?.title,
        src: apod?.data?.url,
        description: apod?.data?.explanation,
        mediaType: apod?.data?.media_type,
      });
      if (apod?.data?.updatedDate) {
        setShowDateChangeMessage(true);
      } else {
        console.log("I am being called");
        setShowDateChangeMessage(false);
      }
      setIsLoading(false);
    };

    updateImageForSelectedDate();
  }, [date]);

  const onDateChange = (selectedDate: Date) => {
    setIsLoading(true);
    console.log("changed date");
    setDate(selectedDate);
  };

  return (
    <main className="cosmos-home">
      <section className="cosmos-card">
        <div className="cosmos-heading">
          <p className="cosmos-kicker">Cosmos Tracker</p>
          <div className="gap-4">
            <DatePicker date={date} setDate={onDateChange} />
          </div>
        </div>

        {isLoading ? (
          <div className="cosmos-image-wrap">
            <ImageSkeleton />
          </div>
        ) : (
          <>
            {showDateChangeMessage && (
              <p className="cosmos-kicker mt-2">
                Today&apos;s picture is not yet available, so we are showing you
                yesterday&apos;s picture. Please try again later.
              </p>
            )}
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
          </>
        )}
        <DynamicThemeSwitcher />
      </section>
    </main>
  );
};

export default HomeScreen;
