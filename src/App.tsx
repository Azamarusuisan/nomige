import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Select from "./routes/Select";
import GameRouter from "./routes/GameRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/game/:id" element={<GameRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
