"use client";
import Image from "next/image";
import { Video } from "../components/Video";
import DatePicker from "../components/DatePicker";
import useApodHook from "./hooks/useApodHook";

interface HomeProps {
  title: string;
  src: string;
  description: string;
  mediaType: string;
  dateReceived?: string;
}

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
  const {
    isLoading,
    date,
    onDateChange,
    mediaDetails,
    showDateChangeMessage,
    isFetching,
  } = useApodHook(title, src, description, mediaType, dateReceived);
  return (
    <main className="cosmos-home">
      <section className="cosmos-card">
        <div className="cosmos-heading">
          <p className="cosmos-kicker">Astronomy Picture of the Day</p>
          <div className="gap-4">
            <DatePicker date={date} setDate={onDateChange} />
          </div>
        </div>

        {isLoading || isFetching ? (
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
      </section>
    </main>
  );
};

export default HomeScreen;
