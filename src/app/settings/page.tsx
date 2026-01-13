"use client";

import { useState } from "react";
import styles from "./page.module.scss";

export default function SettingsPage() {
  const [name, setName] = useState("Aleksander");
  const [bio, setBio] = useState("Summer enthusiast ☀️ | Travel lover 🌍");
  const [email, setEmail] = useState("aleksander@solvybes.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [friendRequests, setFriendRequests] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inställningar</h1>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👤 Profil</h2>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label>Namn</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={styles.textarea}
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label>E-post</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.avatarSection}>
              <div className={styles.avatarPreview}>👨‍💻</div>
              <button className={styles.changeAvatarButton}>
                Ändra Avatar
              </button>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🔒 Säkerhet</h2>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label>Nuvarande Lösenord</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Nytt Lösenord</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>

            <button className={styles.changePasswordButton}>
              Ändra Lösenord
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🔔 Notifikationer</h2>
          <div className={styles.card}>
            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleLabel}>E-postnotifikationer</div>
                <div className={styles.toggleDescription}>
                  Få e-post om nya meddelanden och uppdateringar
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleLabel}>Vänförfrågningar</div>
                <div className={styles.toggleDescription}>
                  Notifikationer när någon skickar vänförfrågan
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={friendRequests}
                  onChange={(e) => setFriendRequests(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleLabel}>Nya Meddelanden</div>
                <div className={styles.toggleDescription}>
                  Notifikationer för nya meddelanden i chattar
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={newMessages}
                  onChange={(e) => setNewMessages(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🔐 Sekretess</h2>
          <div className={styles.card}>
            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleLabel}>Visa Profil</div>
                <div className={styles.toggleDescription}>
                  Låt andra användare se din profil
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={showProfile}
                  onChange={(e) => setShowProfile(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>

            <div className={styles.toggleItem}>
              <div className={styles.toggleInfo}>
                <div className={styles.toggleLabel}>Visa Favoriter</div>
                <div className={styles.toggleDescription}>
                  Låt andra se dina favoritvideos
                </div>
              </div>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={showFavorites}
                  onChange={(e) => setShowFavorites(e.target.checked)}
                />
                <span className={styles.toggleSlider}></span>
              </label>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>⚠️ Farlig Zon</h2>
          <div className={styles.card}>
            <div className={styles.dangerZone}>
              <div>
                <div className={styles.dangerTitle}>Radera Konto</div>
                <div className={styles.dangerDescription}>
                  Permanent radera ditt konto och all din data
                </div>
              </div>
              <button className={styles.dangerButton}>Radera Konto</button>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.saveSection}>
        <button onClick={handleSave} className={styles.saveButton}>
          💾 Spara Ändringar
        </button>
        {saved && <span className={styles.savedMessage}>✓ Sparat!</span>}
      </div>
    </div>
  );
}
