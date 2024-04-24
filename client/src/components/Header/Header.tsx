import React from "react";
import { HeroStyleProps } from "../../types/types";
import background from "../../assets/background.jpg"; // Asegúrate de que la ruta sea correcta
import ScrollingCanvas from "../Scroll/ScrollingCanvas";

const Header: React.FC<HeroStyleProps> = ({ title, scrollingText }) => {
  return (
    <section
      className="bg-no-repeat bg-contain text-center w-svw"
      style={{
        backgroundImage: `url(${background})`,
        height: "100svh",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="container ml-80 flex flex-col items-start justify-center h-full">
        <div className="relative text-center">
          <h1 className="text-white text-26xl uppercase">{title}</h1>
          <div className="mt-6 w-full overflow-hidden relative">
            <ScrollingCanvas text={scrollingText} />{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
