function obterRegistros() {
    return JSON.parse(localStorage.getItem("registros") || "[]");
}

function exibirRelatorio() {
    const registros = obterRegistros();
    const relatorioDiv = document.getElementById("relatorio");

    if (registros.length === 0) {
        relatorioDiv.innerHTML = "<p>Nenhum registro encontrado.</p>";
        return;
    }

    relatorioDiv.innerHTML = '';

    registros.forEach((registro, index) => {
        const registroDiv = document.createElement("div");
        registroDiv.textContent = `${registro.data} - ${registro.hora} - ${registro.tipo}`;

        const dataRegistro = new Date(registro.data);
        const dataAtual = new Date();

        if (dataRegistro < dataAtual.setHours(0, 0, 0, 0)) {
            registroDiv.classList.add("registro-passado");
        }

        if (registro.observacao) {
            registroDiv.classList.add("registro-com-observacao");
        }

        if (registro.editado) {
            registroDiv.classList.add("registro-editado");
        }

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = () => editarRegistro(index);
        registroDiv.appendChild(btnEditar);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";

        registroDiv.appendChild(btnExcluir);

        relatorioDiv.appendChild(registroDiv);
    });
}

document.getElementById("btn-voltar").addEventListener("click", () => {
    window.location.href = "index.html";
});

window.onload = () => {
    exibirRelatorio();
};
