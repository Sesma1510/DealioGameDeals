import { useEffect, useState, FunctionComponent } from "react";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import { Button, Flex } from "antd";
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
        className={`fixed w-full top-0 left-0 p-6 flex items-center justify-between shadow transition-colors duration-150 ${isScrolled ? "bg-blue-background" : "bg-transparent"}`}
        style={{ zIndex: 999 }}
      >
        <img
          className="ml-20 relative overflow-hidden w-auto h-16 rounded-full"
          loading="lazy"
          src={logo}
          alt="Hola Soy el Logo"
        />
        <nav className="flex flex-end gap-4 mr-16">
          <Flex gap="large" wrap="wrap">
            <Button type="dashed" size="large">
              Search
            </Button>
          </Flex>
          <Flex gap="large" wrap="wrap">
            <Button type="dashed" size="large">
              About
            </Button>
          </Flex>
        </nav>
      </header>
      <Header
        title="Dealio Game Deals"
        scrollingText="Find the best game deals here!"
      />
      <div className="bg-blue-background">
        <Table />
      </div>
    </div>
  );
};

export default Home;
