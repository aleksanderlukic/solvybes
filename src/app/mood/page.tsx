"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";

type ContentType = "quote" | "tips" | null;

type MoodEntry = {
  id: number;
  emoji: string;
  date: string;
  note: string;
};

const MOOD_EMOJIS = [
  { emoji: "😊", label: "Glad" },
  { emoji: "😌", label: "Lugn" },
  { emoji: "😐", label: "Okej" },
  { emoji: "😔", label: "Nere" },
  { emoji: "😢", label: "Ledsen" },
  { emoji: "😤", label: "Frustrerad" },
  { emoji: "🤗", label: "Tacksam" },
  { emoji: "😴", label: "Trött" },
];

export default function MoodPage() {
  const [contentType, setContentType] = useState<ContentType>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentTips, setCurrentTips] = useState<string[]>([]);
  const [displayedText, setDisplayedText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [moodNote, setMoodNote] = useState("");
  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("moodHistory");
    if (saved) {
      setMoodHistory(JSON.parse(saved));
    }
  }, []);

  const saveMoodEntry = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: Date.now(),
      emoji: selectedMood,
      date: new Date().toISOString(),
      note: moodNote,
    };

    const updated = [newEntry, ...moodHistory].slice(0, 30);
    setMoodHistory(updated);
    localStorage.setItem("moodHistory", JSON.stringify(updated));
    setSelectedMood("");
    setMoodNote("");
  };

  const getMoodInsight = () => {
    if (moodHistory.length < 3)
      return "Fortsätt logga din känsla för att se trender!";

    const recent = moodHistory.slice(0, 7);
    const positive = recent.filter((m) =>
      ["😊", "😌", "🤗"].includes(m.emoji)
    ).length;
    const negative = recent.filter((m) =>
      ["😔", "😢", "😤"].includes(m.emoji)
    ).length;

    if (positive > negative * 2) return "Du har haft en positiv vecka! ✨";
    if (negative > positive * 2)
      return "Det verkar tufft just nu. Ta hand om dig! 💙";
    return "Din känsla är blandad. Det är helt okej! 🌈";
  };

  const quotes = [
    "The sun will shine again, and with it comes new possibilities.",
    "Winter teaches us patience; summer rewards us with warmth.",
    "Every season is a chance to reset and grow.",
    "The warmth you seek is already within you.",
    "Like flowers waiting for spring, your best days are yet to bloom.",
    "Each sunrise is a reminder: brighter days are always on the horizon.",
    "The longest nights make the summer sun feel even warmer.",
    "You carry the light of summer within you, even in winter.",
  ];

  const tipsSet = [
    [
      "Start your morning with 10 minutes of sunlight exposure to boost vitamin D",
      "Practice gratitude journaling before bed - write 3 things you are thankful for",
      "Take a 20-minute walk during your lunch break to reset your mind",
    ],
    [
      "Listen to uplifting music for 15 minutes daily to elevate your mood",
      "Connect with a friend or loved one each week through a video call",
      "Try a new hobby or creative activity that brings you joy",
    ],
    [
      "Maintain a consistent sleep schedule - aim for 7-9 hours per night",
      "Incorporate colorful foods into your meals for better nutrition",
      "Spend time in nature, even for short 5-minute periods",
    ],
    [
      "Practice deep breathing exercises for 5 minutes each morning",
      "Set up a cozy corner in your home with warm lighting and comfortable seating",
      "Watch sunset or sunrise videos when you need a mental escape",
    ],
    [
      "Start a photo journal of beautiful moments to review when feeling down",
      "Reduce screen time before bed and read something inspiring instead",
      "Plan a future trip or adventure - the anticipation itself boosts happiness",
    ],
  ];

  const generateQuote = async () => {
    setContentType("quote");
    setIsGenerating(true);
    setShowContent(false);
    setDisplayedText("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
    setIsGenerating(false);
    setShowContent(true);
  };

  const generateTips = async () => {
    setContentType("tips");
    setIsGenerating(true);
    setShowContent(false);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newTips = tipsSet[Math.floor(Math.random() * tipsSet.length)];
    setCurrentTips(newTips);
    setIsGenerating(false);
    setShowContent(true);
  };

  useEffect(() => {
    if (contentType === "quote" && showContent && currentQuote) {
      let i = 0;
      setDisplayedText("");
      const timer = setInterval(() => {
        if (i < currentQuote.length) {
          setDisplayedText(currentQuote.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [showContent, currentQuote, contentType]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>☀️</div>
        <h1 className={styles.title}>Mood Booster</h1>
        <p className={styles.subtitle}>
          Get personalized quotes and tips to brighten your day
        </p>
      </div>

      <div className={styles.trackerToggle}>
        <button
          onClick={() => setShowTracker(!showTracker)}
          className={styles.toggleButton}
        >
          {showTracker ? "🤖 Visa AI Booster" : "📊 Visa Känslotracker"}
        </button>
      </div>

      {showTracker ? (
        <div className={styles.trackerSection}>
          <h2 className={styles.trackerTitle}>Hur mår du idag?</h2>

          <div className={styles.moodSelector}>
            {MOOD_EMOJIS.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => setSelectedMood(mood.emoji)}
                className={`${styles.moodButton} ${
                  selectedMood === mood.emoji ? styles.selected : ""
                }`}
              >
                <span className={styles.moodEmoji}>{mood.emoji}</span>
                <span className={styles.moodLabel}>{mood.label}</span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className={styles.noteSection}>
              <textarea
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Vill du skriva en anteckning? (valfritt)"
                className={styles.noteInput}
                rows={3}
              />
              <button onClick={saveMoodEntry} className={styles.saveButton}>
                💾 Spara Känsla
              </button>
            </div>
          )}

          {moodHistory.length > 0 && (
            <>
              <div className={styles.insightCard}>
                <div className={styles.insightIcon}>🔮</div>
                <p className={styles.insightText}>{getMoodInsight()}</p>
              </div>

              <div className={styles.historySection}>
                <h3 className={styles.historyTitle}>
                  Historik (senaste 7 dagar)
                </h3>
                <div className={styles.historyChart}>
                  {moodHistory
                    .slice(0, 7)
                    .reverse()
                    .map((entry) => (
                      <div key={entry.id} className={styles.chartBar}>
                        <span className={styles.chartEmoji}>{entry.emoji}</span>
                        <span className={styles.chartDate}>
                          {new Date(entry.date).toLocaleDateString("sv-SE", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    ))}
                </div>

                <div className={styles.historyList}>
                  {moodHistory.slice(0, 5).map((entry) => (
                    <div key={entry.id} className={styles.historyItem}>
                      <span className={styles.historyEmoji}>{entry.emoji}</span>
                      <div className={styles.historyInfo}>
                        <span className={styles.historyDate}>
                          {new Date(entry.date).toLocaleDateString("sv-SE", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {entry.note && (
                          <span className={styles.historyNote}>
                            {entry.note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className={styles.actionGrid}>
            <button onClick={generateQuote} className={styles.actionCard}>
              <div className={styles.actionIcon}>💬</div>
              <h2 className={styles.actionTitle}>Generate Quote</h2>
              <p className={styles.actionDescription}>
                Get an inspiring quote to lift your spirits
              </p>
            </button>

            <button onClick={generateTips} className={styles.actionCard}>
              <div className={styles.actionIcon}>💡</div>
              <h2 className={styles.actionTitle}>Get 3 Tips</h2>
              <p className={styles.actionDescription}>
                Receive actionable tips to improve your mood
              </p>
            </button>
          </div>

          {isGenerating && (
            <div className={styles.loadingCard}>
              <div className={styles.aiIcon}>🤖</div>
              <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className={styles.loadingText}>
                {contentType === "quote"
                  ? "AI is crafting your quote..."
                  : "AI is generating your tips..."}
              </p>
            </div>
          )}

          {contentType === "quote" && showContent && !isGenerating && (
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <span className={styles.aiLabel}>✨ AI Generated</span>
                <h3 className={styles.resultTitle}>Your Personalized Quote</h3>
              </div>
              <p className={styles.quote}>
                &ldquo;{displayedText}
                <span className={styles.cursor}>|</span>&rdquo;
              </p>
              <button
                onClick={generateQuote}
                className={styles.regenerateButton}
              >
                🔄 Generate New Quote
              </button>
            </div>
          )}

          {contentType === "tips" && showContent && !isGenerating && (
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <span className={styles.aiLabel}>✨ AI Generated</span>
                <h3 className={styles.resultTitle}>Your Personalized Tips</h3>
              </div>
              <ul className={styles.tipsList}>
                {currentTips.map((tip, index) => (
                  <li key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                    <span className={styles.tipNumber}>{index + 1}</span>
                    {tip}
                  </li>
                ))}
              </ul>
              <button
                onClick={generateTips}
                className={styles.regenerateButton}
              >
                🔄 Generate New Tips
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
