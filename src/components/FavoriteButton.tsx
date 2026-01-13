"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  videoId: string;
  className?: string;
}

export default function FavoriteButton({
  videoId,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(videoId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(videoId);
      }}
      className={`${styles.favoriteButton} ${favorite ? styles.favorite : ""} ${
        className || ""
      }`}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      {favorite ? "❤️" : "🤍"}
    </button>
  );
}
