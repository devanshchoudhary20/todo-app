
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
    todoDiv.setAttribute("task-completed" , "false")
    let attr = todoDiv.getAttribute("task-completed");
    //check for empty text
    const newTodo = document.createElement("li")
    if((todoInput.value).length === 0) alert("You cannot do nothing🤪,Add some text before clicking add button")
    else {newTodo.innerText = todoInput.value ;
    newTodo.classList.add("todo-units");
    todoDiv.append(newTodo);
  
    
    //Adding buttons and attributes
    const CompleteButton = document.createElement("button");
    CompleteButton.innerHTML = '<i class = "fa-solid fa-check"></i>';
    CompleteButton.classList.add("comp-button");
    // CompleteButton.setAttribute("task-completed" , "false")
    todoDiv.appendChild(CompleteButton);

    const DelButton = document.createElement("button");
    DelButton.innerHTML = '<i class = "fa-solid fa-trash"></i>';
    DelButton.classList.add("Del-button");
    todoDiv.appendChild(DelButton);
    todoitem.appendChild(todoDiv);
    

    //saving the tood value and attribute
    saveTodo(todoInput.value,attr);
    todoInput.value ="";
    };
    
};

function checkDel(event) {
  const item = event.target;
  if (item.classList[0] === 'Del-button') {
      const todo = item.parentElement;
      todo.classList.add("fall");
      todo.addEventListener('transitionend', () => {
          delTodo(todo);
          todo.remove();
      });
  }
  if (item.classList[0] === 'comp-button') {
      const todo = item.parentElement;
      
      const Check = todo.getAttribute("task-completed") === "true";
      const newCompletedState = Check ? "false" : "true";
      // console.log(newCompletedState);
      todo.setAttribute("task-completed",newCompletedState);
      updateTodoState(todo,newCompletedState);
  }
};

function filterTodo(e) {
    const todos = todoitem.children; 
    Array.from(todos).forEach(function(todo) {
      const check = todo.querySelector('.comp-button').getAttribute("task-completed");
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (check === "true") {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "incomplete":
          if (!check) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    });
  }

  function saveTodo(todo, completed) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push({ text: todo, completed: completed });
    // console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}
;
function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todoObj) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todos");
      // console.log(todoObj);
      if(todoObj.completed) {
          todoDiv.classList.add("completed");
      }

      const newTodo = document.createElement("li")
      newTodo.innerText = todoObj.text;
      newTodo.classList.add("todo-units");
      todoDiv.setAttribute("task-completed",todoObj.completed)
      todoDiv.appendChild(newTodo);
    
      const CompleteButton = document.createElement("button");
      CompleteButton.innerHTML = '<i class = "fa-solid fa-check"></i>';
      CompleteButton.classList.add("comp-button");
      // CompleteButton.getAttribute("task-completed");
      todoDiv.appendChild(CompleteButton);

      const DelButton = document.createElement("button");
      DelButton.innerHTML = '<i class = "fa-solid fa-trash"></i>';
      DelButton.classList.add("Del-button");
      todoDiv.appendChild(DelButton);
      todoitem.appendChild(todoDiv);
  });
};
function delTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.querySelector(".todo-units").innerText; 
    const todoToRemove = todos.find(t => t.text === todoIndex);
    todos.splice(todos.indexOf(todoToRemove), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};
function updateTodoState(todoElement, isCompleted) {
  let todos = JSON.parse(localStorage.getItem("todos"));
    const todoText = todoElement.querySelector(".todo-units").innerText;
    const todoToUpdate = todos.find(todo => todo.text === todoText);
    if (todoToUpdate) {
        todoToUpdate.completed = isCompleted === "true"; 
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}
