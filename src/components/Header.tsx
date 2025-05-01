import { FC } from "react";
import { testData } from "../tests";

interface HeaderProps {
  handleSelectTest: (e: any) => void;
  handleSelectCategory: (e: any) => void;
  category: string;
}

export const Header: FC<HeaderProps> = ({
  handleSelectTest,
  handleSelectCategory,
  category,
}) => {
  return (
    <header>
      <h1>Платформа тестирования</h1>
      <div className="selector-container">
        <label htmlFor="categories">Выберите категорию тестов:</label>
        <select onChange={handleSelectCategory} id="categories">
          {testData.categories.map((category) => (
            <option key={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      {
        <div className="selector-container">
          <label htmlFor="tests">Тест:</label>
          <select id="tests" onChange={handleSelectTest} defaultValue={''}>
            <option value=""></option>
            {testData.categories
              .find((el) => el.name === category)
              ?.tests.map((test) => (
                <option key={test.description}>{test.description}</option>
              ))}
          </select>
        </div>
      }
    </header>
  );
};
