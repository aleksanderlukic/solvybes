import VideoCard from "@/components/VideoCard";
import styles from "./page.module.scss";

export default function VideosPage() {
  const allVideos = [
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
    {
      id: "9",
      title: "French Riviera",
      country: "France",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "10",
      title: "Paris Evening Walk",
      country: "France",
      type: "City" as const,
      timeOfDay: "Night" as const,
    },
    {
      id: "11",
      title: "Dubrovnik Sunset",
      country: "Croatia",
      type: "City" as const,
      timeOfDay: "Day" as const,
    },
    {
      id: "12",
      title: "Croatian Islands",
      country: "Croatia",
      type: "Beach" as const,
      timeOfDay: "Day" as const,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Videos</h1>
        <p className={styles.subtitle}>
          Discover {allVideos.length} destinations around the world
        </p>
      </div>

      <div className={styles.videoGrid}>
        {allVideos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
