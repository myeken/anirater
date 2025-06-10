import type { Anime } from './types';

export async function getTrendingAnime(): Promise<Anime[]> {
  const res = await fetch('https://api.jikan.moe/v4/seasons/now?sfw');
  const data = await res.json();

  const animeMap = new Map<number, Anime>();

  data.data.forEach((anime: Anime) => {

    if(!animeMap.has(anime.mal_id)) {
      animeMap.set(anime.mal_id, anime);
    }

     else {
      const existingAnime = animeMap.get(anime.mal_id);
      if(existingAnime){
        animeMap.set(anime.mal_id, {
          ...existingAnime,
          title: anime.title,
        });
      }
     }
  })
  return Array.from(animeMap.values());
}

