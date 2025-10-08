let contador = 0;
const span = document.getElementById("contador");

function atualizarContador() {
  contador++;
  span.textContent = contador;
}

document.getElementById("btnClick").addEventListener("click", atualizarContador);
document.getElementById("btnDblClick").addEventListener("dblclick", atualizarContador);
document.getElementById("btnOver").addEventListener("mouseover", atualizarContador);
document.getElementById("btnOut").addEventListener("mouseout", atualizarContador);
document.getElementById("btnMove").addEventListener("mousemove", atualizarContador);

