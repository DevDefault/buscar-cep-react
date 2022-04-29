import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";

import api from "./services/api";

function App() {
    const [input, setInput] = useState("");
    const [cep, setCep] = useState({});

    async function handleSearch() {
        if (input === "") {
            alert("Insira um CEP");
            return;
        }

        try {
            const response = await api.get(`${input}/json`);
            setCep(response.data);
            setInput("");
        } catch {
            alert("Ops erro ao buscar");
            setInput("");
        }
    }

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Buscador de CEP</h1>

                <div className="containerInput">
                    <input
                        type="text"
                        placeholder="Digite seu cep"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        maxLength="9"
                    />

                    <button className="buttomSearch" onClick={handleSearch}>
                        <FiSearch size={20} 
                        color="#44475a" 
                        />
                    </button>
                </div>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>CEP {cep.cep}</h2>

                    <p><strong>Endereço: </strong> {cep.logradouro}</p>
                    <p><strong>Complemento: </strong>{cep.complemento}</p>
                    <p><strong>Bairro: </strong>{cep.bairro}</p>
                    <p><strong>Estado: </strong>{cep.uf}</p>
                    <p><strong>DDD: </strong>{cep.ddd}</p>
                </main>
            )}
        </div>
    );
}

export default App;
