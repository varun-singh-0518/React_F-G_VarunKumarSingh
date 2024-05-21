import {useState, useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import {IoMdRefresh} from "react-icons/io";
import {useNavigate} from "react-router-dom";

export default function Submissions() {
  const [formDataList, setFormDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve data from local storage
    const storedFormData = localStorage.getItem("feedbackData");
    if (storedFormData) {
      setFormDataList(JSON.parse(storedFormData));
    }
  }, []);

  const handleNewForm = () => {
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const handleBulkDelete = () => {
    const updatedFormDataList = formDataList.filter(
      (_, index) => !selectedIndexes.includes(index)
    );
    setFormDataList(updatedFormDataList);
    setSelectedIndexes([]);
    localStorage.setItem("feedbackData", JSON.stringify(updatedFormDataList));
  };

  const handleCheckboxChange = (index) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  // Filter formDataList based on searchQuery
  const filteredFormDataList = formDataList.filter((formData) =>
    formData.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container bg-gray-100 mx-auto px-4 py-6 relative">
      <div className="ml-4">
        <h1 className="text-3xl text-gray-700 font-bold">Aromatic bar</h1>
      </div>
      <div className="rounded-lg p-4">
        <div className="flex justify-end items-center mb-4">
          <div className="flex border rounded border-gray-400">
            <input
              type="text"
              placeholder="search..."
              className="p-2 rounded w-full outline-none lg:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="text-gray-300 bg-white font-bold py-2 px-4 rounded">
              <FaSearch size={20} />
            </button>
          </div>

          <button className="border border-gray-400 ml-2 bg-white text-gray-400 font-bold py-2 px-2">
            <IoMdRefresh size={22} />
          </button>

          <button
            onClick={handleNewForm}
            className="ml-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
          >
            Add New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead>
              <tr className="bg-violet-100 text-gray-700">
                <th className="p-4 border-r">Select</th>
                <th className="p-4 border-r">Form details</th>
                <th className="p-4 border-r">Customer Name</th>
                <th className="p-4 border-r">Email</th>
                <th className="p-4 border-r">Phone</th>
                <th className="p-4 border-r">
                  Please rate the quality of service you received from your host
                </th>
                <th className="p-4 border-r">Was our restaurant clean?</th>
                <th className="p-4 border-r">
                  Please rate the quality of your beverage
                </th>
                <th className="p-4 border-r">
                  Please rate your overall dining experience
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFormDataList.map((formData, index) => (
                <tr
                  key={index}
                  className="border-b border-r bg-white text-gray-600"
                >
                  <td className="p-4 border-r">
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="p-4 border-r">
                    <button className="text-blue-500">View details</button>
                  </td>
                  <td className="p-4 border-r">{formData.customerName}</td>
                  <td className="p-4 border-r">{formData.email}</td>
                  <td className="p-4 border-r">{formData.phone}</td>
                  <td className="p-4 border-r">{formData.serviceQuality}</td>
                  <td className="p-4 border-r">{formData.cleanliness}</td>
                  <td className="p-4 border-r">{formData.beverageQuality}</td>
                  <td className="p-4 border-r">{formData.overallExperience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={handleBulkDelete}
        className="fixed bottom-4 right-4 bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-sm"
      >
        Delete
      </button>
    </div>
  );
}
