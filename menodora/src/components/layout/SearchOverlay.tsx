"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center bg-black/90 pt-32">
      <div className="w-full max-w-xl px-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-luxury-gold/40 pb-4">
          <Search className="h-5 w-5 text-luxury-gold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for fabrics..."
            autoFocus
            className="flex-1 bg-transparent text-lg text-white placeholder:text-gray-500 focus:outline-none"
          />
          <button type="button" onClick={onClose} aria-label="Close search">
            <X className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-500">Press Enter to search, Esc to close</p>
      </div>
    </div>
  );
}