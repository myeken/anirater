'use client';

import { getTrendingAnime, getAnimeDetails, getTopAnime } from "@/lib/api/jikan";
import type { Anime } from "@/lib/api/types";
import AnimeCarousel from "./components/AnimeCarousel";
import AnimeModal from "./components/AnimeModel";
import TopAnimeList from "./components/TopAnimeList";
import { useState, useEffect } from "react";

export default function Home() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topAnimeList, setTopAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnime= async () => {
      try {
       const [trendingData, topData] = await Promise.all([
        getTrendingAnime(),
        getTopAnime()
       ]);
       setAnimeList(trendingData);
       setTopAnimeList(topData);
      }
      catch (error) {
        console.error('Error fetching anime: ', error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const handleAnimeClick = async (anime: Anime) => {
    try{
      const detailedAnime = await getAnimeDetails(anime.mal_id);
      if(detailedAnime){
        setSelectedAnime(detailedAnime);
        setIsModalOpen(true);
      }
      else{
        setSelectedAnime(anime);
        setIsModalOpen(true);
      }
    }
    catch (error) {
      console.error('Error fetching anime details: ', error);
      setSelectedAnime(anime);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnime(null);
  };

  if(isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-300 mx-auto">
          </div>
          <p className="mt-4 text-gray-600">Loading anime...</p>
        </div>
      </div>
    );
  }

  return(
    <div>
      {/* Seasonal Anime */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl mb-4 font-medium p-1 border-b-4 border-pink-200">
          Current Seasonal Anime:
        </h2>
        <AnimeCarousel
            animeList={animeList}
            onAnimeClick={handleAnimeClick}
        />
      </section>
      {/* Top Anime of All Time */}
      <section className="max-w-5xl mx-auto p-5">
        <h2 className="text-2xl mb-4 font-medium p-1 border-b-4 border-pink-200">Top 15 Anime of All Time: </h2>
        <TopAnimeList
          animeList={topAnimeList}
          onAnimeClick={handleAnimeClick}
          ></TopAnimeList>

      </section>
      {selectedAnime && isModalOpen && (
        <AnimeModal
            anime={selectedAnime}
            isOpen={isModalOpen}
            onClose={closeModal}
        />
      )}
    </div>
  );
}
