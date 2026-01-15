"use client";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import styles from "./VideoCard.module.scss";

interface VideoCardProps {
  id: string;
  title: string;
  country: string;
  type: "Beach" | "City";
  timeOfDay: "Day" | "Night";
  thumbnail?: string;
}

export default function VideoCard({
  id,
  title,
  country,
  type,
  timeOfDay,
  thumbnail,
}: VideoCardProps) {
  return (
    <Link href={`/watch/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.thumbnail}>
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className={styles.thumbnailImage}
              unoptimized
            />
          ) : (
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          <FavoriteButton videoId={id} className={styles.favoriteBtn} />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.tags}>
          <span className={styles.tag}>{country}</span>
          <span className={styles.tag}>{type}</span>
          <span className={styles.tag}>{timeOfDay}</span>
        </div>
      </div>
    </Link>
  );
}
