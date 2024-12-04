import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-black text-white p-4 border-2 border-white rounded-3xl shadow-lg">
      <ul className="flex flex-row space-x-6">
        <li className="transition-all duration-300 ease-in-out transform hover:scale-110">
          <Link 
            to="/" 
            className="hover:text-yellow-500 text-lg font-semibold px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Form
          </Link>
        </li>
        <li className="transition-all duration-300 ease-in-out transform hover:scale-110">
          <Link 
            to="/table" 
            className="hover:text-yellow-500 text-lg font-semibold px-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Table
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
