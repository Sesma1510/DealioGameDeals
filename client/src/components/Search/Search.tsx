
import { useState } from 'react';
import { Input } from 'antd';
import { searchDeals } from '../../services/apiService';

const { Search } = Input;

interface SearchComponentProps {
  onSearch: (value: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (value: string) => {
    setLoading(true);
    try {
      await searchDeals({ title: value });
      onSearch(value);
    } catch (error) {
      console.error('Error searching for deals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mb-20'>
      <Search
        placeholder="Search for deals..."
        enterButton="Search"
        loading={loading}
        onSearch={handleSearch}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
};

export default SearchComponent;
