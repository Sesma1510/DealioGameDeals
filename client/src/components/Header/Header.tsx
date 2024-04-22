import React from "react";
import { HeroStyleProps } from "../../types/types";
import background from "../../assets/background.jpg"; // Ensure correct path

const Header: React.FC<HeroStyleProps> = ({ title, scrollingText }) => {
  return (
    <section
      className="bg-cover bg-center text-center w-svw "
      style={{ backgroundImage: `url(${background})`, height: "80vh" }}
    >
      <div className="container ml-80 flex flex-col items-start justify-center h-full ">
        <div className="relative text-center">
          <h1 className="text-white text-26xl uppercase">{title}</h1>
          <div className="mt-6 w-full overflow-hidden relative">
            <div className="flex whitespace-nowrap animate-scroll-left-loop justify-center">
              {" "}
              <div className="text-white text-10xl">{scrollingText}</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
