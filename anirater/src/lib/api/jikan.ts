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
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTopAnime(): Promise<Anime[]> {
  try {
    // Add delay to respect rate limits
    await delay(1000); // Wait 1 second
    
    console.log('Fetching top anime...');
    
    const res = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=15');
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      if (res.status === 429) {
        throw new Error('API rate limit exceeded. Please wait a moment and try again.');
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Top anime response:', data);
    
    if (!data || !data.data) {
      throw new Error('Invalid API response structure');
    }
    
    return data.data.slice(0, 15);
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
}

export async function searchAnime(query: string): Promise<Anime[]>{
  try{
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&sfw&order_by=score&sort=desc&limit=20`);
    if(!res.ok){
      throw new Error('Failed to search anime');
    }
    const data = await res.json();
    return data.data.slice(0,20);
  }
  catch (error){
    console.error('Error searching anime:', error);
    return [];
  }
}


