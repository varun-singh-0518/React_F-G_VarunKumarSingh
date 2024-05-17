import {useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";

export default function Home() {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceQuality: "",
    cleanliness: "",
    beverageQuality: "",
    overallExperience: "",
  });

  const [selected, setSelected] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Form validation
      if (
        !formData.customerName ||
        !formData.email ||
        !formData.phone ||
        !formData.serviceQuality ||
        !formData.cleanliness ||
        !formData.beverageQuality ||
        !formData.overallExperience
      ) {
        toast.error("Please fill out all fields and rate all categories.");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      // Validate phone format
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        toast.error("Please enter a valid 10-digit phone number.");
        return;
      }
      // Retrieve existing form data from local storage
      const storedFormData = localStorage.getItem("feedbackData");
      let formDataArray = [];
      if (storedFormData) {
        formDataArray = JSON.parse(storedFormData);
      }

      // Add new form data to the array
      formDataArray.push(formData);

      // Store updated form data array in local storage
      localStorage.setItem("feedbackData", JSON.stringify(formDataArray));

      setTimeout(() => {
        navigate("/thanks");
      }, 600);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-[90%] mx-auto bg-gray-100 p-6 rounded-lg shadow">
      <h1 className="text-2xl bg-white p-4 rounded-lg font-bold mb-6">
        Aromatic Bar
      </h1>
      <form className="bg-white rounded-lg p-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
              <span className="text-red-400 text-lg">*</span>
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              placeholder="E.g. Jon Snow"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email<span className="text-red-400 text-lg">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E.g. abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone<span className="text-red-400 text-lg">*</span>
            </label>
            <ReactFlagsSelect
              selected={selected}
              onSelect={(code) => setSelected(code)}
              fullWidth={false}
              placeholder="select"
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="9999999999"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-[60%] ml-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div>
          <div className="grid gap-10 grid-cols-2">
            <fieldset className="mt-6">
              <legend className="text-base font-medium text-gray-700">
                Please rate the quality of the service you received from your
                host.
                <span className="text-red-400 text-lg">*</span>
              </legend>
              <div className="mt-4 space-y-4">
                {["Excellent", "Good", "Fair", "Bad"].map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`service${index + 1}`}
                      name="serviceQuality"
                      type="radio"
                      value={option}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`service${index + 1}`}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-base font-medium text-gray-700">
                Was our restaurant clean?
                <span className="text-red-400 text-lg">*</span>
              </legend>
              <div className="mt-4 space-y-4">
                {["Excellent", "Good", "Fair", "Bad"].map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`clean${index + 1}`}
                      name="cleanliness"
                      type="radio"
                      value={option}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`clean${index + 1}`}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="grid gap-10 grid-cols-2">
            <fieldset className="mt-6">
              <legend className="text-base font-medium text-gray-700">
                Please rate the quality of your beverage.
                <span className="text-red-400 text-lg">*</span>
              </legend>
              <div className="mt-4 space-y-4">
                {["Excellent", "Good", "Fair", "Bad"].map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`beverage${index + 1}`}
                      name="beverageQuality"
                      type="radio"
                      value={option}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`beverage${index + 1}`}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-base font-medium text-gray-700">
                Please rate your overall dining experience.
                <span className="text-red-400 text-lg">*</span>
              </legend>
              <div className="mt-4 space-y-4">
                {["Excellent", "Good", "Fair", "Bad"].map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      id={`experience${index + 1}`}
                      name="overallExperience"
                      type="radio"
                      value={option}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`experience${index + 1}`}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className="mt-6 w-26 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-emerald-800 focus:outline-none"
      >
        Submit Review
      </button>
    </div>
  );
}
