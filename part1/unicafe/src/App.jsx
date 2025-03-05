import { useState } from "react";

const App = () => {
  // Estados para los clics de cada botón
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [componenteActual, setComponenteActual] = useState(""); // Estado para mostrar estadísticas individuales

  // Encabezado
  const Header = () => <h1>Give Feedback</h1>;

  // Botón reutilizable
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
  );

  // Función para seleccionar el dato a mostrar en la tabla
  const RenderizarComponente = () => {
    switch (componenteActual) {
      case "A":
        return <StatisticLine text="Good" value={good} />;
      case "B":
        return <StatisticLine text="Neutral" value={neutral} />;
      case "C":
        return <StatisticLine text="Bad" value={bad} />;
      default:
        return <tr><td colSpan="2">No data</td></tr>;
    }
  };

  // Componente de fila en la tabla
  const StatisticLine = ({ text, value }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );

  // Componente de estadísticas en tabla
  const Statistics = () => {
    const total = good + neutral + bad;

    if (total === 0) {
      return <p>No feedback given</p>;
    }

    return (
      <div>
        <h2>Statistics</h2>
        <table border="1">
          <tbody>
            {RenderizarComponente()}
            <StatisticLine text="Average" value={(good - bad) / total} />
            <StatisticLine
              text="Positive"
              value={total > 0 ? (good / total) * 100 + "%" : "0%"}
            />
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Header />

      {/* Botones con lógica para cambiar el estado */}
      <Button handleClick={() => { setGood(good + 1); setComponenteActual("A"); }} text="Good" />
      <Button handleClick={() => { setNeutral(neutral + 1); setComponenteActual("B"); }} text="Neutral" />
      <Button handleClick={() => { setBad(bad + 1); setComponenteActual("C"); }} text="Bad" />

      <Statistics />
    </div>
  );
};

export default App;
