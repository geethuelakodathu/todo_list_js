// Select elements
const addTaskBtn = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


// Add Task
addTaskBtn.addEventListener("click", function(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    // create li
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // task text
    const span = document.createElement("span");
    span.innerText = taskText;


    
    span.addEventListener("click", function(){
        span.classList.toggle("completed");
    });

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", function(){
        li.remove();
    });


    // append elements
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // clear input
    taskInput.value = "";
});