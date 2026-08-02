import { useState } from 'react';

export default function useFilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return {
    isOpen,
    toggleOpen,
    searchText,
    setSearchText,
    selected,
    setSelected,
    toggleSelection,
  };
}