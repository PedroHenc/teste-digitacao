const texto = document.querySelector('#texto');
const entrada = document.querySelector('#entrada');
const reiniciar = document.querySelector('#reiniciar');
const resultado = document.querySelector('#resultado');
const historico = document.querySelector('#historico');
const alterartemabtn = document.querySelector('#alterartema');

const textos = [
    "Exemplo para digitar.",
    "Outro exemplo para digitar.",
    "Mais um exemplo para digitar.",
];  

function novoTexto() {
    const index = Math.floor(Math.random() * textos.length)
    texto.textContent = textos[index]
}

function atualizarteste() {
    iniciar();

    if(entrada.value === texto.textContent) {
        verificar();
    }
}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

   if(!statusDoTeste) {
    localStorage.setItem("tempoInicial", new Date().getTime());
    localStorage.setItem("testeEmAndamento", true);
   }
}

function verificar() {
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    resultado.textContent = `Você levou ${tempoGasto} segundos!`;

    adicionarAoHistorico(texto.textContent, tempoGasto);
    localStorage.setItem("testeEmAndamento", false);
    entrada.value = '';
    novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
    const itemHistorico =  document.createElement("p");

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto} em segundos`;
    historico.appendChild(itemHistorico);
}

function reiniciarTeste() {
    entrada.value = '';
    resultado.textContent = '';
    novoTexto();
    localStorage.setItem("testeEmAndamento", false);
    historico.innerHTML = '';
}

function alterartema() {
    const body = document.body

    body.classList.toggle('claro');
    body.classList.toggle('escuro');
}

entrada.addEventListener("keyup", atualizarteste);
reiniciar.addEventListener("click", reiniciarTeste);
alterartemabtn.addEventListener("click", alterartema);

novoTexto();