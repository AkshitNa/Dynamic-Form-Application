import google from "../assets/googleForm.png";
import Navigation from "./Navigation";

const Header = () => (
  <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 shadow-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={google} alt="Form" className="w-10 h-10" />
        <span className="text-3xl font-bold tracking-wide">Dynamic Form Application</span>
      </div>

      <div>
        <Navigation />
      </div>
    </div>
  </header>
);

export default Header;
