import { useState } from "react";
import { Header } from "./components/Header";
import { Test } from "./components/Test";
import { testData } from "./tests";
import "./style.css";

export const App = () => {
  const [category, setCategory] = useState(testData.categories[0].name);
  const [test, setTest] = useState("");
  const [results, setResults] = useState<number | null>(null);

  const getTest = () => {
    return testData.categories
      .find((cat) => cat.name === category)
      ?.tests.find((el) => el.description === test);
  };
  const getScoring = () => {
    return testData.categories.find((cat) => cat.name === category)?.scoring;
  };

  const handleSelectCategory = (e) => {
    setResults(null)
    setCategory(e.target.value);
  };
  const handleSelectTest = (e) => {
    setResults(null)
    setTest(e.target.value);
  };

  return (
    <>
      <Header
        handleSelectTest={handleSelectTest}
        handleSelectCategory={handleSelectCategory}
        category={category}
      />
      <Test test={getTest()} scoring={getScoring()} results={results} setResults={setResults} />
    </>
  );
};
