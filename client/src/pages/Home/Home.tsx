import { useState, useEffect } from 'react';
import { Card, CardHeader, Image } from "@nextui-org/react";
import { getGames } from '../../services/apiService';

interface Game {
  gameID: string;
  external: string;
  thumb: string;
}

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGames: Game[] = await getGames(``);
        setGames(fetchedGames);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-[100%] gap-1 grid grid-cols-12 grid-rows-1 px-8 space-x-0 cards">
      {games.map((game: Game, index: number) => (
        <Card key={index} className="col-span-12 sm:col-span-2 h-[300px] w-[200px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">{game.external}</p>
          </CardHeader>
          <Image
            removeWrapper
            alt={`${game.external} background`}
            className="z-0 w-full h-full object-cover rounded-md"
            src={game.thumb}
          />
        </Card>
      ))}
    </div>
  );
};

export default Home;
