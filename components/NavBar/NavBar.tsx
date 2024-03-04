import heartFilledIcon from '@assets/icons/heart-filled.svg';
import heartIcon from '@assets/icons/heart-light.svg';
import Link from 'next/link';
import React from 'react';

interface NavBarProps {
  isFavorite?: boolean;
  addToFavorite?: Function;
  isHomePage?: boolean;
  isFavoritesPage?: boolean;
  isBookPage?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  isFavorite,
  addToFavorite,
  isHomePage = false,
  isFavoritesPage = false,
  isBookPage = false,
}: NavBarProps) => {
  return (
    <div className='navbar'>
      {!isHomePage && <Link href='/'>Search</Link>}
      {!isFavoritesPage && <Link href='/favorites'>Favorites</Link>}
      {isBookPage && (
        <button
          aria-label='Add to Favorite'
          type='button'
          onClick={() => {
            addToFavorite();
          }}>
          {isFavorite ? (
            <img src={heartFilledIcon.src} alt='Add to Favorite' />
          ) : (
            <img src={heartIcon.src} alt='Add to Favorite' />
          )}
        </button>
      )}
    </div>
  );
};

export default NavBar;
