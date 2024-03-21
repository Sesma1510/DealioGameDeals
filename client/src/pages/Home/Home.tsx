import { FunctionComponent } from "react";
import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import { Button, Flex } from "antd";

const Home: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-color-neutral-white overflow-hidden flex flex-col items-start justify-start tracking-[normal]">
      <header className="self-stretch h-[72px] bg-gray box-border flex flex-row items-center justify-between py-[22.5px] px-16 top-[0] z-[99] sticky gap-[20px] border-b-[1px] border-solid border-link-primary mq750:pl-8 mq750:pr-8 mq750:box-border">
        <img
          className="h-[27px] w-[63px] relative overflow-hidden shrink-0 min-h-[27px]"
          loading="lazy"
          alt=""
          src="/company-logo.svg"
        />
        <nav className="m-0  flex flex-col items-baseline justify-center box-border">
          <nav className="m-0 self-stretch flex flex-row items-center justify-start gap-[20px] text-left text-base">
            <Flex gap="large" wrap="wrap">
              <Button type="dashed" size="large">Search</Button>
            </Flex>
            <Flex gap="large" wrap="wrap">
              <Button type="dashed" size="large">About</Button>
            </Flex>
          </nav>
        </nav>
      </header>
      <Header />
      <Table/>
    </div>
  );
};

export default Home;
