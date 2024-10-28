const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
const btnJustificativa = document.getElementById("btn-justificativa");
const btnRelatorio = document.getElementById("btn-relatorio");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const dialogPonto = document.getElementById("dialog-ponto");
const dialogJustificativa = document.getElementById("dialog-justificativa");

function atualizarDataHora() {
    const data = new Date();
    const diaSemanaFormatado = data.toLocaleDateString('pt-BR', { weekday: 'long' });
    diaSemana.textContent = diaSemanaFormatado.charAt(0).toUpperCase() + diaSemanaFormatado.slice(1);
    diaMesAno.textContent = data.toLocaleDateString('pt-BR');
    horaMinSeg.textContent = data.toLocaleTimeString('pt-BR');
}
setInterval(atualizarDataHora, 1000);

function salvarRegistro(ponto) {
    const registros = JSON.parse(localStorage.getItem("registros") || "[]");
    registros.push(ponto);
    localStorage.setItem("registros", JSON.stringify(registros));
}

function obterRegistros() {
    return JSON.parse(localStorage.getItem("registros") || "[]");
}

function mostrarAlerta() {
    divAlertaRegistroPonto.classList.add("show");
    setTimeout(() => {
        divAlertaRegistroPonto.classList.remove("show");
    }, 5000);
}

btnBaterPonto.addEventListener("click", () => {
    dialogPonto.showModal();
});

btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

document.getElementById("btn-dialog-bater-ponto").addEventListener("click", () => {
    const tipo = document.getElementById("tipos-ponto").value;
    const observacao = document.getElementById("observacao").value || "";
    const dataRegistro = new Date();
    const dataAtual = new Date();

    if (dataRegistro > dataAtual) {
        alert("Não é possível registrar em datas futuras.");
        return;
    }

    const hora = dataAtual.toLocaleTimeString('pt-BR');

    const ponto = {
        data: dataRegistro.toLocaleDateString('pt-BR'),
        hora,
        tipo,
        observacao,
        editado: false,
    };

    salvarRegistro(ponto);
    dialogPonto.close();
    mostrarAlerta();
});

btnJustificativa.addEventListener("click", () => {
    dialogJustificativa.showModal();
});

document.getElementById("btn-justificativa-fechar").addEventListener("click", () => {
    dialogJustificativa.close();
});

document.getElementById("btn-dialog-justificativa").addEventListener("click", () => {
    const justificativa = document.getElementById("justificativa-texto").value;
    const arquivo = document.getElementById("justificativa-arquivo").files[0];

    dialogJustificativa.close();
    mostrarAlerta();
});

btnRelatorio.addEventListener("click", () => {
    window.location.href = "relatorio.html";
});
