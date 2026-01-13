"use client";

import { useState } from "react";
import styles from "./page.module.scss";

type Message = {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: string;
  likes: number;
};

type Channel = {
  id: string;
  name: string;
  icon: string;
  messageCount: number;
};

type Friend = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
};

type Group = {
  id: string;
  name: string;
  icon: string;
  members: string[];
};

type Tab = "channels" | "messages" | "groups";

export default function CommunityPage() {
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
  const [registeredUsers, setRegisteredUsers] = useState<
    Array<{ name: string; username: string; password: string }>
  >([
    { name: "Sofia", username: "sofia123", password: "password" },
    { name: "Erik", username: "erik456", password: "password" },
  ]);
  const [activeTab, setActiveTab] = useState<Tab>("channels");
  const [activeChannel, setActiveChannel] = useState("general");
  const [activeDM, setActiveDM] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [friends] = useState<Friend[]>([
    { id: "1", name: "Sofia", avatar: "👩", online: true },
    { id: "2", name: "Erik", avatar: "👨", online: true },
    { id: "3", name: "Anna", avatar: "👧", online: false },
    { id: "4", name: "Johan", avatar: "🧔", online: true },
    { id: "5", name: "Emma", avatar: "👱‍♀️", online: true },
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Spain Trip 2026",
      icon: "🇪🇸",
      members: ["Sofia", "Erik", "You"],
    },
    {
      id: "2",
      name: "Beach Lovers",
      icon: "🏖️",
      members: ["Anna", "Emma", "You"],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Sofia",
      avatar: "👩",
      message: "Just booked my trip to Barcelona! Any tips for must-see spots?",
      time: "10:32",
      likes: 5,
    },
    {
      id: 2,
      user: "Erik",
      avatar: "👨",
      message:
        "Barcelona is amazing! Don't miss Park Güell and the Gothic Quarter 🏛️",
      time: "10:35",
      likes: 3,
    },
    {
      id: 3,
      user: "Anna",
      avatar: "👧",
      message:
        "I recommend visiting early morning to avoid crowds. The sunrise there is magical! ☀️",
      time: "10:38",
      likes: 7,
    },
    {
      id: 4,
      user: "Johan",
      avatar: "🧔",
      message: "Does anyone know good beach spots in Greece for July?",
      time: "10:45",
      likes: 2,
    },
    {
      id: 5,
      user: "Emma",
      avatar: "👱‍♀️",
      message:
        "Navagio Beach in Zakynthos is incredible! Crystal clear water 💙",
      time: "10:50",
      likes: 4,
    },
  ]);

  const channels: Channel[] = [
    { id: "general", name: "General Chat", icon: "💬", messageCount: 234 },
    { id: "destinations", name: "Destinations", icon: "🗺️", messageCount: 156 },
    { id: "travel-tips", name: "Travel Tips", icon: "✈️", messageCount: 189 },
    { id: "beach-vibes", name: "Beach Vibes", icon: "🏖️", messageCount: 98 },
    { id: "city-escapes", name: "City Escapes", icon: "🏙️", messageCount: 67 },
    { id: "photos", name: "Photo Sharing", icon: "📸", messageCount: 321 },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        user: username || "Guest",
        avatar: "😎",
        message: newMessage,
        time: new Date().toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        likes: 0,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleLogin = () => {
    setErrorMessage("");
    const user = registeredUsers.find(
      (u) => u.username === loginUsername && u.password === loginPassword
    );

    if (user) {
      setUsername(user.name);
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

  const handleCreateGroup = () => {
    if (newGroupName.trim() && selectedMembers.length > 0) {
      const newGroup: Group = {
        id: String(groups.length + 1),
        name: newGroupName,
        icon: "👥",
        members: [...selectedMembers, "You"],
      };
      setGroups([...groups, newGroup]);
      setNewGroupName("");
      setSelectedMembers([]);
      setShowCreateGroup(false);
    }
  };

  const toggleMemberSelection = (friendName: string) => {
    if (selectedMembers.includes(friendName)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== friendName));
    } else {
      setSelectedMembers([...selectedMembers, friendName]);
    }
  };

  const onlineFriends = friends.filter((f) => f.online);

  if (showLoginModal) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.loginModal}>
          <h2 className={styles.modalTitle}>
            {isRegistering ? "Registrera dig" : "Välkommen tillbaka!"} 👋
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
                  ✓ Share your favorite summer moments
                </div>
                <div className={styles.feature}>
                  ✓ Join destination-specific discussion groups
                </div>
                <div className={styles.feature}>
                  ✓ Get travel tips from experienced explorers
                </div>
                <div className={styles.feature}>
                  ✓ Plan meetups in sunny locations
                </div>
                <div className={styles.feature}>
                  ✓ Participate in seasonal challenges
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
        <h1 className={styles.title}>Community</h1>
        <p className={styles.subtitle}>Welcome, {username}! 🌞</p>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("channels")}
          className={`${styles.tab} ${
            activeTab === "channels" ? styles.activeTab : ""
          }`}
        >
          💬 Channels
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`${styles.tab} ${
            activeTab === "messages" ? styles.activeTab : ""
          }`}
        >
          ✉️ Messages
        </button>
        <button
          onClick={() => setActiveTab("groups")}
          className={`${styles.tab} ${
            activeTab === "groups" ? styles.activeTab : ""
          }`}
        >
          👥 Groups
        </button>
      </div>

      <div className={styles.communityLayout}>
        <aside className={styles.sidebar}>
          {activeTab === "channels" && (
            <>
              <h3 className={styles.sidebarTitle}>Public Channels</h3>
              <div className={styles.channelList}>
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`${styles.channelButton} ${
                      activeChannel === channel.id ? styles.active : ""
                    }`}
                  >
                    <span className={styles.channelIcon}>{channel.icon}</span>
                    <span className={styles.channelName}>{channel.name}</span>
                    <span className={styles.messageCount}>
                      {channel.messageCount}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTab === "messages" && (
            <>
              <h3 className={styles.sidebarTitle}>Private Messages</h3>
              <div className={styles.channelList}>
                {friends.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => setActiveDM(friend.id)}
                    className={`${styles.channelButton} ${
                      activeDM === friend.id ? styles.active : ""
                    }`}
                  >
                    <span className={styles.channelIcon}>{friend.avatar}</span>
                    <span className={styles.channelName}>{friend.name}</span>
                    {friend.online && (
                      <span className={styles.onlineDot}>🟢</span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTab === "groups" && (
            <>
              <div className={styles.groupsHeader}>
                <h3 className={styles.sidebarTitle}>My Groups</h3>
                <button
                  onClick={() => setShowCreateGroup(true)}
                  className={styles.createButton}
                >
                  ➕
                </button>
              </div>
              <div className={styles.channelList}>
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setActiveGroup(group.id)}
                    className={`${styles.channelButton} ${
                      activeGroup === group.id ? styles.active : ""
                    }`}
                  >
                    <span className={styles.channelIcon}>{group.icon}</span>
                    <span className={styles.channelName}>{group.name}</span>
                    <span className={styles.messageCount}>
                      {group.members.length}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className={styles.onlineUsers}>
            <h4 className={styles.onlineTitle}>
              Friends Online ({onlineFriends.length})
            </h4>
            <div className={styles.userList}>
              {onlineFriends.map((friend) => (
                <div key={friend.id} className={styles.user}>
                  {friend.avatar} {friend.name}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className={styles.chatArea}>
          <div className={styles.chatHeader}>
            <h2 className={styles.chatTitle}>
              {activeTab === "channels" && (
                <>
                  {channels.find((c) => c.id === activeChannel)?.icon}{" "}
                  {channels.find((c) => c.id === activeChannel)?.name}
                </>
              )}
              {activeTab === "messages" && activeDM && (
                <>
                  {friends.find((f) => f.id === activeDM)?.avatar}{" "}
                  {friends.find((f) => f.id === activeDM)?.name}
                </>
              )}
              {activeTab === "groups" && activeGroup && (
                <>
                  {groups.find((g) => g.id === activeGroup)?.icon}{" "}
                  {groups.find((g) => g.id === activeGroup)?.name}
                </>
              )}
            </h2>
          </div>

          {activeTab === "messages" && !activeDM && (
            <div className={styles.placeholder}>
              <div className={styles.placeholderIcon}>✉️</div>
              <p className={styles.placeholderText}>
                Select a friend to start chatting
              </p>
            </div>
          )}

          {activeTab === "groups" && !activeGroup && (
            <div className={styles.placeholder}>
              <div className={styles.placeholderIcon}>👥</div>
              <p className={styles.placeholderText}>
                Select a group to view messages
              </p>
            </div>
          )}

          {(activeTab === "channels" ||
            (activeTab === "messages" && activeDM) ||
            (activeTab === "groups" && activeGroup)) && (
            <>
              <div className={styles.messageList}>
                {messages.map((msg) => (
                  <div key={msg.id} className={styles.message}>
                    <div className={styles.messageAvatar}>{msg.avatar}</div>
                    <div className={styles.messageContent}>
                      <div className={styles.messageHeader}>
                        <span className={styles.messageUser}>{msg.user}</span>
                        <span className={styles.messageTime}>{msg.time}</span>
                      </div>
                      <p className={styles.messageText}>{msg.message}</p>
                      <button className={styles.likeButton}>
                        ❤️ {msg.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.inputArea}>
                <input
                  type="text"
                  placeholder="Share your thoughts..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className={styles.messageInput}
                />
                <button
                  onClick={handleSendMessage}
                  className={styles.sendButton}
                >
                  Send 📤
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {showCreateGroup && (
        <div className={styles.modalOverlay}>
          <div className={styles.createGroupModal}>
            <h3 className={styles.modalTitle}>Create New Group</h3>
            <input
              type="text"
              placeholder="Group name..."
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className={styles.loginInput}
            />

            <h4 className={styles.selectTitle}>Select Members:</h4>
            <div className={styles.memberList}>
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => toggleMemberSelection(friend.name)}
                  className={`${styles.memberButton} ${
                    selectedMembers.includes(friend.name) ? styles.selected : ""
                  }`}
                >
                  <span>
                    {friend.avatar} {friend.name}
                  </span>
                  {selectedMembers.includes(friend.name) && <span>✓</span>}
                </button>
              ))}
            </div>

            <div className={styles.modalButtons}>
              <button
                onClick={handleCreateGroup}
                className={styles.loginButton}
              >
                Create Group
              </button>
              <button
                onClick={() => {
                  setShowCreateGroup(false);
                  setNewGroupName("");
                  setSelectedMembers([]);
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
