import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import New from "./pages/New";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:_id" element={<Diary />} />
          <Route path="/edit/:_id" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
