import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImage from "../assets/quiz-complete.png";
import Question from "./Question";

export default function Quiz() {
  //fix part200
  // const shuffledAnswers = useRef();

  const [answerState, setAnswerState] = useState("");
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  //fix part 200
  // const [shuffledAnswers, setShuffledAnswers] = useState([]);

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
          key={activeQuestionIndex}
          questionText={QUESTIONS[activeQuestionIndex].text}
          answers={QUESTIONS[activeQuestionIndex].answers}
          onSelectAnswer={handleSelectAnswer}
          answerState={answerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
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
