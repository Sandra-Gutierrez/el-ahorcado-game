import "../styles/App.scss";
import callToApi from "../services/api";
import Form from './Form';
import Header from './Header';
import Moñeco from './Moñeco';
import Solution from './Solution';
import { useState, useEffect } from "react";
import Errors from "./Errors";

function App() {

  // ESTADO
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [word, setWord] = useState("");
  const [wordLetters, setWordLetters] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault()
    setLastLetter("")
  }



  // API
  useEffect(() => {
    callToApi().then((responseData) => {
      setWord(responseData);
      setWordLetters(responseData.split(""));
    });
  }, []);

  // MANEJADORAS
  const handleLastLetter = (ev) => {
    const valueInput = ev.target.value.toLocaleLowerCase(); // Recogemos el valor de la letra pulsada
    if (valueInput.match("^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$")) {
      setLastLetter(valueInput); // La validamos y la guardamos en la variable estado lastLetter
      if (!word.includes(valueInput)) {
        // Si nuestra palabra no contiene la letra pulsada, aumentamos el numero de errores
        renderError();
      }
      if (valueInput !== "") {
        //guardamos la letra introducida en el array userLetters
        setUserLetters([...userLetters, valueInput]);
      }
    }
  };

  // RENDER
  const renderError = () => {
    // Incrementamos el numero de errores al fallar letra
    // Interpolamos la variable estado numberOfErrors en la clase css que pinta el ahorcado
    if (numberOfErrors <= 14) {
      setNumberOfErrors(numberOfErrors + 1);
    }
  };

  const renderErrorLetters = () => {
    // Filtro las letter de userLetters que NO esten incluidas en wordLetters
    const errorLetters = userLetters.filter(
      (letter) => !wordLetters.includes(letter)
    );
    // Mapeo el array errorLetters y renderizo la letra fallada
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className="letter">
          {letter}
        </li>
      );
    });
  };

  const renderSolutionLetters = () => {
    // Mapeo ee array wordLetters
    return wordLetters.map((letter, index) => {
      if (userLetters.includes(letter.toLocaleLowerCase())) { // Si encuentro la letra la pinto
        return (
          <li key={index} className="letter">
            {letter}
          </li>
        );
      } else { // Si no la encuentra solo se pinta el guión bajo
        return <li key={index} className="letter"></li>;
      }
    });
  };

  // REACT RENDER HTML
  return (
    <div className="page">
      <Header title="Juego del ahorcado" />
      <main className="main">
        <section>
          <Solution renderSolutionLetters={renderSolutionLetters} />

          {/* <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div> */}
          <Errors renderErrorLetters={renderErrorLetters} />
          {/* <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              {renderErrorLetters()}
            </ul>
          </div> */}
          <Form value={lastLetter} handleSubmit={handleSubmit} />
          {/* <form className="form" onSubmit={handleSubmit}>  
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onChange={handleLastLetter}
            />
          </form> */}
        </section>
        <Moñeco error={numberOfErrors} />
        {/* <section className={`dummy error-${numberOfErrors}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section> */}
      </main>
    </div>
  );
}

export default App;
