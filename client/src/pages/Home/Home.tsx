import { Card, CardHeader, Image } from "@nextui-org/react";
import '../Home/Home.css';
import { getGames } from '../../services/apiService';
import { useState, useEffect } from "react";

export const getGamesAction = async (gameName:string) => {
  try {
    const { data: games } = await getGames(gameName);
    return { games };
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};

function Home(page:any) {
  const [games, setGames] = useState([]);
  const [gameName , setGameName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const { games } = await getGamesAction(gameName);
      setGames(games);
      setLoading(false);
      page.push(`/games/${gameName}`);
    } catch  {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setGameName(`assassin's creed`)
    fetchData();
  }, []); 

  return (
    <>
      <div className="carousel">
        <img src="https://static.vecteezy.com/system/resources/previews/002/144/780/non_2x/gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg" alt="Banner Gamer" className="bannerImg" />
      </div>
      <div className="max-w-[100%] gap-1 grid grid-cols-12 grid-rows-1 px-8 space-x-0 cards">
        {games.map((game, index) => (
          <Card key={index} className="col-span-12 sm:col-span-2 h-[300px] w-[200px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">{game}</p>
              <h4 className="text-white font-medium text-large">{game}</h4> 
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover rounded-md"
              src={game}
            />
          </Card>
        ))}
      </div>
    </>
  );
}

export default Home;
