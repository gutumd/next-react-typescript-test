import bannerImage from '@assets/img/books.jpeg';
import Image from 'next/image';
import React from 'react';

interface BooksFeedBannerProps {
  title?: string;
}

const BooksFeedBanner: React.FC<BooksFeedBannerProps> = ({ title }: BooksFeedBannerProps) => {
  return (
    <div className='books-feed-banner'>
      {title ? <h1>{title}</h1> : <h1>Search for a book:</h1>}
      <Image src={bannerImage} alt='Book shelf' priority />
    </div>
  );
};

export default BooksFeedBanner;
