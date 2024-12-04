import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Form = ({ submittedData, setSubmittedData }) => {
  const [formData, setFormData] = useState({
    id: "", // Keeping this ID Preserved through out the form [Primary Key]
    firstName: "",
    lastName: "",
    age: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [formFields, setFormFields] = useState([]);
  const [formType, setFormType] = useState(""); // To track which form the user has selected
  const [progress, setProgress] = useState(0); // To track the "Progress"
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from URL params for editing

  // Assignment MOCKED Data
  const apiData = {
    userInfo: {
      fields: [
        { name: "firstName", type: "text", label: "First Name", required: true },
        { name: "lastName", type: "text", label: "Last Name", required: true },
        { name: "age", type: "number", label: "Age", required: false },
      ],
    },
    addressInfo: {
      fields: [
        { name: "street", type: "text", label: "Street", required: true },
        { name: "city", type: "text", label: "City", required: true },
        {
          name: "state",
          type: "dropdown",
          label: "State",
          options: ["Uttrakhand", "Haryana", "Delhi", "Punjab", "Uttar Pradesh"],
          required: true,
        },
        { name: "zipCode", type: "text", label: "Pincode", required: false },
      ],
    },
    paymentInfo: {
      fields: [
        { name: "cardNumber", type: "text", label: "Card Number", required: true },
        { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
        { name: "cvv", type: "password", label: "CVV", required: true },
        { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
      ],
    },
  };

  // I have three forms [User-Info, Address, Payment] and fetching "form-fields" based on form type the user has selected. 
  const fetchFormFields = (formType) => {
    setFormFields(apiData[formType]?.fields || []);
    setFormType(formType);
  };

  // Let's handle field input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    updateProgress(); // Update progress bar
  };

  // Set initial data if editing an existing entry
  useEffect(() => {
    if (id) {
      const existingData = submittedData.find((data) => data.id === parseInt(id));
      if (existingData) {
        setFormData(existingData);
      }
    }
  }, [id, submittedData]);

  // Set ID for a new entry (first-time form creation)
  useEffect(() => {
    if (!formData.id && !id) {
      setFormData((prevData) => ({ ...prevData, id: Date.now() }));
    }
  }, [formData.id, id]);

  // Update the progress bar based on filled fields
  const updateProgress = () => {
    const filledFields = formFields.filter((field) => formData[field.name] && formData[field.name] !== "");
    const progressPercentage = (filledFields.length / formFields.length) * 100;
    setProgress(progressPercentage);
  };


  const handleSubmit = (e) => {
    e.preventDefault(); //Controlling the form

    // All required fields must be filled
    for (const field of formFields) {
      if (field.required && !formData[field.name]) {
        alert(`Please fill the required field: ${field.label}`);
        return; // Just return
      }
    }

    // If everything is filled then submit the data
    setSubmittedData((prevData) => {
      const updatedData = prevData.filter((data) => data.id !== formData.id);
      updatedData.push(formData);
      return updatedData;
    });

    alert(id ? "Data is updated!" : "Form is Submitted!");
    navigate("/table");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="w-full bg-gray-200 h-2 rounded mb-4">
        <div className="bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="form-type" className="block text-sm font-medium text-gray-700">
            Select Form Type:
          </label>
          <select
            id="form-type"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => fetchFormFields(e.target.value)}
            value={formType}
          >
            <option value="">[--Select--]</option>
            <option value="userInfo">User Information</option> {/* From 01 */}
            <option value="addressInfo">Address Information</option> {/* From 02 */}
            <option value="paymentInfo">Payment Information</option> {/* From 03 */}
          </select>
        </div>

        {/* Dynamically Render From : Based on "Selected form type" */}
        {formFields.map((field) => (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}:
            </label>
            {field.type !== "dropdown" ? (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required={field.required}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select State</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {/* Submit button in Payment form and not in other form [So to keep data insertion easy] */}
        {formType === "paymentInfo" && (
          <button
            type="submit"
            className="bg-green-600 text-white font-bold px-6 py-2 rounded-xl mt-4"
          >
            {id ? "Save Changes" : "Submit"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
