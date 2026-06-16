let agenda=JSON.parse(localStorage.getItem('agenda')||'[]');

function salvar(){
const item={
nome:nome.value,
telefone:telefone.value,
data:data.value,
hora:hora.value,
servico:servico.value
};
agenda.push(item);
localStorage.setItem('agenda',JSON.stringify(agenda));
render();
}

function render(){
lista.innerHTML='';
agenda.forEach((a,i)=>{
lista.innerHTML+=`
<div class="item">
<b>${a.nome}</b><br>
📅 ${a.data} ⏰ ${a.hora}<br>
✨ ${a.servico}<br>
<a target="_blank" href="https://wa.me/55${a.telefone.replace(/\D/g,'')}?text=Olá ${encodeURIComponent(a.nome)}, confirmando seu horário no Karine Studio 🌸">WhatsApp</a>
</div>`;
});
totalAgendamentos.textContent=agenda.length;
totalClientes.textContent=new Set(agenda.map(x=>x.telefone)).size;
}
render();
