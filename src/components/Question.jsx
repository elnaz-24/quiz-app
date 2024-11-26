import Answers from "../Answers";
import QuestionTimer from "../QuestionTimer";

export default function Question({
  questionText,
  answers,
  answerState,
  onSelectAnswer,
  selectedAnswer,
  onSkipAnswer,
}) {
  return (
    <div id="question">
      <QuestionTimer
        timeout={10000}
        // onTimeout={() => handleSelectAnswer(null)}
        onTimeout={onSkipAnswer}
      />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
