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
    <main className="flex min-h-screen flex-1 items-center justify-center bg-cosmos-frost px-4 py-12 text-cosmos-ink dark:bg-cosmos-night dark:text-white">
      <section className="flex w-full max-w-[640px] flex-col gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-cosmos-panel">
        <div className="flex flex-col gap-3">
          <p className="text-center text-xs font-bold uppercase tracking-[2px] text-cosmos-comet dark:text-cosmos-aurora">
            Cosmos Tracker
          </p>
          <h1 className="text-center text-3xl font-extrabold leading-tight text-cosmos-ink dark:text-white">
            {title}
          </h1>
        </div>

        {/* <div className="gap-4 ">
          <InlineDatePicker date={date} setDate={setDate} darkTheme={isDark} />
        </div> */}

        <div className="flex items-center justify-center">
          <Image
            src={src}
            height={1000}
            width={1000}
            alt={title}
            loading="eager"
            priority
            className="h-auto max-h-[62vh] w-full rounded-md object-cover"
          />
        </div>

        <div>
          <p className="text-center text-base leading-6 text-slate-700 dark:text-slate-300">
            {description}
          </p>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
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
