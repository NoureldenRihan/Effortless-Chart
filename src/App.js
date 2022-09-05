import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import ChartPage from "./pages/ChartPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
