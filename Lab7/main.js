document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos(produtos);
  atualizaCesto();
});




function criarProduto(produto){
    const artigo = document.createElement("article");
    artigo.className = "produto";

    const h3 = document.createElement("h3");
    h3.textContent = produto.title;

    const img = document.createElement("img");
    img.src = produto.image;
    img.alt = produto.title;

    const preco = document.createElement("p");
    preco.textContent = `Custo total: ${produto.price.toFixed(2)} €`;

    const descricao = document.createElement("p");
    descricao.textContent = produto.description;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = "+ Adicionar ao cesto"

    botao.addEventListener("click", () => {
        const lista = lerSelecionados();
        lista.push(produto.id);
        guardarSelecionados(lista);
        atualizaCesto();
    })

    artigo.append(h3, img, preco, descricao, botao);
    return artigo;
}


function carregarProdutos(lista){
    const secProdutos = document.getElementById("produtos");
    secProdutos.textContent = "";

    const listaSemantica = document.createElement("section");
    listaSemantica.className = "lista-produtos";

    lista.forEach((prod) => {
        const artigo = criarProduto(prod);
        listaSemantica.append(artigo);
        
    });

    secProdutos.append(listaSemantica);
}

const produtosSelecionados = "produtos-selecionados";

if (localStorage.getItem(produtosSelecionados) === null) {
  localStorage.setItem(produtosSelecionados, "[]");
}

function lerSelecionados() {
  const texto = localStorage.getItem(produtosSelecionados);
  return texto ? JSON.parse(texto) : [];
}

function guardarSelecionados(lista) {
  localStorage.setItem(produtosSelecionados, JSON.stringify(lista));
}

function atualizaCesto() {
  const secCesto = document.getElementById("cesto");
  secCesto.textContent = "";

  const titulo = document.createElement("h2");
  titulo.textContent = "Produtos Selecionados";

  const lista = document.createElement("section");
  lista.className = "lista-produtos";

  const ids = lerSelecionados();
  let total = 0;

  ids.forEach((id) => {
    const prod = produtos.find(p => p.id === id);
    if (!prod) return;
    total += prod.price;
    const artigo = criaProdutoCesto(prod);
    lista.append(artigo);
  });

  const contaTotal = document.createElement("p");
  contaTotal.style.fontWeight = "700";
  contaTotal.textContent = `Custo total: ${total.toFixed(2)} €`;

  secCesto.append(titulo, lista, contaTotal);
}

function criaProdutoCesto(produto) {
  const artigo = document.createElement("article");
  artigo.className = "produto";

  const h3 = document.createElement("h3");
  h3.textContent = produto.title;

  const img = document.createElement("img");
  img.src = produto.image;
  img.alt = produto.title;

  const preco = document.createElement("p");
  preco.textContent = `Custo total: ${produto.price.toFixed(2)} €`;

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.textContent = "- Remover do cesto";
  botaoRemover.addEventListener("click", () => {
    const lista = lerSelecionados();
    const indice = lista.indexOf(produto.id);
    if (indice > -1) {
      lista.splice(indice, 1);
      guardarSelecionados(lista);
      atualizaCesto();
    }
  });

  artigo.append(h3, img, preco, botaoRemover);
  return artigo;
}




