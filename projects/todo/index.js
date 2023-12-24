
const todoInput = document.querySelector('.todo_inp');
const todobutton = document.querySelector('.todo_button');
const todoitem  = document.querySelector('.todo_item');
const filterOption  = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded',getTodo);
todobutton.addEventListener('click',addInput);
todoitem.addEventListener('click',checkDel);
filterOption.addEventListener('change',filterTodo);



function addInput(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todos");

    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value ;
    newTodo.classList.add("todo-units");
    todoDiv.appendChild(newTodo);
    
    saveTodo(todoInput.value);
    todoInput.value ="";
    const CompleteButton = document.createElement("button");
    CompleteButton.innerHTML = '<i class = "fa-solid fa-check"></i>';
    CompleteButton.classList.add("comp-button");
    todoDiv.appendChild(CompleteButton);

    const DelButton = document.createElement("button");
    DelButton.innerHTML = '<i class = "fa-solid fa-trash"></i>';
    DelButton.classList.add("Del-button");
    todoDiv.appendChild(DelButton);
    todoitem.appendChild(todoDiv);
    
    
};

function checkDel(event){
    const item = event.target
    if(item.classList[0] === 'Del-button'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        delTodo(todo);
        todo.addEventListener('transitionend',(()=>{
            todo.remove();
        }));
        // todo.remove();
    }
    if(item.classList[0] === 'comp-button'){
        const todo = item.parentElement
        todo.classList.toggle("completed");
    }
};

function filterTodo(e) {
    const todos = todoitem.children; 
    Array.from(todos).forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "incomplete":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }

  function saveTodo(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
      todos = [];

    }else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    // console.log(localStorage.children[0]);
  }
;

function getTodo(){
  let todos;
    if(localStorage.getItem("todos")=== null){
      todos = [];

    }else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    localStorage.setItem("todos",JSON.stringify(todos));
  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todos");

    const newTodo = document.createElement("li")
    newTodo.innerText = todo;
    newTodo.classList.add("todo-units");
    todoDiv.appendChild(newTodo);
  
    const CompleteButton = document.createElement("button");
    CompleteButton.innerHTML = '<i class = "fa-solid fa-check"></i>';
    CompleteButton.classList.add("comp-button");
    todoDiv.appendChild(CompleteButton);

    const DelButton = document.createElement("button");
    DelButton.innerHTML = '<i class = "fa-solid fa-trash"></i>';
    DelButton.classList.add("Del-button");
    todoDiv.appendChild(DelButton);
    todoitem.appendChild(todoDiv);

  })
};
function delTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
