import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./login.js";

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
