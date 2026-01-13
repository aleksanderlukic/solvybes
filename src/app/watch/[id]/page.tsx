"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";

type AudioMode = "original" | "music" | "radio" | "silent";

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string;

  const [activeMode, setActiveMode] = useState<AudioMode>("original");
  const [videoVolume, setVideoVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(50);
  const [radioVolume, setRadioVolume] = useState(50);

  const videoInfo = {
    title: "Sunset Beach Walk",
    country: "Spain",
    type: "Beach",
    timeOfDay: "Day",
    description:
      "Experience the calming waves and warm sun of a Spanish beach at sunset.",
  };

  const audioModes = [
    {
      id: "original" as const,
      label: "Original",
      icon: "🎬",
      description: "Original video audio",
    },
    {
      id: "music" as const,
      label: "Music",
      icon: "🎵",
      description: "Ambient music overlay",
    },
    {
      id: "radio" as const,
      label: "Radio",
      icon: "📻",
      description: "Talk radio overlay",
    },
    {
      id: "silent" as const,
      label: "Silent",
      icon: "🔇",
      description: "No audio",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.videoSection}>
          <div className={styles.card}>
            <div className={styles.playerWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${
                  videoId || "dQw4w9WgXcQ"
                }`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <h1 className={styles.title}>{videoInfo.title}</h1>
            <div className={styles.tags}>
              <span className={styles.tag}>{videoInfo.country}</span>
              <span className={styles.tag}>{videoInfo.type}</span>
              <span className={styles.tag}>{videoInfo.timeOfDay}</span>
            </div>
            <p className={styles.description}>{videoInfo.description}</p>
          </div>
        </div>

        <div className={styles.audioPanel}>
          <h2 className={styles.panelTitle}>
            <span>🎧</span> Audio Mode
          </h2>

          <div className={styles.modeList}>
            {audioModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`${styles.modeButton} ${
                  activeMode === mode.id ? styles.active : ""
                }`}
              >
                <div className={styles.modeHeader}>
                  <span className={styles.modeIcon}>{mode.icon}</span>
                  <span className={styles.modeName}>{mode.label}</span>
                </div>
                <p className={styles.modeDescription}>{mode.description}</p>
              </button>
            ))}
          </div>

          <div className={styles.volumeSection}>
            <h3 className={styles.volumeTitle}>Volume Controls</h3>

            <div className={styles.volumeControl}>
              <label>
                <span>Video Audio</span>
                <span>{videoVolume}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={videoVolume}
                onChange={(e) => setVideoVolume(Number(e.target.value))}
              />
            </div>

            {activeMode === "music" && (
              <div className={styles.volumeControl}>
                <label>
                  <span>Music Volume</span>
                  <span>{musicVolume}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                />
              </div>
            )}

            {activeMode === "radio" && (
              <div className={styles.volumeControl}>
                <label>
                  <span>Radio Volume</span>
                  <span>{radioVolume}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={radioVolume}
                  onChange={(e) => setRadioVolume(Number(e.target.value))}
                />
              </div>
            )}
          </div>

          <div className={styles.infoBox}>
            <p>
              💡 <strong>Tip:</strong> Switch audio modes to customize your
              experience. Music and Radio overlays coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
