'use client';
import React, { use } from 'react';
import {useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {motion} from "framer-motion";
import { SearchIcon } from 'lucide-react';

export default function Navbar () {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = React.useState('');

  const links = [
    { name: 'Home', href: '/'},
    { name: 'Anime List', href: '/anime'},
    { name: 'Profile', href: '/profile'},
    { name: 'Credits', href: '/credits'},
  ];

    let[activeTab, setActiveTab] = useState(links[0].name);
    return (
    // <nav>
    //   <ul className='flex space-x-4 max-w-5xl mx-auto p-4 back bg-pink-200'>
    //     {links.map((link) =>  (
    //      <li key={link.name}>
    //        <Link
    //           href={link.href}
    //           className={`text-black hover:text-fuchsia-300 font-bold ${
    //             pathname === link.href ? 'border-b-2 border-b-pink-400' : ''
    //           }`}
    //         >
    //           {link.name}
    //         </Link>
    //      </li> 
    //     ))}
    //   </ul>
    // </nav>

     <div className="flex justify-between items-center max-w-5xl mx-auto p-4 back bg-pink-200 rounded-lg">
      <div className='flex space-x-4'>
      {links.map((link) => (
        <button
          key={link.name}
          onClick={() => setActiveTab(link.name)}
          className={`${
            activeTab === link.name ? "text-white" : "hover:text-white/60"
          } relative rounded-full px-3 py-1.5 text-med font-medium text-white outline-pink-200 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === link.name && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-pink-300 mix-blend-overlay"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {link.name}
        </button>
      ))}
      </div>
      
      <div className='relative w-64'>
        <button type='submit' className='absolute right-3 top-1/2 transform -translate-y-1/2'>
          <SearchIcon className=' h-5 w-5 text-pink-300 ' />
        </button>
          
        <input
          type='text'
          placeholder='Search anime...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full pl-4 pr-10 py-2 rounded-full bg-pink-400 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400'
        />
        
      </div>
    </div>
    
    );
  }
