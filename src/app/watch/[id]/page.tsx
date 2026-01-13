"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";

type AudioMode = "original" | "music" | "radio" | "silent";

type Comment = {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: string;
  likes: number;
  liked: boolean;
};

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string;

  const [activeMode, setActiveMode] = useState<AudioMode>("original");
  const [videoVolume, setVideoVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(50);
  const [radioVolume, setRadioVolume] = useState(50);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "Sofia",
      avatar: "👩",
      message: "This video brings me so much peace! 🌅",
      time: "2 hours ago",
      likes: 12,
      liked: false,
    },
    {
      id: 2,
      user: "Erik",
      avatar: "👨",
      message: "I can't wait for summer! This makes me dream of warm beaches.",
      time: "5 hours ago",
      likes: 8,
      liked: false,
    },
    {
      id: 3,
      user: "Maria",
      avatar: "👧",
      message: "Perfect for relaxation after a long day ☀️",
      time: "1 day ago",
      likes: 15,
      liked: true,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLikeComment = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          user: "You",
          avatar: "👤",
          message: newComment,
          time: "Just now",
          likes: 0,
          liked: false,
        },
        ...comments,
      ]);
      setNewComment("");
    }
  };

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

      <div className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Comments ({comments.length})</h2>

        <div className={styles.addComment}>
          <div className={styles.commentAvatar}>👤</div>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
            className={styles.commentInput}
          />
          <button onClick={handleAddComment} className={styles.commentButton}>
            Post
          </button>
        </div>

        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentAvatar}>{comment.avatar}</div>
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>{comment.user}</span>
                  <span className={styles.commentTime}>{comment.time}</span>
                </div>
                <p className={styles.commentMessage}>{comment.message}</p>
                <div className={styles.commentActions}>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`${styles.likeButton} ${
                      comment.liked ? styles.liked : ""
                    }`}
                  >
                    {comment.liked ? "❤️" : "🤍"} {comment.likes}
                  </button>
                  <button className={styles.replyButton}>Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
