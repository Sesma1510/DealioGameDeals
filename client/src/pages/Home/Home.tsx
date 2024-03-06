import React, { useState, useEffect } from 'react';
import { getDeals, getStores } from '../../services/apiService';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue } from "@nextui-org/react";

interface Game {
  gameID: string;
  title: string;
  thumb: string;
  salePrice: string;
  normalPrice: string;
  storeID: number;
}

interface Store {
  storeID: number;
  storeName: string;
  image: string;
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [storeGames, setStoreGames] = useState<{ [key: number]: Game[] }>({});
  const [page, setPage] = React.useState<{ [key: number]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStores: Store[] = await getStores();
        setStores(fetchedStores);

        // Obtener juegos para cada tienda
        const gamesByStore: { [key: number]: Game[] } = {};
        const initialPage: { [key: number]: number } = {};

        for (const store of fetchedStores) {
          const games = await getDeals(store.storeID);
          gamesByStore[store.storeID] = games;
          initialPage[store.storeID] = 1;
        }

        setStoreGames(gamesByStore);
        setPage(initialPage);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (storeID: number, newPage: number) => {
    setPage((prevPages) => ({ ...prevPages, [storeID]: newPage }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
{stores.map((store) => (
  <div key={store.storeID} className='tables'>
    <h2>{store.storeName}</h2>
    {storeGames[store.storeID]?.length > 0 ? (
      <Table
        aria-label={`Table for ${store.storeName}`}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page[store.storeID]}
              total={Math.ceil(storeGames[store.storeID]?.length / 4)}
              onChange={(newPage) => handlePageChange(store.storeID, newPage)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          {/* <TableColumn key="gameID">Game ID</TableColumn> */}
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="salePrice">Sale Price(US$)</TableColumn>
          <TableColumn key="normalPrice">Normal Price(US$)</TableColumn>
          {/* Add other columns based on your Game interface */}
        </TableHeader>
        <TableBody items={storeGames[store.storeID]?.slice((page[store.storeID] - 1) * 4, page[store.storeID] * 4)}>
          {(item) => (
            <TableRow key={item.gameID}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    ) : (
      <></>
    )}
  </div>      
  ))}
    </>
  );
};

export default Home;
