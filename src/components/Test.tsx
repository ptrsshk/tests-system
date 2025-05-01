import { Dispatch, FC, FormEventHandler, SetStateAction } from "react";

interface ITest {
  name: string;
  description: string;
  questions: {
    id: number;
    text: string;
    answers: {
      text: string;
      score: number;
    }[];
  }[];
}

interface TestProps {
  test?: ITest;
  scoring?: {
    range: string;
    description: string;
  }[];
  results: number | null;
  setResults: Dispatch<SetStateAction<number | null>>;
}

export const Test: FC<TestProps> = ({ test, scoring, results, setResults }) => {
  const handleForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    const results = [];
    for (const value of formData.values()) {
      results.push(value);
    }
    setResults(results.reduce((acc, el) => (acc += Number(el)), 0));
    console.log(results.reduce((acc, el) => (acc += Number(el)), 0));
  };

  return (
    <div className="test-environment">
      {test ? (
        <>
          <h2>{test.description}</h2>
          <form className="form" onSubmit={handleForm}>
            <h3>Вопросы:</h3>
            {test.questions.map((el) => (
              <div key={el.id} className="question-wrapper">
                <p>
                  <strong>{`Вопрос ${el.id}: `}</strong>
                  {el.text}
                </p>
                <div className="answers-container">
                  {el.answers.map((answer) => (
                    <label key={answer.text} className="answer-wrapper">
                      <input
                        type="radio"
                        name={`${el.id}`}
                        value={answer.score}
                        required
                      />
                      {answer.text}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button className="submit-button">Закончить тест</button>
          </form>
        </>
      ) : (
        <h2>Сначала выберите тест</h2>
      )}
      {results && (
        <div className='score'>
          <h3>Ваш результат: {results} баллов</h3>
          <div className='score-text'>
            {scoring?.map((score) => (
              <p key={score.range}>
                <strong>{score.range}: </strong>
                {score.description}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
