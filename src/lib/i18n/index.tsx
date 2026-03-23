"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "en" | "id";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

// Simple translations - can be expanded
const translations: Record<Locale, Record<string, string>> = {
  en: {
    "Navigation.home": "Home",
    "Navigation.login": "Login",
    "Navigation.logout": "Logout",
    "HomePage.title": "My Blog",
    "HomePage.subtitle": "Welcome to our blog",
    "HomePage.loading": "Loading posts...",
    "HomePage.noPosts": "No posts yet",
    "HomePage.createFirst": "Be the first to create one!",
    "Post.create": "Create New Post",
    "Post.loginToCreate": "Login to Create Post",
    "Post.edit": "Edit",
    "Post.delete": "Delete",
    "Post.update": "Update",
    "Post.save": "Save Changes",
    "Post.cancel": "Cancel",
    "Post.title": "Title",
    "Post.content": "Content",
    "Post.author": "Author",
    "Post.imageUrl": "Image URL",
    "Comments.title": "Comments",
    "Comments.add": "Add Comment",
    "Comments.yourName": "Your name",
    "Comments.writeComment": "Write a comment...",
    "Comments.noComments": "No comments yet",
    "Comments.beFirst": "Be the first!",
    "Auth.signIn": "Sign In",
    "Auth.email": "Email",
    "Auth.password": "Password",
    "Auth.invalidCredentials": "Invalid email or password",
    "Auth.demoAccounts": "Demo Accounts",
    "Common.loading": "Loading...",
    "Common.error": "An error occurred",
    "Common.back": "Back",
    "Common.views": "Views",
    "Common.statistics": "Post Statistics",
  },
  id: {
    "Navigation.home": "Beranda",
    "Navigation.login": "Masuk",
    "Navigation.logout": "Keluar",
    "HomePage.title": "Blog Saya",
    "HomePage.subtitle": "Selamat datang di blog kami",
    "HomePage.loading": "Memuat posting...",
    "HomePage.noPosts": "Belum ada posting",
    "HomePage.createFirst": "Jadilah yang pertama membuat!",
    "Post.create": "Buat Posting Baru",
    "Post.loginToCreate": "Masuk untuk Buat Posting",
    "Post.edit": "Ubah",
    "Post.delete": "Hapus",
    "Post.update": "Perbarui",
    "Post.save": "Simpan Perubahan",
    "Post.cancel": "Batal",
    "Post.title": "Judul",
    "Post.content": "Konten",
    "Post.author": "Penulis",
    "Post.imageUrl": "URL Gambar",
    "Comments.title": "Komentar",
    "Comments.add": "Tambah Komentar",
    "Comments.yourName": "Nama Anda",
    "Comments.writeComment": "Tulis komentar...",
    "Comments.noComments": "Belum ada komentar",
    "Comments.beFirst": "Jadilah yang pertama!",
    "Auth.signIn": "Masuk",
    "Auth.email": "Email",
    "Auth.password": "Kata Sandi",
    "Auth.invalidCredentials": "Email atau kata sandi tidak valid",
    "Auth.demoAccounts": "Akun Demo",
    "Common.loading": "Memuat...",
    "Common.error": "Terjadi kesalahan",
    "Common.back": "Kembali",
    "Common.views": "Dilihat",
    "Common.statistics": "Statistik Posting",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Load locale from localStorage on mount
    const stored = localStorage.getItem("NEXT_LOCALE") as Locale;
    if (stored && (stored === "en" || stored === "id")) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("NEXT_LOCALE", newLocale);
  };

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}