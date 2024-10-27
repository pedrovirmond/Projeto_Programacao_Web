
const diaSemana = document.getElementById("dia-semana");
const diaMesAno = document.getElementById("dia-mes-ano");
const horaMinSeg = document.getElementById("hora-min-seg");

const btnBaterPonto = document.getElementById("btn-bater-ponto");
const divAlertaRegistroPonto = document.getElementById("alerta-registro-ponto");
const btnDialogFechar = document.getElementById("btn-dialog-fechar");
const dialogPonto = document.getElementById("dialog-ponto");

function atualizarDataHora() {
    diaSemana.textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });
    diaMesAno.textContent = new Date().toLocaleDateString('pt-BR');
    horaMinSeg.textContent = new Date().toLocaleTimeString('pt-BR');
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
    const data = new Date().toLocaleDateString('pt-BR');
    const hora = new Date().toLocaleTimeString('pt-BR');

    const ponto = { data, hora, tipo };
    salvarRegistro(ponto);
    dialogPonto.close();
    mostrarAlerta();
});
