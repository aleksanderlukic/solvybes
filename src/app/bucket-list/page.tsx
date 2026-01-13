"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";

type BucketListItem = {
  id: number;
  destination: string;
  country: string;
  priority: number;
  notes: string;
  targetDate: string;
  visited: boolean;
};

const PRIORITY_LABELS = [
  "😌 Låg",
  "😊 Medium",
  "🤩 Hög",
  "🔥 Måste",
  "⭐ Dröm",
];

export default function BucketListPage() {
  const [items, setItems] = useState<BucketListItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [destination, setDestination] = useState("");
  const [country, setCountry] = useState("");
  const [priority, setPriority] = useState(3);
  const [notes, setNotes] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "planned" | "visited"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("bucketList");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const saveItems = (newItems: BucketListItem[]) => {
    setItems(newItems);
    localStorage.setItem("bucketList", JSON.stringify(newItems));
  };

  const handleSave = () => {
    if (!destination || !country) return;

    if (editingId) {
      const updated = items.map((item) =>
        item.id === editingId
          ? { ...item, destination, country, priority, notes, targetDate }
          : item
      );
      saveItems(updated);
    } else {
      const newItem: BucketListItem = {
        id: Date.now(),
        destination,
        country,
        priority,
        notes,
        targetDate,
        visited: false,
      };
      saveItems([newItem, ...items]);
    }

    handleCloseModal();
  };

  const handleEdit = (item: BucketListItem) => {
    setEditingId(item.id);
    setDestination(item.destination);
    setCountry(item.country);
    setPriority(item.priority);
    setNotes(item.notes);
    setTargetDate(item.targetDate);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Är du säker på att du vill ta bort detta resmål?")) {
      saveItems(items.filter((item) => item.id !== id));
    }
  };

  const handleToggleVisited = (id: number) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, visited: !item.visited } : item
    );
    saveItems(updated);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setDestination("");
    setCountry("");
    setPriority(3);
    setNotes("");
    setTargetDate("");
  };

  const filteredItems = items
    .filter((item) => {
      if (filterStatus === "planned") return !item.visited;
      if (filterStatus === "visited") return item.visited;
      return true;
    })
    .filter(
      (item) =>
        item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.visited !== b.visited) return a.visited ? 1 : -1;
      return b.priority - a.priority;
    });

  const stats = {
    total: items.length,
    visited: items.filter((i) => i.visited).length,
    planned: items.filter((i) => !i.visited).length,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>🌍 Bucket List</h1>
          <p className={styles.subtitle}>
            Drömresmål att besöka under sommaren
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className={styles.addButton}>
          ➕ Lägg Till Resmål
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statLabel}>Totalt</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.planned}</div>
          <div className={styles.statLabel}>Planerade</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.visited}</div>
          <div className={styles.statLabel}>Besökta</div>
        </div>
      </div>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Sök resmål eller land..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.filterButtons}>
          <button
            onClick={() => setFilterStatus("all")}
            className={`${styles.filterButton} ${
              filterStatus === "all" ? styles.active : ""
            }`}
          >
            Alla
          </button>
          <button
            onClick={() => setFilterStatus("planned")}
            className={`${styles.filterButton} ${
              filterStatus === "planned" ? styles.active : ""
            }`}
          >
            Planerade
          </button>
          <button
            onClick={() => setFilterStatus("visited")}
            className={`${styles.filterButton} ${
              filterStatus === "visited" ? styles.active : ""
            }`}
          >
            Besökta
          </button>
        </div>
      </div>

      <div className={styles.itemsGrid}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.itemCard} ${
              item.visited ? styles.visited : ""
            }`}
          >
            <div className={styles.itemHeader}>
              <div className={styles.itemPriority}>
                {PRIORITY_LABELS[item.priority - 1]}
              </div>
              <div className={styles.itemActions}>
                <button
                  onClick={() => handleToggleVisited(item.id)}
                  className={styles.visitedButton}
                  title={
                    item.visited
                      ? "Markera som oplanerad"
                      : "Markera som besökt"
                  }
                >
                  {item.visited ? "✓" : "○"}
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className={styles.editButton}
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className={styles.deleteButton}
                >
                  🗑️
                </button>
              </div>
            </div>

            <h3 className={styles.itemDestination}>{item.destination}</h3>
            <div className={styles.itemCountry}>📍 {item.country}</div>

            {item.notes && <p className={styles.itemNotes}>{item.notes}</p>}

            {item.targetDate && (
              <div className={styles.itemDate}>
                🗓️ Mål:{" "}
                {new Date(item.targetDate).toLocaleDateString("sv-SE", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}

            {item.visited && (
              <div className={styles.visitedBadge}>✓ Besökt!</div>
            )}
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🌍</div>
            <p className={styles.emptyText}>
              {searchQuery || filterStatus !== "all"
                ? "Inga resmål hittades"
                : "Din bucket list är tom. Börja lägga till drömresmål!"}
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingId ? "Redigera Resmål" : "Nytt Resmål"}
              </h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Destination *</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="T.ex. 'Santorini'"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Land *</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="T.ex. 'Grekland'"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Prioritet: {PRIORITY_LABELS[priority - 1]}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={priority}
                  onChange={(e) => setPriority(parseInt(e.target.value))}
                  className={styles.rangeInput}
                />
                <div className={styles.rangeLabels}>
                  <span>Låg</span>
                  <span>Hög</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Målmånad (valfritt)</label>
                <input
                  type="month"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Anteckningar (valfritt)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Varför vill du besöka denna plats?"
                  className={styles.textarea}
                  rows={4}
                />
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
