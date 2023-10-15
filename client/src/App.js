import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./Chatbot";
import Summary from "./Summary";
import Home from "./Home";
import Search from "./Search";
import { AppProvider } from "./Context";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />

            <Route path="/chat" element={<Chatbot />} />
            <Route path="/summary" element={<Summary />} />

            {/* <Route path="/dicomViewer/:dcmId" element={<DicomViewer />} /> */}
          </Routes>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
