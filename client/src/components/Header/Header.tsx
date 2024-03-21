import { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  return (
    <section className="self-stretch bg-link-primary overflow-hidden flex flex-col items-center justify-start py-[321.5px] px-5 box-border gap-[40px] max-w-full text-center text-37xl text-gainsboro-200 font-text-tiny-link mq450:gap-[20px_40px] mq750:pt-[136px] mq750:pb-[136px] mq750:box-border mq1050:pt-[209px] mq1050:pb-[209px] mq1050:box-border">
      <div className="w-[768px] flex flex-col items-start justify-start gap-[24px] max-w-full">
        <h1 className="m-0 self-stretch relative text-inherit leading-[120%] font-bold font-inherit mq450:text-15xl mq450:leading-[40px] mq750:text-26xl mq750:leading-[54px]">
          Find the Best Deals on Video Games with Dealio
        </h1>
        <div className="self-stretch relative text-lg leading-[150%] text-color-neutral-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </div>
      </div>
    </section>
  );
};

export default Header;
