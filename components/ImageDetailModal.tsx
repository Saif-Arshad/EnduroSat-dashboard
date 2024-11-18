'use client';

import React from 'react';
import {
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"

function ImageDetailModal({ image }: any) {
    console.log("🚀 ~ ImageDetailModal ~ image:", image)
    return (
        <DialogContent className="max-w-3xl mx-auto p-6 max-h-[90vh] overflow-y-auto">
            <div className='flex items-center gap-x-3 '>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-4xl mb-7'>{image && image.title}</h1>
                    <div className='text-lg space-y-2'>
                        <p>
                            <strong>Date & Time Taken:</strong>
                            <br />
                            {image && image.dateTaken}
                        </p>
                        <p>
                            <strong>Location:</strong>

                            <br />

                            {image && image.location}
                        </p>
                        <p>
                            <strong>Description:</strong>
                            <br />
                            {image && image.description}
                        </p>
                    </div>

                </div>
                <img
                    src={image && image.url}
                    alt={image && image.title}
                    className='w-6/12 mb-4 rounded-lg shadow-lg object-cover '
                />
            </div>
        </DialogContent>
    );
}

export default ImageDetailModal;
