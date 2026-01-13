"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NotificationBell from "./NotificationBell";
import GlobalSearch from "./GlobalSearch";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    {
      label: "Videos",
      dropdown: [
        { href: "/videos", label: "All Videos" },
        { href: "/playlists", label: "Playlists" },
      ],
    },
    {
      label: "Tools",
      dropdown: [
        { href: "/mood", label: "Mood AI" },
        { href: "/countdown", label: "Countdown" },
        { href: "/journal", label: "Journal" },
        { href: "/bucket-list", label: "Bucket List" },
      ],
    },
    { href: "/community", label: "Community" },
    {
      label: "Account",
      dropdown: [
        { href: "/profile", label: "Profile" },
        { href: "/settings", label: "Settings" },
      ],
    },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            Solvybes
          </Link>

          <div className={styles.links}>
            {navLinks.map((link, index) => (
              <div
                key={link.label}
                className={styles.linkWrapper}
                onMouseEnter={() =>
                  link.dropdown && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`${styles.link} ${
                      pathname === link.href ? styles.active : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button className={styles.link}>{link.label} ▾</button>
                )}

                {link.dropdown && openDropdown === link.label && (
                  <div className={styles.dropdown}>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.dropdownItem} ${
                          pathname === item.href ? styles.active : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <GlobalSearch />
            <NotificationBell />
          </div>
        </div>
      </div>
    </nav>
  );
}
