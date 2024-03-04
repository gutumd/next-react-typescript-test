import dynamic from 'next/dynamic';
import React from 'react';

const BooksFeedBanner = dynamic(() => import('@components/BooksFeedBanner/BooksFeedBanner'));
const BookList = dynamic(() => import('@components/BookList/BookList'));
const NavBar = dynamic(() => import('@components/NavBar/NavBar'));

const BooksFeed: React.FC = () => {
  return (
    <section className='books-feed'>
      <BooksFeedBanner />
      <NavBar isHomePage={true} />
      <BookList />
    </section>
  );
};

export default BooksFeed;
