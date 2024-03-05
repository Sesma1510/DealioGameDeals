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
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white mx-4"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white mx-4"
        >
          LinkedIn
        </a>
        {/* Agrega más enlaces según sea necesario */}
      </div>
    </footer>
        </>
    )
}

export default footer
