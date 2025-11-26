"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import AnimeModal from "@/app/components/AnimeModel";
import { Anime } from "@/lib/api/types";
import { searchAnime } from "@/lib/api/jikan";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const runSearch = async () => {
      setLoading(true);
      const data = await searchAnime(query);
      setResults(data);
      setLoading(false);
    };

    runSearch();
  }, [query]);

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-700 mb-4">
        Results for: <span className="text-pink-500">{query}</span>
      </h1>

      {loading && (
        <p className="text-center text-pink-700 font-medium">Searching…</p>
      )}

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.05 }}
      >
        {results.map((anime: Anime) => (
          <motion.div
            key={anime.mal_id}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-pink-100 rounded-lg overflow-hidden shadow shadow-pink-300 hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              setSelectedAnime(anime);
              setIsModalOpen(true);
            }}
          >
            <img
              src={anime.images?.jpg?.image_url}
              alt={anime.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-2 text-sm text-center text-pink-800 font-medium">
              {anime.title}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <AnimeModal
        anime={selectedAnime}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
