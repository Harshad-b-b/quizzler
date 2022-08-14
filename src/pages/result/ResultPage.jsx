import React from "react";
import "./ResultPage.css";
import { useLocation, useNavigate } from "react-router";
import Confetti from "react-confetti";
import Button from "../../components/Buttons/Button";
{
  /* TODO  Add a div to see questions,correct answers, your answers*/
}
export default function () {
  const [answereCounter, setAnswereCounter] = React.useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const scoreChecker = answereCounter >= location.state.userAnswers.length / 2;
  const name = localStorage.getItem("name");
  const [stopConfetti, setStopConfetti] = React.useState(0);
  React.useEffect(() => {
    getvals();
    console.log(location);
  }, []);
  const getvals = () => {
    location.state.correctAnswers.map((val, i) => {
      if (location.state.userAnswers[i] === val) {
        return setAnswereCounter((prev) => prev + 1);
      }
    });
  };
  window.onpopstate = () => {
    navigate("/");
  };
  React.useEffect(
    () => {
      const timeout = setTimeout(() => {
        setStopConfetti((prev) => prev + 1);
      }, 1000);
      console.log(stopConfetti);

      return () => {
        clearTimeout(timeout);
      };
    },
    stopConfetti === 10 ? [] : [stopConfetti]
  );
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center score mt-4 ">
          <div className="col-12 d-flex justify-content-center">
            {scoreChecker ? (
              <div
                className="d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <div style={{ display: stopConfetti === 10 ? "none" : "" }}>
                  <Confetti />
                </div>

                <h3>
                  Congratulations 🤝 {name.toLocaleUpperCase()} You scored
                  {answereCounter} points
                </h3>
              </div>
            ) : (
              <h3>
                {name.toLocaleUpperCase()} You scored {answereCounter} points.
                Better luck next time 😢
              </h3>
            )}
          </div>
        </div>
        <div className="row d-flex justify-content-center score">
          <p className="col-12 d-flex justify-content-center">
            Please Check your answers below
          </p>
          <div className="row">
            <ol className="col-12">
              {location.state.questions.map((val, i) => {
                return (
                  <div className="row card p-4">
                    <div className="col-12 ">
                      <li>
                        <b>{val}|</b>
                      </li>
                    </div>
                    <div className="row">
                      <div className=" col-4 col-xs-6 col-md-4">
                        <i>Correct Answer</i>
                        <br /> {location.state.correctAnswers[i]}
                      </div>
                      <div className="col-4 col-xs-6 col-md-4">
                        <i>Your Answer</i>
                        <br />
                        {location.state.userAnswers[i]
                          ? location.state.userAnswers[i]
                          : "You ahave not answerd"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </ol>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-12 d-flex justify-content-center mb-5 ">
            <Button
              onClickEvent={() => navigate("/")}
              text="Take Quiz Again."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
