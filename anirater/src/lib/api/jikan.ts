import type { Anime } from './types';

export async function getTrendingAnime(): Promise<Anime[]> {
  const res = await fetch('https://api.jikan.moe/v4/seasons/now?sfw');
  const data = await res.json();
  return data.data;
}

// if (!res.ok) {
//         throw new Error('API request failed with status ${res.status}');
//     }