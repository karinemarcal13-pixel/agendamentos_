const lista =
document.getElementById("lista");

let agenda =
JSON.parse(localStorage.getItem("agenda"))
|| [];

function salvarAgendamento(){

const nome =
document.getElementById("nome").value;

const data =
document.getElementById("data").value;

const hora =
document.getElementById("hora").value;

const servico =
document.getElementById("servico").value;

if(!nome || !data || !hora){

alert("Preencha todos os campos.");

return;

}

agenda.push({

nome,
data,
hora,
servico

});

localStorage.setItem(
"agenda",
JSON.stringify(agenda)
);

mostrarAgenda();

document.getElementById("nome").value = "";

}

function mostrarAgenda(){

lista.innerHTML = "";

agenda.forEach(item=>{

lista.innerHTML += `

<div class="agendamento">

<strong>${item.nome}</strong>

<span>📅 ${item.data}</span>

<span>⏰ ${item.hora}</span>

<span>✨ ${item.servico}</span>

</div>

`;

});

}

mostrarAgenda();