import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Thankyou from "./components/Thankyou";
import Submissions from "./components/Submissions";
import Home from "./components/Home";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thanks" element={<Thankyou />} />
          <Route path="/submissions" element={<Submissions />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />
    </>
  );
};

export default App;
