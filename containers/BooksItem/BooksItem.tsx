import imagePlaceholder from '@assets/img/placeholder.png';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AddToFavoriteProps, ImageLinks } from 'types/types';

const Loader = dynamic(() => import('@components/Loader/Loader'));
const BooksFeedBanner = dynamic(() => import('@components/BooksFeedBanner/BooksFeedBanner'));
const NavBar = dynamic(() => import('@components/NavBar/NavBar'));

const BooksItem: React.FC = ({ book, volume_id }: any) => {
  const { id } = book;
  const { title, subtitle, imageLinks, description } = book?.volumeInfo;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const addToFavorite = (): void => {
    let isFav: boolean;

    if (localStorage.getItem('favorites')) {
      let favoriteBooks: Array<AddToFavoriteProps> = JSON.parse(localStorage.getItem('favorites'));

      if (isFavorite) {
        favoriteBooks = favoriteBooks.filter(({ bookId }: AddToFavoriteProps) => bookId !== id);
        isFav = false;
      } else {
        favoriteBooks.push({
          title: title,
          imageLinks: imageLinks,
          subtitle: subtitle,
          textSnippet: description,
          bookId: id,
        });

        isFav = true;
      }

      localStorage.setItem('favorites', JSON.stringify(favoriteBooks));
    } else {
      let favoriteBooks = [];

      favoriteBooks.push({
        title: title,
        imageLinks: imageLinks,
        subtitle: subtitle,
        textSnippet: description,
        bookId: id,
      });

      isFav = true;

      localStorage.setItem('favorites', JSON.stringify(favoriteBooks));
    }

    if (isFav) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const getImage = () => {
    if (imageLinks?.medium) {
      return imageLinks?.medium;
    } else if (imageLinks?.large) {
      return imageLinks?.large;
    } else if (imageLinks?.extraLarge) {
      return imageLinks?.extraLarge;
    } else if (imageLinks?.small) {
      return imageLinks?.small;
    } else if (imageLinks?.smallThumbnail) {
      return imageLinks?.smallThumbnail;
    } else if (imageLinks?.thumbnail) {
      return imageLinks?.thumbnail;
    } else {
      return imagePlaceholder.src;
    }
  };

  useEffect(() => {
    setIsFavorite(false);

    if (localStorage.getItem('favorites')) {
      let favoriteBooks = JSON.parse(localStorage.getItem('favorites'));
      favoriteBooks.forEach(({ bookId }: AddToFavoriteProps) => {
        if (id === bookId) {
          setIsFavorite(true);
        }
      });
    }
  }, []);

  return (
    <section className='books-item'>
      <BooksFeedBanner title={title} />
      <NavBar isFavorite={isFavorite} addToFavorite={addToFavorite} isBookPage={true} />
      {book ? (
        <div className='books-item__inner'>
          <Image src={getImage()} alt={title} width={400} height={400} />

          <div className='books-item__text'>
            {title && <p className='title'>{title}</p>}
            {subtitle && <p className='subtitle'>{subtitle}</p>}
            {description && <div dangerouslySetInnerHTML={{ __html: description }} className='search-info' />}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default BooksItem;
