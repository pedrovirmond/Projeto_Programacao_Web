// relatorio.js

function obterRegistros() {
    return JSON.parse(localStorage.getItem("registros") || "[]");
}

function exibirRelatorio() {
    const relatorioDiv = document.getElementById("relatorio");
    const registros = obterRegistros();

    if (registros.length === 0) {
        relatorioDiv.innerHTML = "<p>Nenhum registro encontrado.</p>";
        return;
    }

    registros.forEach((registro) => {
        const registroDiv = document.createElement("div");
        registroDiv.textContent = `${registro.data} - ${registro.hora} - ${registro.tipo}`;

        // Estilizar registros
        const dataRegistro = new Date(registro.data);
        const dataAtual = new Date();

        // Diferenciar registros passados
        if (dataRegistro < dataAtual) {
            registroDiv.classList.add("registro-passado");
        }

        // Diferenciar registros com observação
        if (registro.observacao) {
            registroDiv.classList.add("registro-com-observacao");
        }

        // Se o registro foi editado
        if (registro.editado) {
            registroDiv.classList.add("registro-editado");
        }

        relatorioDiv.appendChild(registroDiv);
    });
}

document.getElementById("btn-voltar").addEventListener("click", () => {
    window.location.href = "index.html";
});

// Chama a função para exibir o relatório assim que o script carregar
exibirRelatorio();
