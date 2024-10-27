// Elementos de data e hora
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

// Elementos de botão e alerta
const btnBaterPonto = document.getElementById("btn-bater-ponto");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const dialogPonto = document.getElementById("dialog-ponto");
const relatorioContainer = document.getElementById("relatorio");
const btnFiltrarUltimaSemana = document.getElementById("btn-filtrar-ultima-semana");
const btnFiltrarUltimoMes = document.getElementById("btn-filtrar-ultimo-mes");

// Atualização da data e hora
function atualizarDataHora() {
    const data = new Date();
    const diaSemanaFormatado = data.toLocaleDateString('pt-BR', { weekday: 'long' });
    diaSemana.textContent = diaSemanaFormatado.charAt(0).toUpperCase() + diaSemanaFormatado.slice(1);
    diaMesAno.textContent = data.toLocaleDateString('pt-BR');
    horaMinSeg.textContent = data.toLocaleTimeString('pt-BR');
}
setInterval(atualizarDataHora, 1000);

// Função para salvar e recuperar registros do LocalStorage
function salvarRegistro(ponto) {
    const registros = JSON.parse(localStorage.getItem("registros") || "[]");
    registros.push(ponto);
    localStorage.setItem("registros", JSON.stringify(registros));
}

function obterRegistros() {
    return JSON.parse(localStorage.getItem("registros") || "[]");
}

// Mostrar ou ocultar alerta
function mostrarAlerta() {
    divAlertaRegistroPonto.classList.add("show");
    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
    }, 5000);
}

// Registrar ponto
btnBaterPonto.addEventListener("click", () => {
    dialogPonto.showModal();
});

btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

// Registrar ponto e salvar
document.getElementById("btn-dialog-bater-ponto").addEventListener("click", () => {
    const tipo = document.getElementById("tipos-ponto").value;
    const data = new Date().toLocaleDateString('pt-BR');
    const hora = new Date().toLocaleTimeString('pt-BR');
    const justificativa = document.getElementById("justificativa").value;
    const arquivo = document.getElementById("upload-arquivo").files[0];

    const ponto = { data, hora, tipo, justificativa, arquivo: arquivo ? arquivo.name : null };
    salvarRegistro(ponto);
    dialogPonto.close();
    mostrarAlerta();
    document.getElementById("justificativa").value = ""; // Limpar justificativa após o registro
    document.getElementById("upload-arquivo").value = ""; // Limpar arquivo após o registro
});

// Exibir relatórios
function exibirRelatorio(registros) {
    relatorioContainer.innerHTML = ""; // Limpar relatórios anteriores
    if (registros.length === 0) {
        relatorioContainer.innerHTML = "<p>Nenhum registro encontrado.</p>";
        return;
    }

    registros.forEach(registro => {
        const divRegistro = document.createElement("div");
        divRegistro.innerHTML = `
            <p>${registro.data} - ${registro.hora} - ${registro.tipo}</p>
            ${registro.justificativa ? `<p>Justificativa: ${registro.justificativa}</p>` : ""}
            ${registro.arquivo ? `<p>Arquivo: ${registro.arquivo}</p>` : ""}
            <button class="btn-editar">Editar</button>
            <button class="btn-excluir" onclick="alert('O ponto não pode ser excluído!')">Excluir</button>
        `;
        relatorioContainer.appendChild(divRegistro);
    });
}

// Função para filtrar registros
function filtrarRegistros(filtro) {
    const registros = obterRegistros();
    const dataAtual = new Date();

    const registrosFiltrados = registros.filter(registro => {
        const dataRegistro = new Date(registro.data);
        if (filtro === "semana") {
            const semanaInicio = new Date(dataAtual);
            semanaInicio.setDate(dataAtual.getDate() - 7);
            return dataRegistro >= semanaInicio && dataRegistro <= dataAtual;
        } else if (filtro === "mes") {
            const mesInicio = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
            return dataRegistro >= mesInicio && dataRegistro <= dataAtual;
        }
        return false;
    });

    exibirRelatorio(registrosFiltrados);
}

// Eventos para filtros
btnFiltrarUltimaSemana.addEventListener("click", () => filtrarRegistros("semana"));
btnFiltrarUltimoMes.addEventListener("click", () => filtrarRegistros("mes"));
