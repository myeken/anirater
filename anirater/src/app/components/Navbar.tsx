'use client';
import React, { use } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar () {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/'},
    { name: 'Anime List', href: '/anime'},
    { name: 'Profile', href: '/profile'},
  ];
  return (
    <nav>
      <ul className='flex space-x-4 max-w-5xl mx-auto p-4 back bg-pink-200'>
        {links.map((link) =>  (
         <li key={link.name}>
           <Link
              href={link.href}
              className={`text-black hover:text-fuchsia-300 font-bold ${
                pathname === link.href ? 'border-b-2 border-b-pink-400' : ''
              }`}
            >
              {link.name}
            </Link>
         </li> 
        ))}
      </ul>
    </nav>
  );
};
