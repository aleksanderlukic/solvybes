"use client";

import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";
import styles from "./page.module.scss";

type Playlist = {
  id: string;
  name: string;
  description: string;
  videoIds: string[];
  icon: string;
  createdAt: string;
};

const allVideos = [
  { id: "1", title: "Sunset Beach Walk", country: "Spain" },
  { id: "2", title: "Mediterranean Coast", country: "Greece" },
  { id: "3", title: "Barcelona Streets", country: "Spain" },
  { id: "4", title: "Athens Night Walk", country: "Greece" },
  { id: "5", title: "Rome Evening Stroll", country: "Italy" },
  { id: "6", title: "Amalfi Coast Sunset", country: "Italy" },
];

export default function PlaylistsPage() {
  const { favorites } = useFavorites();
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "Summer Vibes",
      description: "My favorite summer videos",
      videoIds: ["1", "2", "6"],
      icon: "☀️",
      createdAt: "2026-01-10",
    },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [newPlaylistIcon, setNewPlaylistIcon] = useState("🎬");
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

  const icons = ["🎬", "☀️", "🏖️", "🌊", "🌅", "✈️", "🗺️", "💙"];

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([
        ...playlists,
        {
          id: String(playlists.length + 1),
          name: newPlaylistName,
          description: newPlaylistDescription,
          videoIds: selectedVideos,
          icon: newPlaylistIcon,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
      setShowCreateModal(false);
      setNewPlaylistName("");
      setNewPlaylistDescription("");
      setSelectedVideos([]);
      setNewPlaylistIcon("🎬");
    }
  };

  const handleDeletePlaylist = (id: string) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  const toggleVideoSelection = (videoId: string) => {
    setSelectedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const favoriteVideos = allVideos.filter((v) => favorites.includes(v.id));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mina Spellistor</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className={styles.createButton}
        >
          ➕ Skapa Ny Spellista
        </button>
      </div>

      <div className={styles.playlistsGrid}>
        <Link href="/profile" className={styles.playlistCard}>
          <div className={styles.playlistIcon}>❤️</div>
          <h3 className={styles.playlistName}>Favoriter</h3>
          <p className={styles.playlistDescription}>
            Dina sparade favoritvideos
          </p>
          <div className={styles.playlistMeta}>
            {favoriteVideos.length} videos
          </div>
        </Link>

        {playlists.map((playlist) => (
          <div key={playlist.id} className={styles.playlistCard}>
            <button
              onClick={() => handleDeletePlaylist(playlist.id)}
              className={styles.deleteButton}
            >
              ✕
            </button>
            <div className={styles.playlistIcon}>{playlist.icon}</div>
            <h3 className={styles.playlistName}>{playlist.name}</h3>
            <p className={styles.playlistDescription}>{playlist.description}</p>
            <div className={styles.playlistMeta}>
              {playlist.videoIds.length} videos • {playlist.createdAt}
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Skapa Ny Spellista</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className={styles.modalClose}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Ikon</label>
                <div className={styles.iconGrid}>
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewPlaylistIcon(icon)}
                      className={`${styles.iconButton} ${
                        newPlaylistIcon === icon ? styles.selected : ""
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Namn</label>
                <input
                  type="text"
                  placeholder="T.ex. Sommarminnen"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Beskrivning (valfritt)</label>
                <textarea
                  placeholder="Beskriv din spellista..."
                  value={newPlaylistDescription}
                  onChange={(e) => setNewPlaylistDescription(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Lägg Till Videos ({selectedVideos.length})</label>
                <div className={styles.videoList}>
                  {allVideos.map((video) => (
                    <label key={video.id} className={styles.videoItem}>
                      <input
                        type="checkbox"
                        checked={selectedVideos.includes(video.id)}
                        onChange={() => toggleVideoSelection(video.id)}
                      />
                      <span>{video.title}</span>
                      <span className={styles.videoCountry}>
                        {video.country}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={() => setShowCreateModal(false)}
                className={styles.cancelButton}
              >
                Avbryt
              </button>
              <button
                onClick={handleCreatePlaylist}
                className={styles.saveButton}
              >
                Skapa Spellista
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
