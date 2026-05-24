"use client";
import Image from "next/image";
import { Video } from "../components/Video";
import DatePicker from "../components/DatePicker";
import { useEffect, useState } from "react";
import {
  fetchImageForSelectedDate,
  fetchISOStringDate,
} from "../utilities/helper";

interface HomeProps {
  title: string;
  src: string;
  description: string;
  mediaType: string;
}

const HomeScreen = ({ title, src, description, mediaType }: HomeProps) => {
  const [date, setDate] = useState(new Date());
  const [mediaDetails, setMediaDetails] = useState({
    title,
    src,
    description,
    mediaType,
  });
  const [loading, setLoading] = useState(false);
  const updateImageForSelectedDate = async () => {
    setLoading(true);
    const apod = await fetchImageForSelectedDate(fetchISOStringDate(date));
    if (apod) {
      setMediaDetails({
        title: apod?.data?.title,
        src: apod?.data?.url,
        description: apod?.data?.explanation,
        mediaType: apod?.data?.media_type,
      });
    }
  };
  useEffect(() => {
    updateImageForSelectedDate();
    setLoading(false);
  }, [date]);

  return (
    <main className="cosmos-home">
      <section className="cosmos-card">
        <div className="cosmos-heading">
          <p className="cosmos-kicker">Cosmos Tracker</p>
          <div className="gap-4 ">
            <DatePicker date={date} setDate={setDate} darkTheme={true} />
          </div>
        </div>

        {loading ? (
          <>Loading</>
        ) : (
          <>
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
            <div className="cosmos-actions">
              {/* <Pressable
            accessibilityRole="button"
            onPress={() => {
              setColorScheme(isDark ? "light" : "dark");
              setIsDark((prev) => !prev);
            }}
            className="rounded-md border border-slate-300 px-4 py-3 dark:border-slate-700"
          >
            <p className="font-bold p-cosmos-ink dark:p-white">
              {isDark ? "Light mode" : "Dark mode"}
            </p>
          </Pressable> */}

              {/* <pLink
            href="/users/fernando"
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: isDark ? "#2dd4bf" : "#4f46e5",
              padding: 12,
            }}
          >
            div user
            </pLink> */}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default HomeScreen;
