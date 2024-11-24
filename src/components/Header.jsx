import quizLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center">
      <img src={quizLogo} alt="Quiz logo" />
      <h1 className="text-2xl">** Quiz **</h1>
    </header>
  );
}
