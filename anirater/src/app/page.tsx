import { getTrendingAnime } from "@/lib/api/jikan";
import type { Anime } from "@/lib/api/types";
import AnimeCarousel from "./components/AnimeCarousel";
import * as React from "react";


export default async function Home() {
  const animeList: Anime[] = await getTrendingAnime();
  return (
  
    <div>
      <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl mb-4 font-medium p-1 border-b-4 border-pink-200">Current Seasonal Anime:</h2>
      

      <AnimeCarousel animeList={animeList} />
      {/* {animeList.map((anime) => (
        <div key={`${anime.mal_id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`}>
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            width={200}
            height={300}
          />
          <h3>{anime.title}</h3>
          {anime.score && <span>{anime.score.toFixed(1)}</span>}
        </div>
      ))} */}
      
    </section>
    </div>
    
  );
}
