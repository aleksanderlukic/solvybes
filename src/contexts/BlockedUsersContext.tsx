"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type BlockedUsersContextType = {
  blockedUsers: string[];
  blockUser: (username: string) => void;
  unblockUser: (username: string) => void;
  isBlocked: (username: string) => boolean;
};

const BlockedUsersContext = createContext<BlockedUsersContextType | undefined>(
  undefined
);

export function BlockedUsersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("blockedUsers");
    if (stored) {
      setBlockedUsers(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("blockedUsers", JSON.stringify(blockedUsers));
  }, [blockedUsers]);

  const blockUser = (username: string) => {
    if (!blockedUsers.includes(username)) {
      setBlockedUsers([...blockedUsers, username]);
    }
  };

  const unblockUser = (username: string) => {
    setBlockedUsers(blockedUsers.filter((user) => user !== username));
  };

  const isBlocked = (username: string) => {
    return blockedUsers.includes(username);
  };

  return (
    <BlockedUsersContext.Provider
      value={{ blockedUsers, blockUser, unblockUser, isBlocked }}
    >
      {children}
    </BlockedUsersContext.Provider>
  );
}

export function useBlockedUsers() {
  const context = useContext(BlockedUsersContext);
  if (context === undefined) {
    throw new Error(
      "useBlockedUsers must be used within a BlockedUsersProvider"
    );
  }
  return context;
}
