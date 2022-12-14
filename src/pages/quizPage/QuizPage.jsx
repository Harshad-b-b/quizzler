import "./quizpage.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/Book.gif";
import axios from "axios";
import Button from "../../components/Buttons/Button";

//function to convert html entity
function convertHTMLEntity(text) {
  const span = document.createElement("span");
  return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
    span.innerHTML = entity;
    return span.innerText;
  });
}

export default function QuizaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [minutes, setMinutes] = useState(
    !location.state ? 10 : Math.round(location.state.amount / 2 - 1)
  );
  const [seconds, setSeconds] = useState(59);
  const [noData, setNodata] = useState("");
  const [questionAndAnswers, setQuestionAndAnswers] = React.useState([]);
  const [answers, setAnswers] = React.useState({
    userAnswers: [],
    correctAnswers: [],
    questions: [],
  });
  const [loading, setLoading] = useState(false);

  //For fetching data.
  React.useEffect(() => {
    answers.userAnswers = [];
    for (let i = 0; i < location.state.amount; i++) {
      answers.userAnswers.push(null);
    }

    //Function to fetch data
    async function fetchData() {
      let response = await axios({
        url: `https://opentdb.com/api.php?amount=${location.state.amount}&category=${location.state.category}&difficulty=${location.state.difficulty}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(true);
      return response;
    }

    fetchData().then((response) => {
      //If response has nothing in it.
      if (response.data.response_code === 1) {
        setNodata(
          "Not found please try with different categories or reduce the number of questions."
        );
      } else {
        /*For mapping through response and adding all response data in the form of objects.
         {
          question:"",
          answwers:{
            answers:[],
           bool:""  //for chaning the button color
          }
          correctAnswers:"",
          name:"" //for form value
         }*/
        let responeObj = response.data.results.map((val, index) => {
          return {
            question: convertHTMLEntity(val.question),

            answers: val.incorrect_answers.map(function (val) {
              let html_entity_decoded = convertHTMLEntity(val);
              return {
                answers: html_entity_decoded,
                bool: false,
              };
            }),

            correctAnswers: convertHTMLEntity(val.correct_answer),
            name: val.incorrect_answers[0].split(" ").join(""),
          };
        });
        //For merging the correct answers to inccorect answers in random position.
        responeObj.map((val, i) => {
          let rand = Math.floor(Math.random() * 4);
          return val.answers.splice(rand, 0, {
            answers: response.data.results[i].correct_answer,
            bool: false,
          });
        });

        setQuestionAndAnswers(responeObj);
      }
    });
  }, []);

  //useEffect for managing the timer.
  useEffect(() => {
    let timer = "";
    if (loading) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(60);
        }
        if (minutes <= -1) {
          alert("Times up");
          questionAndAnswers.map((val) => {
            answers.correctAnswers.push(val.correctAnswers);
            answers.questions.push(val.question);
          });
          navigate("/result-page", {
            state: answers,
          });
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  });

  const submitForm = () => {
    questionAndAnswers.map((val) => {
      answers.correctAnswers.push(val.correctAnswers);
      answers.questions.push(val.question);
    });
    navigate("/result-page", {
      state: answers,
    });
  };
  //To handle when user accidentally clicks back button

  const onValueChange = (event, index, indi) => {
    questionAndAnswers.map((val, i) => {
      if (i === index) {
        val.answers.map((va) => {
          va.bool = false;
        });
        val.answers[indi].bool = true;
        answers.userAnswers.splice(i, 1);
        answers.userAnswers.splice(i, 0, event.target.value);
      }
    });
  };
  return (
    <div>
      {loading ? (
        noData ? (
          <h1>{noData}</h1>
        ) : (
          <div>
            <div className="container ">
              <div className="holder">
                <div className="timer">
                  {minutes <= -1 ? (
                    <span>00:00</span>
                  ) : (
                    <div>
                      <span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                  )}
                </div>

                <ol>
                  {questionAndAnswers.map((val1, i) => {
                    return (
                      <div className="card">
                        <li key={i} className="li" id="li">
                          <span> {val1.question} </span>
                          <ol className="options" type="a">
                            {val1.answers.map((val, index) => {
                              return (
                                <li key={index}>
                                  <label
                                    style={{
                                      background: val.bool ? "orange" : "",
                                    }}
                                    className="containerwa"
                                  >
                                    {val.answers}
                                    <input
                                      className="options2"
                                      type="radio"
                                      name={val1.name}
                                      value={val.answers}
                                      onChange={(e) =>
                                        onValueChange(e, i, index)
                                      }
                                    />
                                    <span className="checkmark"></span>
                                  </label>
                                </li>
                              );
                            })}
                          </ol>
                        </li>
                      </div>
                    );
                  })}
                </ol>
                <div class="btn2">
                  <Button onClickEvent={submitForm} text="Check Results" />
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="loader-img">
          <img src={loader} />
          <h1>Loading....</h1>
        </div>
      )}
    </div>
  );
}
