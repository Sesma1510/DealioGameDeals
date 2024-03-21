import { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import { getInitialDeals, searchDeals } from '../../services/apiService';
import { Game } from '../../types/types';
import SearchComponent from '../Search/Search';
import { columns } from './TableColumns';

const GameTable = () => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback((node: Element | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);


  const loadDeals = async (pageNumber: number, searchQuery: string = '') => {
    setLoading(true);
    try {
      if (searchQuery) {
        const searchResults = await searchDeals({ title: searchQuery, pageNumber });
        setData(prevData => [...prevData, ...searchResults]);
        setHasMore(searchResults.length > 0);
      } else {
        const deals = await getInitialDeals(pageNumber);
        setData(prevData => [...prevData, ...deals]);
        setHasMore(deals.length > 0);
      }
    } catch (error) {
      console.error("Failed to fetch deals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals(0, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (page !== 0) {
      loadDeals(page, searchQuery);
    }
  }, [page, searchQuery]);

  const handleSearch = (query: string) => {
    setData([]);
    setPage(0);
    setHasMore(true);
    setSearchQuery(query);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 10vw', backgroundColor: 'black' }}>
      <div style={{ width: '80vw', overflow: 'auto' }}>
        <SearchComponent onSearch={handleSearch} />
        <Table
          columns={columns}
          dataSource={data}
          rowKey="dealID"
          pagination={false}
          loading={loading}
        />
        <div ref={lastElementRef} style={{ height: '20px', margin: '10px 0' }} />
      </div>
    </div>
  );
};

export default GameTable;
