"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";

type JournalEntry = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  mood: string;
  hasPhoto: boolean;
};

const MOOD_TAGS = [
  "😊 Glad",
  "😌 Avslappnad",
  "🤩 Exalterad",
  "🥰 Lycklig",
  "😎 Cool",
  "🌟 Inspirerad",
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMood, setSelectedMood] = useState(MOOD_TAGS[0]);
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem("journalEntries", JSON.stringify(newEntries));
  };

  const handleSave = () => {
    if (!title || !location || !description) return;

    if (editingId) {
      const updated = entries.map((entry) =>
        entry.id === editingId
          ? { ...entry, title, date, location, description, mood: selectedMood }
          : entry
      );
      saveEntries(updated);
    } else {
      const newEntry: JournalEntry = {
        id: Date.now(),
        title,
        date,
        location,
        description,
        mood: selectedMood,
        hasPhoto: false,
      };
      saveEntries([newEntry, ...entries]);
    }

    handleCloseModal();
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setDate(entry.date);
    setLocation(entry.location);
    setDescription(entry.description);
    setSelectedMood(entry.mood);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Är du säker på att du vill radera den här posten?")) {
      saveEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setTitle("");
    setDate(new Date().toISOString().split("T")[0]);
    setLocation("");
    setDescription("");
    setSelectedMood(MOOD_TAGS[0]);
  };

  const filteredEntries = filterLocation
    ? entries.filter((e) =>
        e.location.toLowerCase().includes(filterLocation.toLowerCase())
      )
    : entries;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>📖 Resedagbok</h1>
          <p className={styles.subtitle}>
            Dokumentera dina sommarminnen och äventyr
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className={styles.addButton}>
          ➕ Ny Post
        </button>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Filtrera efter plats..."
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className={styles.filterInput}
        />
        <div className={styles.entriesCount}>
          {filteredEntries.length}{" "}
          {filteredEntries.length === 1 ? "post" : "poster"}
        </div>
      </div>

      <div className={styles.entriesGrid}>
        {filteredEntries.map((entry) => (
          <div key={entry.id} className={styles.entryCard}>
            <div className={styles.entryHeader}>
              <div className={styles.entryMood}>{entry.mood}</div>
              <div className={styles.entryActions}>
                <button
                  onClick={() => handleEdit(entry)}
                  className={styles.editButton}
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className={styles.deleteButton}
                >
                  🗑️
                </button>
              </div>
            </div>
            <h3 className={styles.entryTitle}>{entry.title}</h3>
            <div className={styles.entryMeta}>
              <span className={styles.entryDate}>
                📅{" "}
                {new Date(entry.date).toLocaleDateString("sv-SE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className={styles.entryLocation}>📍 {entry.location}</span>
            </div>
            <p className={styles.entryDescription}>{entry.description}</p>
            {entry.hasPhoto && (
              <div className={styles.photoPlaceholder}>📷 Foto bifogat</div>
            )}
          </div>
        ))}

        {filteredEntries.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📖</div>
            <p className={styles.emptyText}>
              {filterLocation
                ? "Inga poster hittades för denna plats"
                : "Din resedagbok är tom. Börja dokumentera dina äventyr!"}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingId ? "Redigera Post" : "Ny Dagbokspost"}
              </h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Titel</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="T.ex. 'Magisk solnedgång i Santorini'"
                  className={styles.input}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Datum</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Plats</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Barcelona, Spanien"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Känsla</label>
                <div className={styles.moodGrid}>
                  {MOOD_TAGS.map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`${styles.moodButton} ${
                        selectedMood === mood ? styles.selected : ""
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Beskrivning</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Beskriv din upplevelse..."
                  className={styles.textarea}
                  rows={6}
                />
              </div>

              <div className={styles.photoUpload}>
                <button className={styles.uploadButton}>
                  📷 Lägg till foto (kommer snart)
                </button>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                onClick={handleCloseModal}
                className={styles.cancelButton}
              >
                Avbryt
              </button>
              <button onClick={handleSave} className={styles.saveButton}>
                💾 Spara
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
