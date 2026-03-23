"use client";

import { useI18n } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as "en" | "id")}
      className="px-3 py-1.5 bg-gray-700/80 text-white text-sm rounded-lg border border-gray-600 hover:border-cyan-400 focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer backdrop-blur-sm"
    >
      <option value="en">EN</option>
      <option value="id">ID</option>
    </select>
  );
}