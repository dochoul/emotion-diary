import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import New from "./pages/New";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
