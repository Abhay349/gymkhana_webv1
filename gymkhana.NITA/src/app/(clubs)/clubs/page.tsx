'use client';

import React, { useState } from 'react';
import { data } from 'src/assets/data.js';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

interface Club {
  club: string;
  category: string;
  url: string;
  image: string | StaticImageData;
}

const Clubs: React.FC = () => {
  const [category, setCategory] = useState<string>('Communities');

  // Filtering logic
  const filteredData: Club[] = data.filter(
    (item: Club) => item.category === category
  );

  return (
    <div className='mx-auto max-w-6xl p-4'>
      {/* Filter Buttons */}
      <div className='mb-6 flex space-x-4 overflow-x-auto whitespace-nowrap pb-2'>
        {['Communities', 'Technical', 'Cultural', 'Sports', 'Others'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-semibold ${
              category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {filteredData.map((item: Club, index: number) => (
          <a
            key={index}
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            className='flex aspect-[4/3] flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-6 shadow-sm'
          >
            <div className='flex h-32 w-40 items-center justify-center'>
              <Image
                src={item.image}
                alt={item.club}
                width={120}
                height={120}
                className=''
              />
            </div>
            <div className='mt-4 text-center'>
              <h3 className='text-navy-900 text-sm font-semibold uppercase tracking-wider'>
                {item.club}
              </h3>
              <p className='text-navy-700 text-xs uppercase tracking-wide'>
                NIT AGARTALA
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Clubs;