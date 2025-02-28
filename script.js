console.log("JavaScript imported");

const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("tasksList");
const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", function(event){
    console.log("Form submitted");
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    
    const taskLabel = document.createElement("label");
    taskLabel.classList.add("taskLabel");
    taskLabel.innerText = taskText;

    const taskActions = document.createElement("div");
    taskActions.classList.add("taskActions");

    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("editTaskBtn");
    editTaskBtn.innerHTML = `<i class="fa-solid fa-pen-to-square fa-xl" style="color: #f25f4c;"></i>`;

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("deleteTaskBtn");
    deleteTaskBtn.innerHTML = `<i class="fa-solid fa-trash fa-xl" style="color: #e53170;"></i>`;

    taskActions.appendChild(editTaskBtn);
    taskActions.appendChild(deleteTaskBtn);

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(taskActions);

    tasksList.appendChild(taskItem);

    taskInput.value = "";
});

tasksList.addEventListener("click", function(event){
    if(event.target.closest(".deleteTaskBtn")){
        console.log("Deleting task...");
        const taskItem = event.target.closest(".taskItem");
        taskItem.classList.add("removed"); // Apply animation
        setTimeout(() => {
            taskItem.remove();
            saveTasksToLocalStorage();
        }, 300); 
    }
    
    if(event.target.closest(".editTaskBtn")){
        console.log("Editing...");

        const taskItem = event.target.closest(".taskItem");
        const taskLabel = taskItem.querySelector(".taskLabel");

        if (!taskLabel) return;

        const originalText = taskLabel.innerText;

        const editInput = document.createElement("input");
        editInput.classList.add("editInput");
        editInput.type = "text";
        editInput.value = originalText;

        taskItem.replaceChild(editInput, taskLabel);
        editInput.focus();

        function saveEdit(){
            const newText = editInput.value.trim();
            if(newText !== ""){
                taskLabel.innerText = newText;
            } else {
                taskLabel.innerText = originalText;
            }
            taskItem.replaceChild(taskLabel, editInput);
        }

        editInput.addEventListener("blur", saveEdit);
        editInput.addEventListener("keypress", function(event){
            if(event.key === "Enter"){
                saveEdit();
            }
        });
    }
});

tasksList.addEventListener("change", function(event){
    if(event.target.type === "checkbox"){
        const taskItem = event.target.closest("taskItem");
        taskItem.classList.toggle("completed");
        saveTaskTOLocalStorage();
        console.log("ticked.....");
    }
});

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".taskItem").forEach(task => {
        tasks.push({
            text: task.querySelector(".taskLabel").innerText,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("taskItem");
        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        if (task.completed) {
            taskCheckbox.checked = true;
        }

        const taskLabel = document.createElement("label");
        taskLabel.classList.add("taskLabel");
        taskLabel.innerText = task.text;

        const taskActions = document.createElement("div");
        taskActions.classList.add("taskActions");

        const editTaskBtn = document.createElement("button");
        editTaskBtn.classList.add("editTaskBtn");
        editTaskBtn.innerHTML = `<i class="fa-solid fa-pen-to-square fa-xl" style="color: #f25f4c;"></i>`;

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.classList.add("deleteTaskBtn");
        deleteTaskBtn.innerHTML = `<i class="fa-solid fa-trash fa-xl" style="color: #e53170;"></i>`;

        taskActions.appendChild(editTaskBtn);
        taskActions.appendChild(deleteTaskBtn);

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(taskActions);

        tasksList.appendChild(taskItem);
    });
}

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
