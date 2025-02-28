console.log("javascript imported");

const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("tasksList");
const taskForm = document.getElementById("taskForm");
const addtaskBtn = document.getElementById("addtaskBtn");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");
const editTastBtn = document.getElementById("editTaskBtn");

//preventing the refreshing of the page
taskForm.addEventListener("submit", function(event){
    console.log("form submittd");
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("please enter the task")
        return;
    }

    const taskItem = document.createElement("div");
    taskItem.classList.add("taskItem");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.id = "checkbox";
    
    const taskLabel = document.createElement("label");
    taskLabel.innerText = taskText;

    const taskActions = document.createElement("div");
    taskActions.classList.add("taskActions");

    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("editTaskBtn");
    editTaskBtn.innerHTML = `<i class="fa-solid fa-pen-to-square fa-xl" style="color: #f25f4c;"></i>`;

    const deleteTaskBtn = document.createElement("button");
deleteTaskBtn.classList.add("deleteTaskBtn"); // ✅ Add class
deleteTaskBtn.innerHTML = `<i class="fa-solid fa-trash fa-xl" style="color: #e53170;"></i>`;


    taskActions.appendChild(editTaskBtn);
    taskActions.appendChild(deleteTaskBtn);

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(taskActions);

    tasksList.appendChild(taskItem)

    taskInput.value = "";


});

tasksList.addEventListener("click", function(event){
    if(event.target.closest(".deleteTaskBtn")){
        console.log(event.target);
        event.target.closest(".taskItem").remove();
        }
        if(event.target.closest(".    editTaskBtn")){
        console.log("editting....")

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = taskLabel.innerText;
        editInput.classList.add("editInput");
    
        taskItem.replaceChild(editInput,     taskLabel);
        editInput.focus();

        function saveEdit(){
            const newText = editInput.value.    trim();
            if(newText != ""){
                taskLabel.innerText = newText;
            }
            taskItem.replaceChild(taskLabel,     editInput);
        }

        editInput.addEventListener("blur", saveEdit);
        editInput.addEventListener("keypress",         function(event) {
            if (event.key === "Enter") {
                saveEdit();
            }
        });

    }


});
