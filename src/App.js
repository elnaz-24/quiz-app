import "./App.css";
import "./input.css";
import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      <Header />
      <main>
        <Quiz />
      </main>
    </>
  );
}
export default App;
