'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { searchAnime } from "@/lib/api/jikan";
import type { Anime } from '@/lib/api/types';
import AnimeModal from "../components/AnimeModel";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage(){
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const [searchResults, setSearchResults] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(query) {
            performSearch(query);
        }
    }, [query]);

    const performSearch = async (searchQuery: string) => {
        setIsLoading(true);
        try{
            const results = await searchAnime(searchQuery);
            setSearchResults(results);
        }
        catch (error){
            console.error('Search failed:', error);
            setSearchResults([]);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleAnimeClick = (anime: Anime) => {
        setSelectedAnime(anime);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAnime(null);
    };

    return (
        <div>
            <section className="max-w-5xl mx-auto">
                {/* Search Header */}
                <div className="mb-8">
                    <h2 className="text-2xl mb-4 font-medium p-1 border-b-4 border-pink-200">
                        Search Results
                    </h2>
                    <p className="text-gray-600">
                        {isLoading ? 'Searching...' : `Found ${searchResults.length} results for "${query}"`}
                    </p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="animate-spin text-pink-300 w-8 h-8" />
                        <span className="ml-2 text-gray-600">Searching anime...</span>
                    </div>
                )}

                {/* Search Results */}
                {!isLoading && searchResults.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {searchResults.map((anime) => (
                            <div 
                            key={anime.mal_id}
                            onClick={() => handleAnimeClick(anime)}
                            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-700 hover:border-pink-300/30">
                                {/* Anime Image */}
                                <div className="relative h-48">
                                    <img
                                        src={anime.images.jpg.image_url}
                                        alt={anime.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {anime.score && (
                                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-bold">
                                           ⭐ {anime.score.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                                {/* Anime Info */}
                                <div className="p-4">
                                    <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{anime.title}</h3>
                                    {anime.title_english && anime.title_english !== anime.title && (
                                        <p className="text-gray-400 text-sm mb-2 line-clamp-1">{anime.title_english}</p>
                                    )}

                                    {/* Genres */}
                                    {anime.genres && anime.genres.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {anime.genres.slice(0,2).map((genre) => (
                                                <span
                                                    key={genre.mal_id}
                                                    className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs border border-pink-500/30"
                                                >
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Results */}
                {!isLoading && searchResults.length === 0 && query && (
                    <div className="text-center py-12">
                        <Search className="mx-auto text-gray-600 w-16 h-16 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Anime Found</h3>
                        <p className="text-gray-500">Try searching with different keywords or check your spelling.</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !query && (
                    <div className="text-center py-12">
                        <Search className="mx-auto text-gray-600 w-16 h-16 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Start Searching</h3>
                        <p className="text-gray-500">Use the search bar above to find your favorite anime.</p>
                    </div>
                )}
            </section>

            {/* Anime Modal */}
            {selectedAnime && (
                <AnimeModal
                    anime={selectedAnime}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}