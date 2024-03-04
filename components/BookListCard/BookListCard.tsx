import heartFilledIcon from '@assets/icons/heart-filled.svg';
import heartIcon from '@assets/icons/heart-light.svg';
import placeholderImage from '@assets/img/placeholder.png';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AddToFavoriteProps, SearchInfo, VolumeInfo } from 'types/types';

const Loader = dynamic(() => import('@components/Loader/Loader'));

interface BookListCardOptionalProps extends VolumeInfo, SearchInfo {
  loading?: boolean;
  id?: string;
  setIsFavoriteBooksListChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoriteBooksListChanged?: boolean;
  isFavoritesPage?: boolean;
}

const BookListCard: React.FC<BookListCardOptionalProps> = ({
  title,
  imageLinks,
  subtitle,
  textSnippet,
  loading,
  id,
  setIsFavoriteBooksListChanged,
  isFavoriteBooksListChanged,
  isFavoritesPage = false,
}: BookListCardOptionalProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoritesPage || false);

  const addToFavorite = ({ title, imageLinks, subtitle, textSnippet, bookId }: AddToFavoriteProps): void => {
    if (setIsFavoriteBooksListChanged) {
      setIsFavoriteBooksListChanged(!isFavoriteBooksListChanged);
    }

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
          textSnippet: textSnippet,
          bookId: bookId,
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
        textSnippet: textSnippet,
        bookId: bookId,
      });

      isFav = true;

      localStorage.setItem('favorites', JSON.stringify(favoriteBooks));
    }

    if (!isFavoritesPage) {
      if (isFav) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };

  useEffect(() => {
    if (!isFavoritesPage) {
      setIsFavorite(false);

      if (localStorage.getItem('favorites')) {
        let favoriteBooks = JSON.parse(localStorage.getItem('favorites'));
        favoriteBooks.forEach(({ bookId }: AddToFavoriteProps) => {
          if (id === bookId) {
            setIsFavorite(true);
          }
        });
      }
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className='book-list-card loading'>
          <Loader />
        </div>
      ) : (
        <div className='book-list-card'>
          <button
            aria-label='Add to Favorite'
            type='button'
            onClick={() => {
              addToFavorite({ title, imageLinks, subtitle, textSnippet, bookId: id });
            }}>
            {isFavorite ? (
              <img src={heartFilledIcon.src} alt='Add to Favorite' />
            ) : (
              <img src={heartIcon.src} alt='Add to Favorite' />
            )}
          </button>
          {title && (
            <Link href={`/${id}/${title.toLowerCase().replace(/ /g, '_')}`}>
              <p className='title'>{title}</p>
            </Link>
          )}
          {imageLinks?.smallThumbnail ? (
            <Link href={`/${id}/${title.toLowerCase().replace(/ /g, '_')}`}>
              <Image src={imageLinks?.smallThumbnail} alt={title} width={250} height={200} />
            </Link>
          ) : (
            <Link href={`/${id}/${title.toLowerCase().replace(/ /g, '_')}`}>
              <Image src={placeholderImage} alt='' width={250} height={200} />
            </Link>
          )}
          {subtitle && <p className='subtitle'>{subtitle}</p>}
          {textSnippet && <div dangerouslySetInnerHTML={{ __html: textSnippet }} className='search-info' />}
        </div>
      )}
    </>
  );
};

export default BookListCard;
