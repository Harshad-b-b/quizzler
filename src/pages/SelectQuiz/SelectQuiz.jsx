import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../actions/getCategoriesAction";

import DropDown from "../../components/DropDown/DropDown";
import Button from "../../components/Buttons/Button";
import errorGif from "../../assets/error.gif";
import loader from "../../assets/Book.gif";
import "./selectquiz.css";
import * as actionQuestions from "../../actions/getQuestions";
const difficulty = [
  { name: "Any Diffculty" },
  { name: "Easy" },
  { name: "Medium" },
  { name: "Hard" },
];
export default function SelectQuiz() {
  const [question, setQuestion] = React.useState({
    response_code: "0",
    results: [],
  });
  const navigate = useNavigate();
  const [userValues, setUserValues] = React.useState({
    amount: "",
    category: "9",
    difficulty: "",
  });
  const { categories, isLoading, hasErrors } = useSelector(
    (state) => state.categories
  );

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(action.fetchCategories());
  }, []);
  React.useEffect(() => {}, []);
  React.useEffect(() => {
    getUserValues();
    console.log(userValues);
  }, [userValues]);
  const getUserValues = () => {
    categories.map((val) => {
      if (val.name == userValues.category) {
        return setUserValues((prev) => {
          return { ...prev, category: val.id };
        });
      }
    });

    if (userValues.difficulty === "Any Type") {
      setUserValues((prev) => {
        return { ...prev, difficulty: "" };
      });
    }
  };
  const startQuiz = () => {
    if (
      userValues.amount === "" ||
      parseInt(userValues.amount) < 10 ||
      parseInt(userValues.amount) > 50
    ) {
      alert("Please enter a valid number");
    } else {
      navigate("/quiz-page", {
        state: userValues,
      });
      // dispatch(redirectAction.isTrue());
    }
  };
  const renderCategories = () => {
    if (isLoading)
      return (
        <div className="img">
          <img src={loader} />
          <h1>Loading...</h1>
        </div>
      );
    if (hasErrors)
      return (
        <div className="img">
          <img src={errorGif} />
          <h1>Error while fething data</h1>
        </div>
      );
    return (
      <div className="container1">
        <div className="main">Please Select The Categories</div>
        <div className="dropdowns">
          <DropDown
            arrayOfObjects={categories}
            onChange={(e) =>
              setUserValues((prev) => {
                return { ...prev, category: e.target.value };
              })
            }
          />
        </div>
        <div className="dropdowns">
          <DropDown
            arrayOfObjects={difficulty}
            onChange={(e) =>
              setUserValues((prev) => {
                return { ...prev, difficulty: e.target.value.toLowerCase() };
              })
            }
          />
        </div>
        <div className="dropdowns">
          <input
            type="number"
            checked
            className="input"
            name="amount"
            value={userValues.amount}
            onChange={(e) =>
              setUserValues((prev) => {
                return { ...prev, amount: e.target.value };
              })
            }
            placeholder="Number of questions.Min 10 and Max 50"
          />
        </div>
        <div className="btn">
          <Button text="Start Quiz" onClickEvent={startQuiz} />
        </div>
      </div>
    );
  };
  return (
    <>
      <div>{renderCategories(startQuiz)} </div>
    </>
  );
}
