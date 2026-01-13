"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./GlobalSearch.module.scss";

type SearchResult = {
  type: "video" | "user" | "group" | "channel";
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  link: string;
};

export default function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const allData: SearchResult[] = [
    {
      type: "video",
      id: "1",
      title: "Sunset Beach Walk",
      subtitle: "Spain",
      icon: "🏖️",
      link: "/watch/1",
    },
    {
      type: "video",
      id: "2",
      title: "Mediterranean Coast",
      subtitle: "Greece",
      icon: "🌊",
      link: "/watch/2",
    },
    {
      type: "video",
      id: "3",
      title: "Barcelona Streets",
      subtitle: "Spain",
      icon: "🏙️",
      link: "/watch/3",
    },
    {
      type: "user",
      id: "1",
      title: "Sofia",
      subtitle: "Online",
      icon: "👩",
      link: "/profile",
    },
    {
      type: "user",
      id: "2",
      title: "Erik",
      subtitle: "Online",
      icon: "👨",
      link: "/profile",
    },
    {
      type: "group",
      id: "1",
      title: "Spain Trip 2026",
      subtitle: "3 members",
      icon: "🇪🇸",
      link: "/community",
    },
    {
      type: "channel",
      id: "1",
      title: "General Chat",
      subtitle: "234 messages",
      icon: "💬",
      link: "/community",
    },
  ];

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = allData.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleResultClick = (link: string) => {
    router.push(link);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <div className={styles.globalSearch}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.searchButton}
        aria-label="Search"
      >
        🔍
      </button>

      {isOpen && (
        <div className={styles.searchModal}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search videos, users, groups..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchInput}
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery("");
                setResults([]);
              }}
              className={styles.closeButton}
            >
              ✕
            </button>
          </div>

          {results.length > 0 && (
            <div className={styles.results}>
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result.link)}
                  className={styles.resultItem}
                >
                  <div className={styles.resultIcon}>{result.icon}</div>
                  <div className={styles.resultContent}>
                    <div className={styles.resultTitle}>{result.title}</div>
                    {result.subtitle && (
                      <div className={styles.resultSubtitle}>
                        {result.subtitle}
                      </div>
                    )}
                  </div>
                  <div className={styles.resultType}>{result.type}</div>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className={styles.noResults}>
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
