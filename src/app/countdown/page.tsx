"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";

export default function CountdownPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [customDate, setCustomDate] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [savedCustomCountdowns, setSavedCustomCountdowns] = useState<
    Array<{ title: string; date: string }>
  >([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const summerStart = new Date("2026-06-21");
  const midsummer = new Date("2026-06-20"); // Midsommarafton

  const getDaysUntil = (targetDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    return Math.ceil(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const daysUntilSummer = getDaysUntil(summerStart);
  const daysUntilMidsummer = getDaysUntil(midsummer);

  // Temperature milestones with estimated dates
  const milestones = [
    {
      temp: ">5°C",
      icon: "🌱",
      estimatedDate: new Date("2026-03-15"),
      achieved: new Date() > new Date("2026-03-15"),
    },
    {
      temp: ">10°C",
      icon: "🌸",
      estimatedDate: new Date("2026-04-10"),
      achieved: new Date() > new Date("2026-04-10"),
    },
    {
      temp: ">20°C",
      icon: "☀️",
      estimatedDate: new Date("2026-05-20"),
      achieved: new Date() > new Date("2026-05-20"),
    },
    {
      temp: ">30°C",
      icon: "🔥",
      estimatedDate: new Date("2026-07-15"),
      achieved: new Date() > new Date("2026-07-15"),
    },
  ];

  const handleAddCustomCountdown = () => {
    if (customDate && customTitle) {
      setSavedCustomCountdowns([
        ...savedCustomCountdowns,
        { title: customTitle, date: customDate },
      ]);
      setCustomDate("");
      setCustomTitle("");
    }
  };

  const handleRemoveCountdown = (index: number) => {
    setSavedCustomCountdowns(
      savedCustomCountdowns.filter((_, i) => i !== index)
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>⏳</div>
        <h1 className={styles.title}>Summer Countdown</h1>
        <p className={styles.subtitle}>Track your journey to warmer days</p>
      </div>

      <div className={styles.mainCard}>
        <h2 className={styles.mainCardTitle}>Dagar Till Sommar</h2>
        <div className={styles.daysCount}>{daysUntilSummer}</div>
        <div className={styles.daysLabel}>dagar kvar</div>
        <p className={styles.summerDate}>
          Sommar börjar{" "}
          {summerStart.toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className={styles.mainCard}>
        <h2 className={styles.mainCardTitle}>🌸 Dagar Till Midsommar</h2>
        <div className={styles.daysCount}>{daysUntilMidsummer}</div>
        <div className={styles.daysLabel}>dagar kvar</div>
        <p className={styles.summerDate}>
          Midsommarafton{" "}
          {midsummer.toLocaleDateString("sv-SE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className={styles.milestonesSection}>
        <h2 className={styles.sectionTitle}>Temperatur Milstolpar</h2>
        <div className={styles.milestoneGrid}>
          {milestones.map((milestone, index) => {
            const daysUntilMilestone = getDaysUntil(milestone.estimatedDate);
            return (
              <div
                key={index}
                className={`${styles.milestoneCard} ${
                  milestone.achieved ? styles.achieved : ""
                }`}
              >
                <div className={styles.milestoneIcon}>{milestone.icon}</div>
                <div className={styles.milestoneTemp}>{milestone.temp}</div>
                <div className={styles.milestoneStatus}>
                  {milestone.achieved ? "Uppnått!" : "Kommer snart"}
                </div>
                <div
                  className={`${styles.milestoneDays} ${
                    milestone.achieved ? styles.achieved : ""
                  }`}
                >
                  {milestone.achieved ? "✓" : daysUntilMilestone}
                </div>
                <div className={styles.milestoneDaysLabel}>
                  {milestone.achieved ? "genomfört" : "dagar kvar"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.customSection}>
        <h2 className={styles.sectionTitle}>Din Egen Nedräkning</h2>
        <div className={styles.customForm}>
          <input
            type="text"
            placeholder="T.ex. 'Min semester i Spanien'"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className={styles.customInput}
          />
          <input
            type="date"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            className={styles.customInput}
          />
          <button
            onClick={handleAddCustomCountdown}
            className={styles.addButton}
          >
            ➕ Lägg Till Nedräkning
          </button>
        </div>

        {savedCustomCountdowns.length > 0 && (
          <div className={styles.customCountdownGrid}>
            {savedCustomCountdowns.map((countdown, index) => {
              const daysUntil = getDaysUntil(new Date(countdown.date));
              return (
                <div key={index} className={styles.customCountdownCard}>
                  <button
                    onClick={() => handleRemoveCountdown(index)}
                    className={styles.removeButton}
                  >
                    ✕
                  </button>
                  <div className={styles.customIcon}>✈️</div>
                  <h3 className={styles.customTitle}>{countdown.title}</h3>
                  <div className={styles.customDays}>{daysUntil}</div>
                  <div className={styles.customDaysLabel}>dagar kvar</div>
                  <p className={styles.customDate}>
                    {new Date(countdown.date).toLocaleDateString("sv-SE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
