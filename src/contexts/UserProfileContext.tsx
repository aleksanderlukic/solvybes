"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type UserProfile = {
  avatar: string;
  name: string;
  profileImage?: string; // Base64 or URL for uploaded image
};

type UserProfileContextType = {
  userProfile: UserProfile;
  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
  setProfileImage: (image: string | undefined) => void;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    avatar: "👨‍💻",
    name: "Aleksander",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      setUserProfile(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  const setAvatar = (avatar: string) => {
    setUserProfile((prev) => ({ ...prev, avatar }));
  };

  const setName = (name: string) => {
    setUserProfile((prev) => ({ ...prev, name }));
  };

  const setProfileImage = (image: string | undefined) => {
    setUserProfile((prev) => ({ ...prev, profileImage: image }));
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setAvatar, setName, setProfileImage }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
