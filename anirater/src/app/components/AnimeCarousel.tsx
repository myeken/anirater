'use client';
import { useCallback, useMemo, useState } from 'react';
import  useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaCarouselType} from 'embla-carousel'
import type { Anime } from '@/lib/api/types';
import { base } from 'framer-motion/client';

let uniqueIdCounter = 0;

export default function AnimeCarousel({ animeList }: { animeList: Anime[] }) {
      const [refreshKey, setRefreshKey] = useState(0);

  // Memoized deduplication with guaranteed unique keys
  const animeWithKeys = useMemo(() => {
    const seenIds = new Set<number>();
    return animeList.map(anime => {
      const isDuplicate = seenIds.has(anime.mal_id);
      seenIds.add(anime.mal_id);
      
      // Use crypto if available, otherwise fallback
      let uniqueSuffix = '';
      if (typeof crypto !== 'undefined') {
        uniqueSuffix = crypto.randomUUID();
      } else {
        uniqueIdCounter += 1;
        uniqueSuffix = `fallback-${uniqueIdCounter}-${performance.now()}`;
      }

      return {
        ...anime,
        uniqueKey: `${anime.mal_id}-${uniqueSuffix}`
      };
    });
  }, [animeList, refreshKey]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
    }, 
    [Autoplay({ 
      delay: 3000,
      stopOnInteraction: false,
      playOnInit: true,
     })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {animeWithKeys.map(({ uniqueKey, ...anime }) => (
          <div 
            key={uniqueKey}
            className="flex-[0_0_300px] min-w-0 relative h-120 rounded-xl overflow-hidden"
          >
            {/* Image with Overlay */}
            <div className="relative h-full w-full group">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg truncate">
                  {anime.title}
                </h3>
                <div className="flex items-center mt-2">
                  <div className="bg-yellow-400 px-2 py-1 rounded-md">
                    <span className="text-black font-bold text-sm">
                      ⭐ {anime.score?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-pink-200 p-2 rounded-full z-10"
      >
        &lt;
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-pink-200 p-2 rounded-full z-10"
      >
        &gt;
      </button>
    </div>
  );
}