// Elementos de data e hora
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

// Elementos de botão e alerta
const btnBaterPonto = document.getElementById("btn-bater-ponto");
const btnJustificativa = document.getElementById("btn-justificativa");
const btnRelatorio = document.getElementById("btn-relatorio");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const dialogPonto = document.getElementById("dialog-ponto");
const dialogJustificativa = document.getElementById("dialog-justificativa");

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
    const observacao = document.getElementById("observacao").value || ""; // Obter observação
    const data = new Date();
    const dataRegistro = data.toLocaleDateString('pt-BR');
    const hora = data.toLocaleTimeString('pt-BR');

    // Verificar se o registro é para uma data passada
    const dataSelecionada = new Date(dataRegistro);
    const dataAtual = new Date();
    if (dataSelecionada > dataAtual) {
        alert("Não é possível registrar em datas futuras.");
        return;
    }

    const ponto = {
        data: dataRegistro,
        hora,
        tipo,
        observacao,
        editado: false, // Definir se o registro foi editado
    };

    // Verificar se a data é do passado
    if (dataSelecionada < dataAtual) {
        ponto.passado = true; // Marcar como registro passado
    } else {
        ponto.passado = false;
    }

    salvarRegistro(ponto);
    dialogPonto.close();
    mostrarAlerta();
});

// Registrar justificativa
btnJustificativa.addEventListener("click", () => {
    dialogJustificativa.showModal();
});

// Fechar modal de justificativa
document.getElementById("btn-justificativa-fechar").addEventListener("click", () => {
    dialogJustificativa.close();
});

document.getElementById("btn-dialog-justificativa").addEventListener("click", () => {
    const justificativa = document.getElementById("justificativa-texto").value;
    const arquivo = document.getElementById("justificativa-arquivo").files[0];

    // Aqui você pode processar a justificativa e o arquivo se necessário

    dialogJustificativa.close();
    mostrarAlerta();
});

// Visualizar relatórios
btnRelatorio.addEventListener("click", () => {
    window.location.href = "relatorio.html";
});
