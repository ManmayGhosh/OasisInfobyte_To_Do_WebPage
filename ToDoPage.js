const inputField = document.querySelector(".input-field textarea");
const todoLists = document.querySelector(".todoLists");
const pendingnum = document.querySelector(".pending-num");
const clearbutton= document.querySelector(".clear-button");

const listContainer = document.getElementById("list_container");

function allTasks(){
    let tasks = document.querySelectorAll(".pending");
    pendingnum.textContent = tasks.length ===0 ? "no " : tasks.length;

    let allLists = document.querySelectorAll(".list");
    if(allLists.length > 0){
        todoLists.style.marginTop = "20px";
        clearbutton.style.pointerEvents = "auto";
        return;
    }
    todoLists.style.marginTop = "0px";
    clearbutton.style.pointerEvents = "none";
}

inputField.addEventListener("keyup",(e) =>{
    let inputvalue = inputField.value.trim();
    if(e.key ==="Enter" && inputvalue.length > 0)
    {
        let liTag =`<li class="list pending" onclick="handleStatus(this)">
            <input type="checkbox" />
            <span class="task">${inputvalue}</span>
            <i class="uil uil-trash" onclick="deleteTask(this)"></i>
            </li>`;
        todoLists.insertAdjacentHTML("beforeend",liTag);    
        inputField.value = "";
        saveData();
        allTasks();
    }
});

function deleteTask(e){
    e.parentElement.remove();
    saveData();
    allTasks();
}

function handleStatus(e){
    const checkbox = e.querySelector("input");
    checkbox.checked =checkbox.checked ? false : true;
    e.classList.toggle("pending");
    allTasks();
    saveData();
}


clearbutton.addEventListener("click",() =>{
    todoLists.innerHTML = "";
    saveData();
    allTasks();
});

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();