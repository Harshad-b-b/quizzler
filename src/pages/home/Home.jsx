import React from "react";
import "./home.css";
import * as action from "../../actions/redirectAction";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";

export default function Home() {
  //Variables for this page are specified here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.redirect);
  const [inputNameText, setInputNameText] = React.useState("");

  React.useEffect(() => {
    dispatch(action.isFalse());
    localStorage.setItem("name", inputNameText);
  }, [inputNameText]);

  const startQuiz = () => {
    if (inputNameText === "") {
      alert("Please enter your name before start.");
    } else {
      dispatch(action.isTrue());

      navigate("/select-quiz");
    }
  };

  return (
    <div className="container d-flex position-relative flex-column justify-content-center align-items-center">
      <header className="home-header">
        <p>✌ Support World Peace ✌</p>
      </header>
      <div className="row ">
        <div className="col-12 welcome-text mt-7">Welcome To Quizler</div>
      </div>
      <div className="row responsive" style={{ width: "50%" }}>
        <div className="col-12 welcome-text">
          <input
            className="input"
            type="text"
            onChange={(e) => setInputNameText(e.target.value)}
            placeholder="Please Enter Your Name"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 welcome-text">
          <Button text="Start Quiz" onClickEvent={startQuiz} />
        </div>
      </div>
      <footer>
        <p>🖤 Made with love by Harshad</p>
      </footer>
    </div>
  );
}
