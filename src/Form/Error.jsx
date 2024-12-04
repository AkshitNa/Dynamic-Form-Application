import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Page Not Found Error</h1>
      <p className="text-lg text-gray-700 mb-6">The Page Does not exist.</p>
      <button
        onClick={handleGoHome}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error;