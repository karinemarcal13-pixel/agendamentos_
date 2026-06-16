let agenda = JSON.parse(localStorage.getItem("agenda")) || [];

function salvarAgendamento(){

let cliente = {
nome: document.getElementById("nome").value,
data: document.getElementById("data").value,
hora: document.getElementById("hora").value,
servico: document.getElementById("servico").value
};

agenda.push(cliente);

localStorage.setItem("agenda", JSON.stringify(agenda));

mostrarAgenda();

alert("Agendamento salvo!");
}

function mostrarAgenda(){

let lista = document.getElementById("lista");

lista.innerHTML = "";

agenda.forEach((item)=>{

lista.innerHTML += `
<li>
${item.nome} -
${item.data} -
${item.hora} -
${item.servico}
</li>
`;

});
}

mostrarAgenda();