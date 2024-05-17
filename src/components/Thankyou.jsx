import {useNavigate} from "react-router-dom";

export default function Thankyou() {
  const navigate = useNavigate();

  const handleClose = () => {
    setTimeout(() => {
      navigate("/submissions");
    }, 500);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100">
      <div className="p-6 w-1/3 mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4">
        <div className="p-3 bg-green-500 text-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg text-blue-900 font-semibold">
            Thank you for providing the feedback
          </h3>
          <p className="text-zinc-600">
            We will work towards improving your experience
          </p>
        </div>
        <button
          onClick={handleClose}
          className=" bg-violet-600 text-white px-8 py-2 rounded-md hover:bg-purple-800 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
