'use client';

import type { Anime } from '@/lib/api/types'
import { Star, Users, TrendingUp } from 'lucide-react';

export default function TopAnimeList ({
    animeList,
    onAnimeClick
}: {
    animeList: Anime[];
    onAnimeClick: (anime: Anime) => void;
}) {
    return (
        <div className="space-y-3">
            {animeList.map((anime, index) => (
                <div
                    key={anime.mal_id}
                    onClick={() => onAnimeClick(anime)}
                    style={{
                        transitionDelay: `${index * 80}ms`, // ← staggered delay
                    }}
                    className="
                        opacity-0 translate-y-3
                        animate-[fadeUp_0.4s_ease-out_forwards]
                        rounded-lg p-4 cursor-pointer transition-all
                        duration-200 hover:scale-[1.02]
                        border border-gray-700/50 hover:border-pink-300/30
                        text-pink-400
                    "
                >
                    <div className="flex items-center gap-4">

                        {/* Rank bubble */}
                        <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                index === 0 ? 'bg-yellow-500 text-black' :
                                index === 1 ? 'bg-gray-400 text-black' :
                                index === 2 ? 'bg-amber-600 text-white' :
                                'bg-gray-600 text-white'
                            }`}>
                                #{index + 1}
                            </div>
                        </div>

                        {/* Anime thumbnail */}
                        <div className="flex-shrink-0">
                            <img
                                src={anime.images.jpg.image_url}
                                alt={anime.title}
                                className="w-16 h-20 object-cover rounded-md"
                            />
                        </div>

                        {/* Anime info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg truncate hover:text-pink-300 transition-colors">
                                {anime.title}
                            </h3>

                            {anime.title_english &&
                                anime.title_english !== anime.title && (
                                <p className="text-gray-400 text-sm truncate">
                                    {anime.title_english}
                                </p>
                            )}

                            {/* Stats Row */}
                            <div className="flex items-center gap-4 mt-2">

                                {/* Score */}
                                {anime.score && (
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Star size={16} className="fill-yellow-400" />
                                        <span className="font-medium">{anime.score.toFixed(1)}</span>
                                    </div>
                                )}

                                {/* Members */}
                                {anime.members && (
                                    <div className="flex items-center gap-1 text-blue-400">
                                        <Users size={16} />
                                        <span className="text-sm">
                                            {anime.members.toLocaleString()}
                                        </span>
                                    </div>
                                )}

                                {/* Popularity */}
                                {anime.popularity && (
                                    <div className="flex items-center gap-1 text-green-400">
                                        <TrendingUp size={16} />
                                        <span className="text-sm">#{anime.popularity}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Genres */}
                        {anime.genres && anime.genres.length > 0 && (
                            <div className="flex-shrink-0 hidden md:block">
                                <div className="flex flex-wrap gap-1 justify-end">
                                    {anime.genres.slice(0, 2).map((genre) => (
                                        <span
                                            key={genre.mal_id}
                                            className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full text-xs border border-pink-500/30"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
