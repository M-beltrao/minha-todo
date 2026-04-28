import { useState } from "react";
import Tarefa from "./Tarefa";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");

  function adicionarTarefa() {
    if (input !== "") {
      setTarefas([...tarefas, input]);
      setInput("");
    }
  }

  function removerTarefa(index) {
    const novaLista = tarefas.filter(
      (tarefa, i) => i !== index
    );
    setTarefas(novaLista);
  }

  return (
    <div className="container">
      <h1>Minha Lista de Tarefas</h1>

      <input
        type="text"
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        placeholder="Nova tarefa"
      />

      <button onClick={adicionarTarefa}>
        Adicionar
      </button>

      <ul>
        {tarefas.map((tarefa, index) => (
          <Tarefa
            key={index}
            texto={tarefa}
            index={index}
            remover={removerTarefa}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;