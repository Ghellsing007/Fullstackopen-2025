import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well."
  ];

  // Estado para la anécdota actual
  const [selected, setSelected] = useState(0);

  // Estado para los votos de cada anécdota (array con 0 en todas)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  // Función para incrementar el voto de la anécdota actual
  const voteAnecdote = () => {
    const newVotes = [...votes]; // Copiamos el array actual
    newVotes[selected] += 1; // Aumentamos en 1 el voto de la anécdota actual
    setVotes(newVotes); // Actualizamos el estado con el nuevo array
  };

  // Función para seleccionar una nueva anécdota aleatoria
  const nextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  // Función para encontrar la anécdota con más votos
  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}<button onClick={voteAnecdote}>Vote</button></p>

      
      <button onClick={nextAnecdote}>Next Anecdote</button>

      <h2>Most Voted Anecdote</h2>
      {votes[mostVotedIndex] > 0 ? (
        <p>
          "{anecdotes[mostVotedIndex]}" <br />
          Votes: {votes[mostVotedIndex]}
        </p>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;
