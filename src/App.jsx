import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Detail from "./pages/Detail";
import { reducer } from "./reducer";
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(1);

  useEffect(() => {
    let localStorageData = localStorage.getItem("diary");
    if (localStorageData) {
      localStorageData = JSON.parse(localStorage.getItem("diary"));
      dataId.current = parseInt(localStorageData[0].id) + 1;
    }

    if (localStorageData) {
      dispatch({
        type: "INIT",
        data: localStorageData,
      });
    }
  }, []);

  const onCreate = ({ date, selectedEmotion, content }) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        date,
        selectedEmotion,
        content,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:_id" element={<Edit />} />
              <Route path="/detail/:_id" element={<Detail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
