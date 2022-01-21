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

  // API
  useEffect(() => {
    callToApi().then((responseData) => {
      setWord(responseData.toLocaleLowerCase()); // Guardo la palabra en minúsculas
      setWordLetters(responseData.split(""));
    });
  }, []);

  // MANEJADORAS
  const handleSubmit = (event) => {
    event.preventDefault()
    setLastLetter("")
  }
  const handleLastLetter = (value) => {
    const valueInput = value.toLocaleLowerCase(); // Recogemos el valor de la letra pulsada
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
          <Errors renderErrorLetters={renderErrorLetters} />
          <Form value={lastLetter} handleSubmit={handleSubmit} handleLastLetter={handleLastLetter}/>
        </section>
        <Moñeco error={numberOfErrors} />
      </main>
    </div>
  );
}

export default App;