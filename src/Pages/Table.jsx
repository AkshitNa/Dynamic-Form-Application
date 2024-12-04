import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ submittedData, setSubmittedData }) => {
  const navigate = useNavigate();

  // Delete function
  const handleDelete = (id) => {
    const updatedData = submittedData.filter((data) => data.id !== id);
    setSubmittedData(updatedData);
  };

  // Edit function
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to the edit route with the selected ID is SELECTED
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dynamic Form Data</h2>
      {submittedData.length === 0 ? (
        <p className="text-gray-700 font-bold">Sorry, No Data Available 😢 </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border border-gray-300 px-6 py-3">ID</th>
                <th className="border border-gray-300 px-6 py-3">First Name</th>
                <th className="border border-gray-300 px-6 py-3">Last Name</th>
                <th className="border border-gray-300 px-6 py-3">Age</th>
                <th className="border border-gray-300 px-6 py-3">City</th>
                <th className="border border-gray-300 px-6 py-3">State</th>
                <th className="border border-gray-300 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr
                  key={data.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-6 py-3 text-center">
                    {data.id}
                  </td>
                  <td className="border border-gray-300 px-6 py-3">{data.firstName}</td>
                  <td className="border border-gray-300 px-6 py-3">{data.lastName}</td>
                  <td className="border border-gray-300 px-6 py-3 text-center">
                    {data.age}
                  </td>
                  <td className="border border-gray-300 px-6 py-3">{data.city}</td>
                  <td className="border border-gray-300 px-6 py-3">{data.state}</td>
                  <td className="border border-gray-300 px-6 py-3 text-center">
                    <button
                      onClick={() => handleEdit(data.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
