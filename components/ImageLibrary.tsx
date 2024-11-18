'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { images } from '@/constants/images';
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import ImageDetailModal from '../components/ImageDetailModal'

function UnsplashGrid() {

    return (
        <>
            <div className='container mx-auto p-4'>
                <div className='columns-2 md:columns-3 2xl:columns-4 gap-4'>
                    {images.map((item, index) => (
                        <ImageItem key={item.id} item={item} />
                    ))}
                </div>
            </div>


        </>
    );
}

function ImageItem({ item }: any) {
    console.log("🚀 ~ ImageItem ~ item:", item)
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [selectedImage, setSelectedImage] = useState(null);


    return (
        <motion.figure
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            ref={ref}
            className="inline-block group w-full rounded-md relative dark:bg-black bg-white overflow-hidden cursor-pointer mb-4"
            onClick={() => setSelectedImage(item)}
        >
            <Dialog>
                <DialogTrigger>

                    <motion.img
                        src={item.url}
                        alt={item.title}
                        className='w-full h-auto object-cover'
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </DialogTrigger>
                <ImageDetailModal image={selectedImage} />

            </Dialog>
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <h1 className='text-white text-lg font-semibold'>{item.title}</h1>
            </div>
        </motion.figure>
    );
}

export default UnsplashGrid;
