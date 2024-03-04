'use client';

import { getBooks } from '@redux/books/action-creators';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import { BooksItem } from 'types/types';

const Loader = dynamic(() => import('@components/Loader/Loader'));

interface LoadMoreOnScrollProps {
  page: number;
  query: string;
  setBooks: React.Dispatch<React.SetStateAction<Array<BooksItem>>>;
  setNextPage: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const LoadMoreOnScroll: React.FC<LoadMoreOnScrollProps> = ({
  setBooks,
  page,
  query,
  setNextPage,
  setError,
}: LoadMoreOnScrollProps) => {
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  const delay = (ms: number): Promise<any> => new Promise(resolve => setTimeout(resolve, ms));

  const loadMoreBooks = async () => {
    await delay(1000);

    dispatch(getBooks(query, page))
      .then((res: any) => {
        if (res?.payload?.status === 200) {
          setBooks((prevEvents: any): any => [...prevEvents, ...res?.payload?.data?.items]);
          setNextPage(page + 15);
          setError('');
        } else if (res?.error) {
          setError(res?.error?.response?.data?.error?.message);
        }
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (inView) {
      loadMoreBooks();
    }
  }, [inView]);

  return (
    <div className='load-more-events-ref' ref={ref}>
      <Loader />
    </div>
  );
};

export default LoadMoreOnScroll;
