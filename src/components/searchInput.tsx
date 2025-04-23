import React from 'react';

interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 relative z-10">
      <input
        type="text"
        onChange={e => onSearch(e.target.value)}
        placeholder="Search sections..."
        className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
      />
    </div>
  );
};

export default SearchInput;
