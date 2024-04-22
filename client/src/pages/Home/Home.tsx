import { FunctionComponent } from "react";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import { Button, Flex } from "antd";

const Home: FunctionComponent = () => {
  return (
    <div className="w-full">
      <header className="fixed w-full top-0 left-0 p-6 flex items-center justify-between shadow">
        <img
          className="h-[27px] w-[63px] relative overflow-hidden shrink-0 min-h-[27px]"
          loading="lazy"
          alt=""
          src="/company-logo.svg"
        />
        <nav className="flex flex-end gap-4 mr-10">
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
      <Table />
    </div>
  );
};

export default Home;
