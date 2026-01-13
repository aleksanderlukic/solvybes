import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import styles from "./page.module.scss";

export default function HomePage() {
  const trendingVideos = [
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
  ];

  const daysUntilSummer = Math.ceil(
    (new Date("2026-06-21").getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Fly vintern.
          <br />
          Känn solen.
        </h1>
        <p className={styles.subtitle}>
          Escape to summer. Feel the warmth, calm your mind, find your peace.
        </p>

        <div className={styles.buttons}>
          <Link href="/videos" className={styles.btnPrimary}>
            Starta en random video
          </Link>
          <Link href="/explore" className={styles.btnSecondary}>
            Välj land
          </Link>
        </div>

        <div className={styles.filters}>
          <button className={styles.chip}>🏖️ Beach</button>
          <button className={styles.chip}>🏙️ City</button>
          <button className={styles.chip}>☀️ Day</button>
          <button className={styles.chip}>🌙 Night</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Trending Videos</h2>
        <div className={styles.videoGrid}>
          {trendingVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Dagens Quote</h2>
          <blockquote className={styles.quote}>
            "The sun does not shine for a few trees and flowers, but for the
            wide world's joy."
          </blockquote>
          <p className={styles.quoteAuthor}>— Henry Ward Beecher</p>
        </div>
      </section>

      <section className={styles.section}>
        <Link href="/countdown">
          <div className={styles.countdownCard}>
            <h2 className={styles.countdownTitle}>🌞 Sommarnedräkning</h2>
            <p className={styles.countdownNumber}>{daysUntilSummer} dagar</p>
            <p className={styles.countdownLabel}>kvar till sommaren</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
