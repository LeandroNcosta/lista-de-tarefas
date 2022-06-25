const caixadeTexto = document.querySelector("#caixaTexto");
const listadeTarefas = document.querySelector("#listaTarefas");
const botaoAddTarefa = document.querySelector("#addTarefa");
const listaSuspensaTarefas = document.querySelector("#listaSuspensa");

botaoAddTarefa.addEventListener("click", function () {
  const textodaTarefa = caixadeTexto.value;
  caixadeTexto.value = "";
  //chamando uma function para criar um li e declarar como filho da lista ul
  listadeTarefas.appendChild(adicionarTarefa(textodaTarefa));

  exibeOcultaListaSuspensa();

  caixadeTexto.focus();
});

// function para criar o li com texto digitado

function adicionarTarefa(textodaTarefa) {
  const elementoLi = document.createElement("li");
  const elementoSpan = document.createElement("span");

  elementoSpan.setAttribute("id", "tarefa");
  elementoSpan.textContent = textodaTarefa;
  elementoLi.className = "naoRealizada";

  elementoLi.appendChild(elementoSpan);
  elementoLi.appendChild(buttonDeRemover());

  //evento de click marcar e desmarcar tarefa
  elementoSpan.addEventListener("click", function () {
    console.log(elementoLi);
    if (this.id === "tarefa") {
      if (this.parentNode.className === "naoRealizada") {
        this.parentNode.className = "realizada";
      } else {
        this.parentNode.className = "naoRealizada";
      }
    }
  });

  return elementoLi;
}

// function para criar um button que remove item da lista

function buttonDeRemover() {
  const buttonRemove = document.createElement("button");
  buttonRemove.textContent = "✗";
  buttonRemove.className = "remover";

  buttonRemove.addEventListener("click", function () {
    listadeTarefas.removeChild(this.parentNode);
    exibeOcultaListaSuspensa();
  });

  return buttonRemove;
}

// functions select

function exibeOcultaListaSuspensa() {
  const elementoSpan = document.querySelector("#tarefa");
  if (elementoSpan === null) {
    listaSuspensaTarefas.setAttribute("hidden", "hidden");
  } else {
    listaSuspensaTarefas.removeAttribute("hidden");
  }
}

listaSuspensaTarefas.addEventListener("change", function () {
  if (
    listaSuspensaTarefas.selectedIndex === 1 ||
    listaSuspensaTarefas.selectedIndex === 2
  ) {
    const vetorTarefas = listadeTarefas.querySelectorAll("#tarefa");
    for (tarefa of vetorTarefas) {
      tarefa.dispatchEvent(new Event("click"));
    }
  } else if (listaSuspensaTarefas.selectedIndex === 3) {
    const vetorbotao = listadeTarefas.querySelectorAll(".remover");
    for (botao of vetorbotao) {
      botao.dispatchEvent(new Event("click"));
    }
  }
});
