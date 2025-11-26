export interface Anime {
    mal_id: number;
    title: string;
    images: 
    { jpg: {
        image_url: string;
        large_image_url?: string;
    }; 
};
title_english?: string;
title_japanese?: string;
synopsis?: string;
score?: number;
scored_by?: number;
year?: number;
season?: string;
status?: string;
episodes?: number;
duration?: string;
members?: number;
popularity?: number;
rank?: number;
genres?: {
    mal_id: number;
    name: string;
}[];
}