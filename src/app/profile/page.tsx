"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserProfile } from "@/contexts/UserProfileContext";
import styles from "./page.module.scss";

export default function ProfilePage() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { userProfile } = useUserProfile();
  const [registeredUsers, setRegisteredUsers] = useState([
    { name: "Sofia", username: "sofia123", password: "password123" },
    { name: "Erik", username: "erik456", password: "password456" },
  ]);

  const [activeTab, setActiveTab] = useState<"videos" | "stats" | "settings">(
    "videos"
  );

  // Mock user data
  const user = {
    name: username || "Aleksander",
    username: `@${username?.toLowerCase() || "aleksander"}`,
    avatar: userProfile.avatar,
    bio: "Summer enthusiast ☀️ | Travel lover 🌍 | Beach vibes 🏖️",
    joinedDate: "December 2025",
    stats: {
      videosWatched: 47,
      favoriteVideos: 12,
      friends: 8,
      groups: 3,
    },
  };

  const favoriteVideos = [
    {
      id: "1",
      title: "Sunset Beach Walk",
      country: "Spain",
      thumbnail: "🏖️",
    },
    {
      id: "2",
      title: "Mediterranean Coast",
      country: "Greece",
      thumbnail: "🌊",
    },
    {
      id: "3",
      title: "Barcelona Streets",
      country: "Spain",
      thumbnail: "🏙️",
    },
    {
      id: "6",
      title: "Amalfi Coast Sunset",
      country: "Italy",
      thumbnail: "🌅",
    },
    {
      id: "7",
      title: "Lisbon Golden Hour",
      country: "Portugal",
      thumbnail: "✨",
    },
    {
      id: "9",
      title: "French Riviera",
      country: "France",
      thumbnail: "🌴",
    },
  ];

  const recentActivity = [
    { action: "Watched", video: "Sunset Beach Walk", time: "2 hours ago" },
    { action: "Added friend", name: "Sofia", time: "5 hours ago" },
    { action: "Joined group", group: "Spain Trip 2026", time: "1 day ago" },
    { action: "Favorited", video: "Mediterranean Coast", time: "2 days ago" },
    { action: "Watched", video: "Barcelona Streets", time: "3 days ago" },
  ];

  const achievements = [
    {
      icon: "🎬",
      title: "First Watch",
      description: "Watched your first video",
    },
    { icon: "⭐", title: "10 Favorites", description: "Saved 10 videos" },
    { icon: "👥", title: "Social Butterfly", description: "Added 5 friends" },
    {
      icon: "🔥",
      title: "7 Day Streak",
      description: "Used app 7 days in a row",
    },
    {
      icon: "🌍",
      title: "Explorer",
      description: "Watched videos from 5 countries",
    },
    { icon: "💬", title: "Chatterbox", description: "Sent 50 messages" },
  ];

  const handleLogin = () => {
    setErrorMessage("");
    const foundUser = registeredUsers.find(
      (u) => u.username === loginUsername && u.password === loginPassword
    );

    if (foundUser) {
      setUsername(foundUser.name);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginUsername("");
      setLoginPassword("");
    } else {
      setErrorMessage("Fel användarnamn eller lösenord");
    }
  };

  const handleRegister = () => {
    setErrorMessage("");

    if (
      !registerName.trim() ||
      !registerUsername.trim() ||
      !registerPassword.trim()
    ) {
      setErrorMessage("Alla fält måste fyllas i");
      return;
    }

    const userExists = registeredUsers.find(
      (u) => u.username === registerUsername
    );
    if (userExists) {
      setErrorMessage("Användarnamnet är redan taget");
      return;
    }

    setRegisteredUsers([
      ...registeredUsers,
      {
        name: registerName,
        username: registerUsername,
        password: registerPassword,
      },
    ]);

    setUsername(registerName);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setRegisterName("");
    setRegisterUsername("");
    setRegisterPassword("");
  };

  const handleGuest = () => {
    setUsername("Guest");
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  if (showLoginModal) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.loginModal}>
          <h2 className={styles.modalTitle}>
            {isRegistering ? "Registrera dig" : "Välkommen till din profil!"} 👋
          </h2>
          <p className={styles.modalSubtitle}>
            {isRegistering ? "Skapa ett nytt konto" : "Logga in på ditt konto"}
          </p>

          {!isRegistering ? (
            <>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Användarnamn"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className={styles.loginInput}
                />
                <input
                  type="password"
                  placeholder="Lösenord"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className={styles.loginInput}
                />
              </div>

              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}

              <div className={styles.loginButtons}>
                <button onClick={handleLogin} className={styles.loginButton}>
                  🔑 Logga In
                </button>
                <button onClick={handleGuest} className={styles.guestButton}>
                  👤 Fortsätt som Gäst
                </button>
              </div>

              <div className={styles.switchMode}>
                Har du inget konto?{" "}
                <button
                  onClick={() => {
                    setIsRegistering(true);
                    setErrorMessage("");
                  }}
                  className={styles.switchButton}
                >
                  Registrera dig här
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Namn"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className={styles.loginInput}
                />
                <input
                  type="text"
                  placeholder="Användarnamn"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className={styles.loginInput}
                />
                <input
                  type="password"
                  placeholder="Lösenord"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleRegister()}
                  className={styles.loginInput}
                />
              </div>

              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}

              <div className={styles.featureList}>
                <div className={styles.feature}>
                  ✓ Track your favorite summer videos
                </div>
                <div className={styles.feature}>
                  ✓ Monitor your viewing statistics
                </div>
                <div className={styles.feature}>
                  ✓ Earn achievements and badges
                </div>
                <div className={styles.feature}>
                  ✓ Customize your profile settings
                </div>
                <div className={styles.feature}>
                  ✓ Connect with friends and groups
                </div>
              </div>

              <div className={styles.loginButtons}>
                <button onClick={handleRegister} className={styles.loginButton}>
                  ✨ Skapa Konto
                </button>
                <button onClick={handleGuest} className={styles.guestButton}>
                  👤 Fortsätt som Gäst
                </button>
              </div>

              <div className={styles.switchMode}>
                Har du redan ett konto?{" "}
                <button
                  onClick={() => {
                    setIsRegistering(false);
                    setErrorMessage("");
                  }}
                  className={styles.switchButton}
                >
                  Logga in här
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profileCard}>
          <div className={styles.avatarLarge}>
            {userProfile.profileImage ? (
              <img
                src={userProfile.profileImage}
                alt={user.name}
                className={styles.avatarImage}
              />
            ) : (
              user.avatar
            )}
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.name}>{user.name}</h1>
            <p className={styles.username}>{user.username}</p>
            <p className={styles.bio}>{user.bio}</p>
            <p className={styles.joined}>Medlem sedan {user.joinedDate}</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{user.stats.videosWatched}</div>
            <div className={styles.statLabel}>Videos Sedda</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{user.stats.favoriteVideos}</div>
            <div className={styles.statLabel}>Favoriter</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{user.stats.friends}</div>
            <div className={styles.statLabel}>Vänner</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{user.stats.groups}</div>
            <div className={styles.statLabel}>Grupper</div>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("videos")}
          className={`${styles.tab} ${
            activeTab === "videos" ? styles.active : ""
          }`}
        >
          🎬 Mina Favoriter
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`${styles.tab} ${
            activeTab === "stats" ? styles.active : ""
          }`}
        >
          📊 Aktivitet
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`${styles.tab} ${
            activeTab === "settings" ? styles.active : ""
          }`}
        >
          ⚙️ Achievements
        </button>
      </div>

      {activeTab === "videos" && (
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Sparade Favoriter</h2>
          <div className={styles.videoGrid}>
            {favoriteVideos.map((video) => (
              <Link
                key={video.id}
                href={`/watch/${video.id}`}
                className={styles.videoCard}
              >
                <div className={styles.videoThumbnail}>
                  <div className={styles.thumbnailIcon}>{video.thumbnail}</div>
                  <div className={styles.playIcon}>▶</div>
                </div>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.videoCountry}>{video.country}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeTab === "stats" && (
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Senaste Aktivitet</h2>
          <div className={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  {activity.action === "Watched" && "🎬"}
                  {activity.action === "Added friend" && "👥"}
                  {activity.action === "Joined group" && "💬"}
                  {activity.action === "Favorited" && "⭐"}
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>
                    <strong>{activity.action}</strong>{" "}
                    {activity.video || activity.name || activity.group}
                  </p>
                  <p className={styles.activityTime}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Dina Achievements</h2>
          <div className={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <div key={index} className={styles.achievementCard}>
                <div className={styles.achievementIcon}>{achievement.icon}</div>
                <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                <p className={styles.achievementDesc}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
