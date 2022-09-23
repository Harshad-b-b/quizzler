import React from "react";
import Home from "./pages/home/Home";
import SelectQuiz from "./pages/SelectQuiz/SelectQuiz";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import QuizPage from "./pages/quizPage/QuizPage";
import ResultPage from "./pages/result/ResultPage";
import { useSelector } from "react-redux";
function App() {
  const redirect = useSelector((state) => state.redirect);
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/select-quiz"
          element={redirect ? <SelectQuiz /> :<Navigate to="/" />}
        />

        {/* <Route
          path="/quiz-page"
          element={redirect ? <QuizPage /> : <Navigate to="/" />}
        /> */}
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route
          path="/result-page"
          element={redirect ? <ResultPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
