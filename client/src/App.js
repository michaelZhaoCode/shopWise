import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './Chat';
import Chatbot from './Chatbot';
import Summary from './Summary';
import Home from './Home';
import Search from './Search';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/dicomViewer/:dcmId" element={<DicomViewer />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
