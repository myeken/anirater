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

export async function getAnimeDetails(mal_id: number): Promise<Anime | null> {
  try { 
    const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
    if(!res.ok) {
      throw new Error('Failed to fetch anime details');
    }
    const data = await res.json();
    return data.data;
  }
  catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
}

export async function getTopAnime(): Promise<Anime[]> {
  try {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
    if (!res.ok) {
      throw new Error('Failed to fetch top anime');
    }
    const data = await res.json();
    return data.data.slice(0,15);
  }
  catch (error) {
    console.error('Error fetching top anime: ', error);
    return [];
  }
}


