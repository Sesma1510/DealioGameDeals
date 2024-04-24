import React from "react";
import { HeroStyleProps } from "../../types/types";
import ScrollingCanvas from "../Scroll/ScrollingCanvas";
import background from "../../assets/background.png";

const Header: React.FC<HeroStyleProps> = ({ title, scrollingText }) => {
  return (
    <section className="flex w-svw bg-blue-background">
      <div className="w-2/5 bg-blue-background flex items-center justify-center px-8">
        <div className="text-center">
          <div className="text-black text-26xl uppercase">{title}</div>
          <div className="mt-6 w-full overflow-hidden relative">
            <ScrollingCanvas text={scrollingText} />
          </div>
        </div>
      </div>
      <div
        className="w-3/5 flex items-center justify-center px-8 pt-8 pb-16"
        style={{
          height: "100svh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="rounded-full shadow-2xl overflow-hidden">
          <img
            src={background}
            alt="Background"
            className="w-full h-auto rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
