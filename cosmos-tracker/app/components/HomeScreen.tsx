"use client";
import Image from "next/image";
import React from "react";

interface HomeProps {
  title: string;
  src: string;
  description: string;
}

const HomeScreen = ({ title, src, description }: HomeProps) => {
  return (
    <main className="cosmos-home">
      <section className="cosmos-card">
        <div className="cosmos-heading">
          <p className="cosmos-kicker">
            Cosmos Tracker
          </p>
          <h1 className="cosmos-title">
            {title}
          </h1>
        </div>

        {/* <div className="gap-4 ">
          <InlineDatePicker date={date} setDate={setDate} darkTheme={isDark} />
        </div> */}

        <div className="cosmos-image-wrap">
          <Image
            src={src}
            height={1000}
            width={1000}
            alt={title}
            loading="eager"
            priority
            className="cosmos-image"
          />
        </div>

        <div className="cosmos-copy-wrap">
          <p className="cosmos-copy">
            {description}
          </p>
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
      </section>
    </main>
  );
};

export default HomeScreen;
