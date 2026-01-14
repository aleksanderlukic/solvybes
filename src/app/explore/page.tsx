"use client";

import { useState } from "react";
import Image from "next/image";
import VideoCard from "@/components/VideoCard";
import styles from "./page.module.scss";

export default function ExplorePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"Beach" | "City" | null>(
    null
  );
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<
    "Day" | "Night" | null
  >(null);

  const countries = [
    { name: "Spain", flag: "🇪🇸", code: "es", count: 12 },
    { name: "Greece", flag: "🇬🇷", code: "gr", count: 8 },
    { name: "Italy", flag: "🇮🇹", code: "it", count: 15 },
    { name: "Portugal", flag: "🇵🇹", code: "pt", count: 6 },
    { name: "France", flag: "🇫🇷", code: "fr", count: 10 },
    { name: "Croatia", flag: "🇭🇷", code: "hr", count: 7 },
    { name: "Thailand", flag: "🇹🇭", code: "th", count: 9 },
    { name: "Bali", flag: "🇮🇩", code: "id", count: 5 },
  ];

  const videos = [
    {
      id: "1",
      title: "Sunset Beach Walk",
      country: "Spain",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "2",
      title: "Mediterranean Coast",
      country: "Greece",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "3",
      title: "Barcelona Streets",
      country: "Spain",
      type: "City" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "4",
      title: "Athens Night Walk",
      country: "Greece",
      type: "City" as const,
      timeOfDay: "Night" as const,
    },
    {
      id: "5",
      title: "Rome Evening Stroll",
      country: "Italy",
      type: "City" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "6",
      title: "Amalfi Coast Sunset",
      country: "Italy",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "7",
      title: "Lisbon Golden Hour",
      country: "Portugal",
      type: "City" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "8",
      title: "Algarve Beach",
      country: "Portugal",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
  ];

  const filteredVideos = videos.filter((video) => {
    if (selectedCountry && video.country !== selectedCountry) return false;
    if (selectedType && video.type !== selectedType) return false;
    if (selectedTimeOfDay && video.timeOfDay !== selectedTimeOfDay)
      return false;
    return true;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explore Destinations</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Choose a Country</h2>
        <div className={styles.countryGrid}>
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() =>
                setSelectedCountry(
                  selectedCountry === country.name ? null : country.name
                )
              }
              className={`${styles.countryCard} ${
                selectedCountry === country.name ? styles.selected : ""
              }`}
            >
              <Image
                src={`https://flagcdn.com/w320/${country.code}.png`}
                alt={`${country.name} flag`}
                width={320}
                height={213}
                className={styles.flagImage}
                unoptimized
              />
              <div className={styles.countryInfo}>
                <h3 className={styles.countryName}>{country.name}</h3>
                <p className={styles.countryCount}>{country.count} videos</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Filters</h2>
        <div className={styles.filters}>
          <button
            onClick={() =>
              setSelectedType(selectedType === "Beach" ? null : "Beach")
            }
            className={`${styles.chip} ${
              selectedType === "Beach" ? styles.active : ""
            }`}
          >
            🏖️ Beach
          </button>
          <button
            onClick={() =>
              setSelectedType(selectedType === "City" ? null : "City")
            }
            className={`${styles.chip} ${
              selectedType === "City" ? styles.active : ""
            }`}
          >
            🏙️ City
          </button>
          <button
            onClick={() =>
              setSelectedTimeOfDay(selectedTimeOfDay === "Day" ? null : "Day")
            }
            className={`${styles.chip} ${
              selectedTimeOfDay === "Day" ? styles.active : ""
            }`}
          >
            ☀️ Day
          </button>
          <button
            onClick={() =>
              setSelectedTimeOfDay(
                selectedTimeOfDay === "Night" ? null : "Night"
              )
            }
            className={`${styles.chip} ${
              selectedTimeOfDay === "Night" ? styles.active : ""
            }`}
          >
            🌙 Night
          </button>
          {(selectedCountry || selectedType || selectedTimeOfDay) && (
            <button
              onClick={() => {
                setSelectedCountry(null);
                setSelectedType(null);
                setSelectedTimeOfDay(null);
              }}
              className={`${styles.chip} ${styles.clear}`}
            >
              ✕ Clear All
            </button>
          )}
        </div>
      </section>

      <section>
        <h2 className={styles.resultsTitle}>
          {filteredVideos.length}{" "}
          {filteredVideos.length === 1 ? "Video" : "Videos"}
        </h2>
        <div className={styles.videoGrid}>
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>
    </div>
  );
}
