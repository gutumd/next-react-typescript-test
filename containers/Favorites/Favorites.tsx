import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { AddToFavoriteProps } from 'types/types';

const BooksFeedBanner = dynamic(() => import('@components/BooksFeedBanner/BooksFeedBanner'));
const BookListCard = dynamic(() => import('@components/BookListCard/BookListCard'));
const NavBar = dynamic(() => import('@components/NavBar/NavBar'));

const Favorites: React.FC = () => {
  const [books, setBooks] = useState<any>(null);
  const [isFavoriteBooksListChanged, setIsFavoriteBooksListChanged] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('favorites')) {
      setBooks(JSON.parse(localStorage.getItem('favorites')));
    }
  }, [isFavoriteBooksListChanged]);

  return (
    <section className='favorites'>
      <BooksFeedBanner title='Your favorite books:' />
      <NavBar isFavoritesPage={true} />
      <div className='book-list'>
        {books && books?.length > 0 ? (
          books?.map((book: AddToFavoriteProps, index: number) => {
            const { title, bookId, imageLinks, subtitle, textSnippet } = book;
            return (
              <BookListCard
                key={index}
                title={title}
                id={bookId}
                imageLinks={imageLinks}
                subtitle={subtitle}
                textSnippet={textSnippet?.slice(0, 180)}
                isFavoriteBooksListChanged={isFavoriteBooksListChanged}
                setIsFavoriteBooksListChanged={setIsFavoriteBooksListChanged}
                isFavoritesPage={true}
              />
            );
          })
        ) : (
          <p className='empty-message'>You didn't add any books yet.</p>
        )}
      </div>
    </section>
  );
};

export default Favorites;
