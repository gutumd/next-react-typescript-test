import React from 'react';

interface SearchBarProps {
  query: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch, error }: SearchBarProps) => {
  return (
    <div className='search-bar'>
      <input type='text' placeholder='Search...' value={query} onChange={onSearch} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchBar;
