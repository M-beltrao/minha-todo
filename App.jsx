import { useState } from 'react';
import './App.css';

function TarefaItem({ tarefa, index, onRemover, onToggle }) {
  return (
    <li className={`tarefa-item ${tarefa.feita ? 'feita' : ''}`}>
      <button className="btn-check" onClick={() => onToggle(index)}>
        {tarefa.feita ? '✓' : ''}
      </button>
      <span className="tarefa-texto">{tarefa.texto}</span>
      <button className="btn-remover" onClick={() => onRemover(index)}>✕</button>
    </li>
  );
}

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");

  function adicionarTarefa() {
    if (input.trim()) {
      setTarefas([...tarefas, { texto: input.trim(), feita: false }]);
      setInput("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') adicionarTarefa();
  }

  function removerTarefa(index) {
    setTarefas(tarefas.filter((_, i) => i !== index));
  }

  function toggleTarefa(index) {
    setTarefas(tarefas.map((t, i) =>
      i === index ? { ...t, feita: !t.feita } : t
    ));
  }

  const feitas = tarefas.filter(t => t.feita).length;

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div>
            <h1>Minhas Tarefas</h1>
            <p className="subtitulo">{feitas} de {tarefas.length} concluídas</p>
          </div>
          <div className="badge">{tarefas.length - feitas} pendentes</div>
        </div>
        <div className="input-area">
          <input
            className="input-tarefa"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nova tarefa..."
          />
          <button className="btn-adicionar" onClick={adicionarTarefa}>+</button>
        </div>
        {tarefas.length === 0 ? (
          <p className="vazio">Nenhuma tarefa ainda. Adicione uma! ☝️</p>
        ) : (
          <ul className="lista">
            {tarefas.map((tarefa, index) => (
              <TarefaItem key={index} tarefa={tarefa} index={index} onRemover={removerTarefa} onToggle={toggleTarefa} />
            ))}
          </ul>
        )}
        {feitas > 0 && (
          <button className="btn-limpar" onClick={() => setTarefas(tarefas.filter(t => !t.feita))}>
            Limpar concluídas ({feitas})
          </button>
        )}
      </div>
    </div>
  );
}

export default App;