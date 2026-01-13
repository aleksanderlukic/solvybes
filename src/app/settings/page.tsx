"use client";

import { useState } from "react";
import { useBlockedUsers } from "@/contexts/BlockedUsersContext";
import { useUserProfile } from "@/contexts/UserProfileContext";
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
  const { blockedUsers, unblockUser } = useBlockedUsers();
  const { userProfile, setAvatar, setProfileImage } = useUserProfile();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const avatarOptions = [
    "👨‍💻",
    "👩‍💻",
    "👨",
    "👩",
    "👦",
    "👧",
    "🧑",
    "👴",
    "👵",
    "👨‍🦰",
    "👩‍🦰",
    "👨‍🦱",
    "👩‍🦱",
    "👨‍🦳",
    "👩‍🦳",
    "👨‍🦲",
    "👩‍🦲",
    "🧔",
    "👱‍♂️",
    "👱‍♀️",
    "👨‍🦲",
    "👩‍🦲",
    "🤵",
    "👰",
    "🤴",
    "👸",
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "🤓",
    "🧐",
    "🤠",
    "🥳",
    "😎",
    "🤡",
    "🥸",
    "🤗",
    "😺",
    "😸",
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
    "🐧",
    "🐦",
    "🦆",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦄",
    "🐝",
    "🐛",
    "🦋",
    "🐌",
  ];

  const handleAvatarSelect = (selectedAvatar: string) => {
    setAvatar(selectedAvatar);
    setShowAvatarPicker(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Bilden är för stor. Max storlek är 5MB.");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Vänligen välj en bildfil.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    if (confirm("Vill du ta bort din profilbild?")) {
      setProfileImage(undefined);
    }
  };

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
              <div className={styles.avatarPreview}>
                {userProfile.profileImage ? (
                  <img
                    src={userProfile.profileImage}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                ) : (
                  <span className={styles.emojiAvatar}>
                    {userProfile.avatar}
                  </span>
                )}
              </div>
              <div className={styles.avatarButtons}>
                <button
                  onClick={() => setShowAvatarPicker(true)}
                  className={styles.changeAvatarButton}
                >
                  🎭 Välj Emoji
                </button>
                <label className={styles.uploadButton}>
                  📷 Ladda upp Bild
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className={styles.fileInput}
                  />
                </label>
                {userProfile.profileImage && (
                  <button
                    onClick={handleRemoveImage}
                    className={styles.removeButton}
                  >
                    🗑️ Ta bort Bild
                  </button>
                )}
              </div>
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
          <h2 className={styles.sectionTitle}>🚫 Blockerade Konton</h2>
          <div className={styles.card}>
            {blockedUsers.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>✓</div>
                <p className={styles.emptyText}>
                  Du har inga blockerade konton
                </p>
                <p className={styles.emptySubtext}>
                  Blockerade användare visas här
                </p>
              </div>
            ) : (
              <div className={styles.blockedList}>
                {blockedUsers.map((user) => (
                  <div key={user} className={styles.blockedItem}>
                    <div className={styles.blockedUserInfo}>
                      <div className={styles.blockedAvatar}>👤</div>
                      <div className={styles.blockedUsername}>{user}</div>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Vill du avblockera ${user}? De kommer kunna se dina inlägg igen.`
                          )
                        ) {
                          unblockUser(user);
                        }
                      }}
                      className={styles.unblockButton}
                    >
                      Avblockera
                    </button>
                  </div>
                ))}
              </div>
            )}
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

      {showAvatarPicker && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowAvatarPicker(false)}
        >
          <div
            className={styles.avatarPickerModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Välj din Avatar</h2>
            <p className={styles.modalSubtitle}>
              Klicka på en avatar för att välja den
            </p>
            <div className={styles.avatarGrid}>
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`${styles.avatarOption} ${
                    userProfile.avatar === avatar ? styles.selected : ""
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAvatarPicker(false)}
              className={styles.closeButton}
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
