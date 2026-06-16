// ======================================
// KARINE STUDIO
// ======================================

let agenda =
JSON.parse(
localStorage.getItem("agenda")
) || [];

let clientes =
JSON.parse(
localStorage.getItem("clientes")
) || [];

let financeiro =
JSON.parse(
localStorage.getItem("financeiro")
) || [];

// ======================================
// MENU
// ======================================

function mostrarTela(id, elemento){

document
.querySelectorAll(".tela")
.forEach(tela=>{
tela.classList.remove("ativa");
});

document
.getElementById(id)
.classList.add("ativa");

document
.querySelectorAll(".sidebar li")
.forEach(item=>{
item.classList.remove("active");
});

if(elemento){
elemento.classList.add("active");
}

}

// ======================================
// AGENDAMENTO
// ======================================

function salvarAgendamento(){

const nome =
document.getElementById("nome").value.trim();

const telefone =
document.getElementById("telefone").value.trim();

const data =
document.getElementById("data").value;

const hora =
document.getElementById("hora").value;

const servico =
document.getElementById("servico").value;

const valor =
Number(
document.getElementById("valor").value
);

if(
!nome ||
!telefone ||
!data ||
!hora ||
!valor
){

alert(
"Preencha todos os campos."
);

return;

}

const novo = {

id: Date.now(),

nome,
telefone,
data,
hora,
servico,
valor

};

agenda.push(novo);

localStorage.setItem(
"agenda",
JSON.stringify(agenda)
);

limparFormulario();

renderizarTudo();

alert(
"Agendamento salvo!"
);

}

// ======================================
// LIMPAR
// ======================================

function limparFormulario(){

document.getElementById("nome").value = "";
document.getElementById("telefone").value = "";
document.getElementById("data").value = "";
document.getElementById("hora").value = "";
document.getElementById("valor").value = "";

}

// ======================================
// CLIENTES
// ======================================

function salvarCliente(){

const nome =
document.getElementById("clienteNome").value.trim();

const telefone =
document.getElementById("clienteTelefone").value.trim();

if(!nome || !telefone){

alert(
"Preencha os campos."
);

return;

}

clientes.push({

id: Date.now(),

nome,
telefone

});

localStorage.setItem(
"clientes",
JSON.stringify(clientes)
);

document.getElementById(
"clienteNome"
).value = "";

document.getElementById(
"clienteTelefone"
).value = "";

renderizarClientes();

atualizarDashboard();

alert(
"Cliente cadastrado!"
);

}

// ======================================
// EXCLUIR CLIENTE
// ======================================

function excluirCliente(id){

if(
!confirm(
"Excluir cliente?"
)
){
return;
}

clientes =
clientes.filter(
cliente => cliente.id !== id
);

localStorage.setItem(
"clientes",
JSON.stringify(clientes)
);

renderizarClientes();

atualizarDashboard();

}

// ======================================
// EXCLUIR AGENDAMENTO
// ======================================

function excluirAgendamento(id){

if(
!confirm(
"Excluir agendamento?"
)
){
return;
}

agenda =
agenda.filter(
item => item.id !== id
);

localStorage.setItem(
"agenda",
JSON.stringify(agenda)
);

renderizarTudo();

}

// ======================================
// FINALIZAR ATENDIMENTO
// ======================================

function finalizarAtendimento(id){

const atendimento =
agenda.find(
item => item.id === id
);

if(!atendimento) return;

financeiro.push({

id: Date.now(),

cliente:
atendimento.nome,

servico:
atendimento.servico,

valor:
Number(
atendimento.valor
),

data:
new Date()
.toLocaleDateString(
'pt-BR'
)

});

agenda =
agenda.filter(
item => item.id !== id
);

localStorage.setItem(
"agenda",
JSON.stringify(agenda)
);

localStorage.setItem(
"financeiro",
JSON.stringify(financeiro)
);

renderizarTudo();

alert(
"Atendimento concluído!"
);

}

// ======================================
// DASHBOARD
// ======================================

function atualizarDashboard(){

const totalFinanceiro =
financeiro.reduce(
(acc,item)=>
acc + Number(item.valor),
0
);

document.getElementById(
"totalClientes"
).textContent =
clientes.length;

document.getElementById(
"totalAgendamentos"
).textContent =
agenda.length;

document.getElementById(
"faturamento"
).textContent =
"R$ " +
totalFinanceiro.toFixed(2);

}

// ======================================
// AGENDA
// ======================================

function renderizarAgenda(){

const lista =
document.getElementById(
"listaAgenda"
);

lista.innerHTML = "";

if(
agenda.length === 0
){

lista.innerHTML =
"<p>Nenhum agendamento cadastrado.</p>";

return;

}

agenda

.sort((a,b)=>{

return new Date(
a.data + "T" + a.hora
)

-

new Date(
b.data + "T" + b.hora
);

})

.forEach(item=>{

const telefone =
item.telefone.replace(
/\D/g,
''
);

const mensagem =
encodeURIComponent(

`Olá ${item.nome}! 🌸

Passando para confirmar seu horário no Karine Studio.

📅 Data: ${item.data}
⏰ Horário: ${item.hora}
✨ Serviço: ${item.servico}

Estamos te esperando 💖`

);

lista.innerHTML += `

<div class="item">

<strong>
${item.nome}
</strong>

<p>
📅 ${item.data}
</p>

<p>
⏰ ${item.hora}
</p>

<p>
✨ ${item.servico}
</p>

<p>
💰 R$ ${item.valor}
</p>

<a
target="_blank"
href="https://wa.me/55${telefone}?text=${mensagem}">
WhatsApp
</a>

<button
onclick="finalizarAtendimento(${item.id})">
✅ Concluir Atendimento
</button>

<button
onclick="excluirAgendamento(${item.id})">
❌ Excluir
</button>

</div>

`;

});

}

// ======================================
// CLIENTES
// ======================================

function renderizarClientes(){

const lista =
document.getElementById(
"listaClientes"
);

lista.innerHTML = "";

if(
clientes.length === 0
){

lista.innerHTML =
"<p>Nenhum cliente cadastrado.</p>";

return;

}

clientes.forEach(cliente=>{

lista.innerHTML += `

<div class="item">

<strong>
${cliente.nome}
</strong>

<p>
📱 ${cliente.telefone}
</p>

<button
onclick="excluirCliente(${cliente.id})">
Excluir
</button>

</div>

`;

});

}

// ======================================
// PRÓXIMOS HORÁRIOS
// ======================================

function renderizarProximos(){

const lista =
document.getElementById(
"proximosAgendamentos"
);

lista.innerHTML = "";

if(
agenda.length === 0
){

lista.innerHTML =
"<p>Nenhum horário cadastrado.</p>";

return;

}

agenda
.slice()
.sort((a,b)=>{

return new Date(
a.data + "T" + a.hora
)

-

new Date(
b.data + "T" + b.hora
);

})
.slice(0,5)

.forEach(item=>{

lista.innerHTML += `

<div class="item">

<strong>
${item.nome}
</strong>

<p>
📅 ${item.data}
às ${item.hora}
</p>

</div>

`;

});

}

// ======================================
// FINANCEIRO
// ======================================

function renderizarFinanceiro(){

const lista =
document.getElementById(
"listaFinanceiro"
);

lista.innerHTML = "";

const total =
financeiro.reduce(
(acc,item)=>
acc + Number(item.valor),
0
);

lista.innerHTML += `

<div class="card">

<h3>
Faturamento Total
</h3>

<span>

R$ ${total.toFixed(2)}

</span>

</div>

`;

financeiro.forEach(item=>{

lista.innerHTML += `

<div class="item">

<strong>
${item.cliente}
</strong>

<p>
✨ ${item.servico}
</p>

<p>
💰 R$ ${item.valor}
</p>

<p>
📅 ${item.data}
</p>

</div>

`;

});

}

// ======================================
// RENDER
// ======================================

function renderizarTudo(){

atualizarDashboard();

renderizarAgenda();

renderizarClientes();

renderizarProximos();

renderizarFinanceiro();

}

// ======================================
// INICIAR
// ======================================

window.onload = () => {

renderizarTudo();

};