// App.js
import Home from "./home/Home";
import React from "react";
import RegisterPage from "./registerPage/RegisterPage";
import SubjectsPage from "./subjectsPage/SubjectsPage";
import PrintPage from "./printPage/PrintPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { StudentProvider } from "./components/Context";
import ProfessorPage from "./ProfessorPage/ProfessorPage";

function App() {
  return (
    <div className="App">
      <StudentProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/register" element={<RegisterPage />} />{" "}
            <Route path="/subjects" element={<SubjectsPage />} />{" "}
            <Route path="/professors" element={<ProfessorPage />} />{" "}
            <Route path="/printPage" element={<PrintPage />} />{" "}
          </Routes>{" "}
        </BrowserRouter>{" "}
      </StudentProvider>{" "}
    </div>
  );
}

export default App;
