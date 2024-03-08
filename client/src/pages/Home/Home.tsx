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

  const filteredStores = stores.filter(store => storeGames[store.storeID]?.length > 0);

  return (
    <div className="grid grid-cols-3 gap-8 mb-10 mt-10">
      {filteredStores.map((store) => (
        <div key={store.storeID} className='tables p-4 bg-white rounded-lg shadow-md'>
          <h2 className='text-xl font-bold mb-4'>{store.storeName}</h2>
          {storeGames[store.storeID]?.length > 0 ? (
            <Table
              aria-label={`Table for ${store.storeName}`}
              classNames={{
                wrapper: "mt-4",
              }}
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
                  <TableRow key={item.gameID} className='hover:bg-gray-100 transition duration-300'>
                    {(columnKey) => <TableCell className='p-2'>{getKeyValue(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <p className='text-gray-500'>No hay juegos disponibles.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;