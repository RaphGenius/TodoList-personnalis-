// Recuperer ce qui est écrit
const input = document.querySelector(".input-todo");
// Valider le formulaire
const buttonForm = document.querySelector(".button-todo");
//Message d'erreur
const errorMsg = document.querySelector(".errorMsg");
buttonForm.addEventListener("click", createCard);

const todoContainer = document.querySelector(".container-todos");
let lockBtn = false;
function createCard(e) {
  e.preventDefault();
  if (input.value.length === 0) {
    if (lockBtn) return;
    console.log("salut");
    lockBtn = true;
    errorMsg.classList.add("active");
    errorMsg.textContent = "Notez quelque chose à faire !";
    setTimeout(() => {
      errorMsg.classList.remove("active");
      errorMsg.textContent = "";
      lockBtn = false;
    }, 2000);
    return;
  }
  errorMsg.textContent = "";
  const card = document.createElement("div");
  card.classList.add("todo-items");
  card.textContent = input.value;

  const thing = document.createElement("div");
  thing.classList.add("thing-todo");

  const groupBtn = document.createElement("div");
  groupBtn.classList.add("group-btn-todo");

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-things");
  doneBtn.textContent = "";

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-things");
  removeBtn.textContent = "";

  groupBtn.appendChild(doneBtn);
  groupBtn.appendChild(removeBtn);
  card.appendChild(thing);
  card.appendChild(groupBtn);
  todoContainer.appendChild(card);
  let lsArray;

  addLocalStorage(input.value);
  input.value = "";
}

todoContainer.addEventListener("click", makeItemDone);

function makeItemDone(e) {
  const item = e.target;
  console.log(item);
  if (item.classList[0] === "remove-things") {
    item.parentElement.parentElement.remove();
  } else if (item.classList[0] === "done-things") {
    const parent = item.closest(".todo-items");
    parent.classList.toggle("done");
  }
}

function addLocalStorage(data) {
  let todos;
  if (!localStorage.getItem("todos")) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(data);
  localStorage.setItem("todos", JSON.stringify(todos));
}
