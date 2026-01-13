"use client";

import { useState, useEffect } from "react";
import styles from "./NotificationBell.module.scss";

type Notification = {
  id: number;
  type: "friend-request" | "message" | "mention" | "group-invite";
  from: string;
  message: string;
  time: string;
  read: boolean;
};

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "friend-request",
      from: "Maria",
      message: "sent you a friend request",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      from: "Erik",
      message: "sent you a message",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "group-invite",
      from: "Sofia",
      message: "invited you to Greece Trip 2026",
      time: "3 hours ago",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "friend-request":
        return "👥";
      case "message":
        return "💬";
      case "mention":
        return "💭";
      case "group-invite":
        return "🎉";
    }
  };

  return (
    <div className={styles.notificationBell}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.bellButton}
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>
            <h3 className={styles.title}>Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className={styles.markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className={styles.notificationList}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${styles.notificationItem} ${
                    !notification.read ? styles.unread : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={styles.icon}>
                    {getIcon(notification.type)}
                  </div>
                  <div className={styles.content}>
                    <p className={styles.message}>
                      <strong>{notification.from}</strong>{" "}
                      {notification.message}
                    </p>
                    <p className={styles.time}>{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className={styles.unreadDot}></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
