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
  const [stores, setStores] = useState<Store[]>([]);
  const [storeGames, setStoreGames] = useState<{ [key: number]: Game[] }>({});
  const [page, setPage] = useState<{ [key: number]: number }>({});
  const [loadingStores, setLoadingStores] = useState<{ [key: number]: boolean }>({});
  const [storeErrors, setStoreErrors] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedStores: Store[] = await getStores();
        setStores(fetchedStores);

        const gamesByStore: { [key: number]: Game[] } = {};
        const initialPage: { [key: number]: number } = {};
        const initialLoadingStores: { [key: number]: boolean } = {};

        for (const store of fetchedStores) {
          initialLoadingStores[store.storeID] = true;
          setLoadingStores(initialLoadingStores);

          try {
            const games = await getDeals(store.storeID);
            gamesByStore[store.storeID] = games;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setStoreErrors((prevErrors) => ({ ...prevErrors, [store.storeID]: errorMessage }));
          } finally {
            initialLoadingStores[store.storeID] = false;
            setLoadingStores(initialLoadingStores);
          }

          initialPage[store.storeID] = 1;
        }

        setStoreGames(gamesByStore);
        setPage(initialPage);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (storeID: number, newPage: number) => {
    setPage((prevPages) => ({ ...prevPages, [storeID]: newPage }));
  };

  const filteredStores = stores.filter(store => storeGames[store.storeID]?.length > 0);

  return (
    <div className="grid grid-cols-3 gap-8 mb-10 mt-10">
      {filteredStores.map((store) => {
        const isLoading = loadingStores[store.storeID];
        const errorMessage = storeErrors[store.storeID];
        const hasGames = storeGames[store.storeID]?.length > 0;

        let content;
        if (isLoading) {
          content = <div>Loading...</div>;
        } else if (errorMessage) {
          content = <div>Error: {errorMessage}</div>;
        } else if (hasGames) {
          content = (
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
          );
        } else {
          content = <p className='text-gray-500'>No hay juegos disponibles.</p>;
        }

        return (
          <div key={store.storeID} className='tables p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-bold mb-4'>{store.storeName}</h2>
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
