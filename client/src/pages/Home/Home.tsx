import { useEffect, useState, FunctionComponent } from "react";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import { Button } from "antd";
import logo from "../../assets/logo.png";

const Home: FunctionComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollThreshold = 5;
      setIsScrolled(scrollTop > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <header
        className={`fixed w-full top-0 pt-2 pb-2 left-0 flex items-center justify-between shadow transition-colors duration-150 ${
          isScrolled ? "bg-blue-background" : "bg-transparent"
        }`}
        style={{ zIndex: 999 }}
      >
        <img
          className="ml-16 relative w-auto h-24 rounded-full"
          loading="lazy"
          src={logo}
          alt="Logo"
        />
        <nav className="flex gap-4 mr-16 flex-wrap">
          <Button type="dashed" size="large">
            Search
          </Button>
          <Button type="dashed" size="large">
            About
          </Button>
        </nav>
      </header>
      <Header
        title={
          <>
            Dealio Game
            <br />
            Deals
          </>
        }
        scrollingText="Find the best game deals here!"
      />
      <div className="bg-blue-background px-4 py-6">
        <div className="overflow-x-auto">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
