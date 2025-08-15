'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Anime } from '@/lib/api/types';
import {X, Star, Calendar, Clock, Users, Heart} from 'lucide-react';

export default function AnimeModal({
    anime,
    isOpen,
    onClose
}: {
    anime: Anime;
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!anime) return null;
    return (
        <AnimatePresence mode='wait'>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0}}
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/70'
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, duration: .3 }}
                        className='relative w-full max-w-2xl bg-gray-900 rounded-xl overflow-hidden border border-pink-300/30'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className='absolute right-4 top-4 z-10 text-white hover:text-pink-300 transition-colors'
                        >
                            <X size={24} />
                        </button>
                        
                        {/* Hero Seciton w/ image */}
                        <div className="relative h-64 md:h-80">
                            <img
                                src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                                alt={anime.title}
                                className='w-full h-full object-cover'
                            />
                            <div 
                            className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                            {/* Basic Info */}
                            <div className='absolute bottom-0 left-0 right-0 p-6'>
                                <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>{anime.title}</h1>
                                {anime.title_english && anime.title_english !== anime.title && (
                                    <p className='text-lg text-gray-300 mb-2'>{anime.title_english}</p>
                                )}
                                {anime.title_japanese && (
                                    <p className='text-sm text-gray-400 front-mono'>{anime.title_japanese}</p>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className='p-6'>
                            {/* Stats Row */}
                            <div className='flex flex-wrap gap-4 mb-6'>
                                {anime.score && (
                                    <div className='flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-3 py-2 rounded-lg'>
                                        <Star size={20} className="fill-yellow-400" ></Star>
                                        <span className='font-bold'>{anime.score.toFixed(1)}</span>
                                        {anime.scored_by && (
                                            <span className='text-sm text-gray-400'>({anime.scored_by.toLocaleString()} votes)
                                            </span>
                                        )}
                                    </div>
                                )}

                            </div>
                            <div className='flex justify-center mb-6'>
                                <button
                                onClick={() => handleAddToList(anime)}
                                className='bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 rounded-lg transition-colors duration-200 flex items-center gap-2'>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6'>

                                        </path>
                                    </svg>
                                    Add to List
                                </button>
                            </div>
                            {/* More Stats (Details Grid) */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                                {/* Left Column */}
                                <div className='space-y-4'>
                                    {anime.synopsis && (
                                        <div>
                                            <h3 className='text-lg font-semibold text-white mb-2 '>Synopsis</h3>
                                            <p className='text-gray-300 leading-relaxed max-h-32 overflow-y-auto'>{anime.synopsis}</p>
                                        </div>
                                    )}
                                    {anime.genres && anime.genres.length > 0 && (
                                        <div>
                                            <h3 className='text-lg font-semibold text-white mb-2'>Genres</h3>
                                            <div className='flex flex-wrap gap-2'>
                                                {anime.genres.map((genre) => (
                                                    <span
                                                        key={genre.mal_id}
                                                        className='bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full textsm border border-pink-500/30'>{genre.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* Right Column */}
                                <div className='space-y-4'>
                                    {(anime.year || anime.season || anime.status) && (
                                        <div>
                                            <h3 className='text-lg font-semibold text-white mb-2'>Airing Information</h3>
                                            <div className='space-y-2'>
                                                {anime.year && anime.season && (
                                                    <div className='flex items-center gap-2 text-gray-300'>
                                                        <Calendar size={16} />
                                                        <span>{anime.season} {anime.year}</span>
                                                    </div>
                                                )}
                                                {anime.status && (
                                                    <div className='flex items-center gap-2 text-gray-300'>
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${anime.status === 'Currently Airing' ? 'bg-green-500/20 text-green-400' :
                                                        anime.status === 'Finished Airing' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {anime.status}
                                                </span>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                    )}
                                    {/* Episode Information */}
                                    <div>
                                        <h3 className='text-lg font-semibold text-white mb-2'>Episode Information</h3>
                                        <div className='space-y-2'>
                                            {anime.episodes && (
                                                <div className='flex items-center gap-2 text-gray-300'>
                                                    <span className='bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm'>
                                                        {anime.episodes} {anime.episodes === 1 ? 'Episode' : 'Episodes'}
                                                    </span>
                                                </div>    
                                            )}
                                            {anime.duration && (
                                                <div className='flex items-center gap-2 text-gray-300'>
                                                    <Clock size={16} />
                                                    <span>{anime.duration}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const handleAddToList =(anime: Anime) => {
    alert(`Added ${anime.title} to your list!`);
}