import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const footer = () =>{

    return (
        <>
             <footer className="bg-gray-900 text-white p-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <p className="mr-2">Made with</p>
        <FontAwesomeIcon icon={faHeart} className="text-red-500" />
        <p className="ml-2">by Eduardo Sesma and Alexis Arellano</p>
      </div>
      <div className="flex justify-center">
      <a
          href="https://github.com/Sesma1510"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white mx-4"
        >
          GitHub Eduardo
        </a>
        <a
          href="https://github.com/GustavoAlexisAre"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white mx-4"
        >
          GitHub Alexis
        </a>
        <a
          href="https://www.linkedin.com/in/esesma/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white mx-4"
        >
          LinkedIn Eduardo
        </a>
        <a
          href="https://www.linkedin.com/in/alexisare/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white mx-4"
        >
          LinkedIn Alexis
        </a>
        {/* Agrega más enlaces según sea necesario */}
      </div>
    </footer>
        </>
    )
}

export default footer
