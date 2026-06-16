let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function salvarCliente(){

let cliente = {
nome: document.getElementById("nomeCliente").value,
telefone: document.getElementById("telefoneCliente").value
};

clientes.push(cliente);

localStorage.setItem("clientes",
JSON.stringify(clientes));

mostrarClientes();
}

function mostrarClientes(){

let lista = document.getElementById("listaClientes");

lista.innerHTML = "";

clientes.forEach(cliente=>{

lista.innerHTML += `
<li>
${cliente.nome} - ${cliente.telefone}
</li>
`;

});
}

mostrarClientes();