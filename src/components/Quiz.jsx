import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import QuestionTimer from "../QuestionTimer";

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  // //shuffle
  // const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // // shuffledAnswers.sort((a,b)=>1)
  // shuffledAnswers.sort((a, b) => Math.random() - 0.5);

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer=useCallback( function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },[])

// progress bar
const handleSkipAnswer=useCallback(() => handleSelectAnswer(null),[handleSelectAnswer])


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
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
