import useDebounce from '@helpers/hooks';
import { getBooks } from '@redux/books/action-creators';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BooksItem } from 'types/types';

const BookListCard = dynamic(() => import('@components/BookListCard/BookListCard'));
const SearchBar = dynamic(() => import('@components/SearchBar/SearchBar'));
const LoadMoreOnScroll = dynamic(() => import('@components/LoadMoreOnScroll/LoadMoreOnScroll'));

const BookList: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [books, setBooks] = useState<Array<BooksItem>>(null);
  const [nextPage, setNextPage] = useState<number>(15);

  const debouncedVal = useDebounce<string>(query, 1000);
  const dispatch = useDispatch();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('query', e.target.value);
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('query')) {
      setQuery(localStorage.getItem('query'));
    }
  }, []);

  useEffect(() => {
    if (debouncedVal !== '') {
      setLoading(true);
      dispatch(getBooks(debouncedVal))
        .then((res: any) => {
          if (res?.payload?.status === 200) {
            setBooks(res?.payload?.data?.items);
            setLoading(false);
            setError('');
          } else if (res?.error) {
            setError(res?.error?.response?.data?.error?.message);
          }
        })
        .catch((error: any) => {
          console.log('error', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedVal]);

  return (
    <>
      <SearchBar query={query} onSearch={onSearch} error={error} />
      <div className='book-list'>
        {books && books?.length > 0 && !loading
          ? books?.map((bookData: BooksItem, index: number) => {
              return <BookListCard key={index} {...bookData?.volumeInfo} {...bookData?.searchInfo} id={bookData?.id} />;
            })
          : loading
            ? [...new Array(10)].map((item, index) => {
                return <BookListCard key={index} loading={loading} />;
              })
            : null}
      </div>
      {books && books?.length > 0 && (
        <LoadMoreOnScroll
          query={query}
          page={nextPage}
          setNextPage={setNextPage}
          setBooks={setBooks}
          setError={setError}
        />
      )}
    </>
  );
};

export default BookList;
