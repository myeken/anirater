'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo(){
    return(
        <div className='flex items-center gap-2'>
            <motion.div
            animate={{ rotate: -360}}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <Image
                    src='/icons/flower.png'
                    alt='flower image'
                    width={48}
                    height={48}
                    priority
                />
            </motion.div>
        </div>
    )
}