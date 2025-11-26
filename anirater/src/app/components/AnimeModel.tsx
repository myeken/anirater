"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Anime } from "@/lib/api/types";
import { X, Star, Calendar, Clock } from "lucide-react";
import { useState } from "react";

export default function AnimeModal({
  anime,
  isOpen,
  onClose,
}: {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"added" | "error" | null>(null);

  if (!anime) return null;

  const handleAddToList = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: anime.mal_id,
          title: anime.title,
          image: anime.images.jpg.large_image_url,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("added");
    } catch (e) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, duration: 0.3 }}
            className="relative w-full max-w-2xl bg-gray-900 rounded-xl overflow-hidden border border-pink-300/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 text-white hover:text-pink-300 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Image Header */}
            <div className="relative h-64 md:h-80">
              <img
                src={
                  anime.images.jpg.large_image_url ||
                  anime.images.jpg.image_url
                }
                alt={anime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

              {/* Titles */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {anime.title}
                </h1>
                {anime.title_english &&
                  anime.title_english !== anime.title && (
                    <p className="text-lg text-gray-300 mb-2">
                      {anime.title_english}
                    </p>
                  )}
                {anime.title_japanese && (
                  <p className="text-sm text-gray-400 font-mono">
                    {anime.title_japanese}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Rating */}
              {anime.score && (
                <div className="flex items-center gap-2 mb-6 bg-yellow-400/20 text-yellow-400 px-3 py-2 rounded-lg w-fit">
                  <Star size={20} className="fill-yellow-400" />
                  <span className="font-bold">{anime.score.toFixed(1)}</span>
                  {anime.scored_by && (
                    <span className="text-sm text-gray-400">
                      ({anime.scored_by.toLocaleString()} votes)
                    </span>
                  )}
                </div>
              )}

              {/* Synopsis */}
              {anime.synopsis && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Synopsis
                  </h3>
                  <p className="text-gray-300 leading-relaxed max-h-32 overflow-y-auto">
                    {anime.synopsis}
                  </p>
                </div>
              )}

              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm border border-pink-500/30"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left */}
                <div className="space-y-4">
                  {(anime.year || anime.season || anime.status) && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Airing Information
                      </h3>
                      <div className="space-y-2">
                        {anime.year && anime.season && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar size={16} />
                            <span>
                              {anime.season} {anime.year}
                            </span>
                          </div>
                        )}

                        {anime.status && (
                          <div className="flex items-center gap-2 text-gray-300">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                anime.status === "Currently Airing"
                                  ? "bg-green-500/20 text-green-400"
                                  : anime.status === "Finished Airing"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {anime.status}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Episode Information
                    </h3>
                    <div className="space-y-2">
                      {anime.episodes && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">
                            {anime.episodes}{" "}
                            {anime.episodes === 1 ? "Episode" : "Episodes"}
                          </span>
                        </div>
                      )}

                      {anime.duration && (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock size={16} />
                          <span>{anime.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ⭐ ADD TO LIST BUTTON */}
              <div className="mt-8">
                <button
                  onClick={handleAddToList}
                  disabled={loading}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition"
                >
                  {loading ? "Adding..." : "Add to My List"}
                </button>

                {status === "added" && (
                  <p className="text-green-400 mt-3 text-center">
                    Added to your list!
                  </p>
                )}

                {status === "error" && (
                  <p className="text-red-400 mt-3 text-center">
                    Something went wrong. Try again.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
