import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Form/Header";
import Footer from "./Form/Footer";
import Form from "./Form/Form";
import Table from "./Pages/Table";
import Error from "./Form/Error";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [submittedData, setSubmittedData] = useState([]);

  // Loading data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("submittedData")) || [];
    setSubmittedData(storedData);
  }, []);

  // Saving data to localStorage
  useEffect(() => {
    localStorage.setItem("submittedData", JSON.stringify(submittedData));
  }, [submittedData]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Form submittedData={submittedData} setSubmittedData={setSubmittedData} />,
        },
        {
          path: "/table",
          element: <Table submittedData={submittedData} setSubmittedData={setSubmittedData} />,
        },
        {
          path: "/edit/:id", //When edit button is clicked take to the form
          element: <Form submittedData={submittedData} setSubmittedData={setSubmittedData} />,
        },
      ],
    },
    {
      path: "*", // Error Handling
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
