import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    //Highlighting Selected Answers

    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

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

  //fix part200
  // if (!shuffledAnswers.current) {
  //   shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
  //   shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);
  // }
  // //shuffle
  // const shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers];
  // // shuffledAnswers.sort((a,b)=>1)
  // shuffledAnswers.current.sort((a, b) => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <Question
          index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
        {/* <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          // onTimeout={() => handleSelectAnswer(null)}
          onTimeout={handleSkipAnswer}
        /> */}
        {/* <h2>{QUESTIONS[activeQuestionIndex].text}</h2> */}
        {/* <Answers
          key={activeQuestionIndex}
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleSelectAnswer}
        /> */}
      </div>
    </div>
  );
}
