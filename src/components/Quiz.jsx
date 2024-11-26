import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import QuestionTimer from "../QuestionTimer";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  // //shuffle
  // const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // // shuffledAnswers.sort((a,b)=>1)
  // shuffledAnswers.sort((a, b) => Math.random() - 0.5);

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      //Highlighting Selected Answers
      setAnswerState("answered");

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  // progress bar
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  //quiz complete
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImage} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }
  //shuffle
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // shuffledAnswers.sort((a,b)=>1)
  shuffledAnswers.sort((a, b) => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          // onTimeout={() => handleSelectAnswer(null)}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {/* {QUESTIONS[activeQuestionIndex].answers.map((answer) => ( */}

          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }
            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
