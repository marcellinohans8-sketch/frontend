import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./views/Login";
import Register from "./views/Register";
import BaseLayout from "./views/BaseLayout";
import Home from "./views/Home";
import Add from "./views/Add";
import Detail from "./views/Detail";
import Edit from "./views/Edit";
import OurLegal from "./views/OurLegal";
import About from "./views/About";
import Consultation from "./views/Consultation";
import DeletePage from "./views/DeletePage";

import Unauthorized from "./components/Unauthorized";
import Authorized from "./components/Authorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== UNAUTHORIZED AREA ===== */}
        <Route
          path="/login"
          element={
            <Unauthorized>
              <Login />
            </Unauthorized>
          }
        />

        <Route
          path="/register"
          element={
            <Unauthorized>
              <Register />
            </Unauthorized>
          }
        />

        {/* ===== AUTHORIZED AREA ===== */}
        <Route
          element={
            <Authorized>
              <BaseLayout />
            </Authorized>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/our-legal" element={<OurLegal />} />
          <Route path="/about" element={<About />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/delete/:id" element={<DeletePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
