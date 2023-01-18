//-----TOGGLE MODE-------// 
const toggleSwitch = document.querySelector(".theme-switch-wrapper")
const body = document.querySelector("body")
const themeIcon = document.querySelector("#icon")
const headerImg = document.querySelector("#hero")

// Use localStorage.getItem('theme') to check the current theme on page load. This way, if the user has previously selected a theme, it will be persisted upon refresh.

const currentTheme = localStorage.getItem("theme") || "light"; 
body.setAttribute("data-theme", currentTheme)


function setTheme() {
    darkMode() 
    setHeaderImg()
}

function setHeaderImg() {
    if (body.getAttribute("data-theme") === "dark") {
        headerImg.setAttribute("src", "images/bg-mobile-dark.jpg")
    } else {
        headerImg.setAttribute("src", "images/bg-mobile-light.jpg")
    }
}

function darkMode() {
    body.setAttribute('data-theme', (body.getAttribute('data-theme') === 'dark') ? 'light' : 'dark');
    themeIcon.setAttribute("src", (themeIcon.getAttribute("src") === "images/icon-moon.svg") 
    ? "images/icon-sun.svg"
    : "images/icon-moon.svg"
    );
    localStorage.setItem('theme', body.getAttribute('data-theme'));
}

toggleSwitch.addEventListener("click",setTheme)


// ----HANDLE TO DO INPUT ---- //
const list = document.querySelector(".list")
const toDoText = document.querySelector(".todo-text")
let doneBtns = document.querySelectorAll(".checkBtn")
const noTasksLeft = document.querySelector("#noTasksLeft")
const remove = document.querySelectorAll(".remove")

let tasks = [];
let completedTasks = [];

toDoText.addEventListener("change", createToDo)

//CREATE TODO 
function createToDo(e) {
    let toDoVal = e.target.value
    if (toDoVal == null || toDoVal == " ") {
        alert("Please enter a task")
    } else {
        const toDo = document.createElement("li")
        toDo.classList.add("task")
        toDo.innerHTML += `
                <button class="checkBtn">          
                    <img 
                    id="checkIcon" 
                    src="images/icon-check.svg" 
                    alt="check-icon"/>
                </button>
                <span class="toDoText break-word">${toDoVal}</span>
                <img alt="remove" class="remove" src="images/icon-cross.svg">
                `
        list.appendChild(toDo)
        e.target.value = ""
        tasks.push(toDo)
        bindRemove(toDo.querySelector(".remove"))
        bindDone(toDo.querySelector(".checkBtn"))
        updateTaskCount();
        addDragandDrop(toDo);

    }
}

//bind remove and done functions to the buttons 


const bindRemove = (btn) => {
    btn.addEventListener("click", () => {
        const mainPar = btn.parentElement
        mainPar.remove()
        tasks.pop(mainPar)
        completedTasks.pop(mainPar)
        updateTaskCount();
    })
}

const bindDone = (btn) => {
    const checkIcon = btn.querySelector("#checkIcon")
    btn.addEventListener("click", () => {
        const mainPar = btn.parentElement
        btn.classList.toggle("checked")
        checkIcon.style.display = "block"
        mainPar.classList.toggle("completed")
        mainPar.classList.contains("completed") 
        ? completedTasks.push(mainPar) 
        : completedTasks.pop(mainPar)
        updateTaskCount();

    })
}

remove.forEach(bindRemove)
doneBtns.forEach(bindDone)

//HANDLE COMPLETED TASKS 

const clearComplete = document.querySelector("#clr-completed")

clearComplete.addEventListener("click", () => {
    const allTasks = document.querySelectorAll(".task")
    for (let task of allTasks) {
        if (task.classList.contains("completed")) {
            task.remove()
            tasks.pop(task);
            completedTasks.pop(task)
            updateTaskCount();
        }
    }})


//---- HANDLE ITEMS LEFT-----//

const itemsLeft = document.querySelector("#items-left")

const updateTaskCount = () => {
    let activeTasks = tasks.length - completedTasks.length
    itemsLeft.textContent = `${activeTasks} items left`
    noTasksLeft.style.display = tasks.length === 0
    ? "block" 
    : "none"
}

//HANDLE FILTER TASKS
const category = document.querySelectorAll(".category")

for (let cat of category ){ 
    cat.addEventListener("click", (e) => {
        let attr = e.target.id
        if (attr === cat.id) {
            updateUI();
            cat.classList.add("active")
            showCat(attr);
        }
    })
}

function updateUI() {
    category.forEach((cat) => cat.classList.remove("active"))
}

function showCat(attr) {
    tasks.forEach((task) => {
        if (attr === "all") {
            task.style.display = "flex"
        } else if (attr === "active") {
            task.classList.contains("completed")
            ? task.style.display = "none"
            : task.style.display = "flex"
        } else if (attr === "completed") {
            task.classList.contains("completed") 
            ? task.style.display = "flex"
            : task.style.display = "none" 
        }
    })
}


// DRAGGABLE

// tasks
let items = document.querySelectorAll(".list > li")

function addDragandDrop(task) {
    task.setAttribute("draggable", true)
    task.addEventListener('dragstart', dragStart)
    // task.addEventListener('drop', dropped)
    task.addEventListener('dragenter', cancelDefault)
    task.addEventListener('dragover', cancelDefault)
}

list.addEventListener("drop", (e) => {
    if(e.target.classList.contains("task")){
        cancelDefault(e);
        let oldIndex = e.dataTransfer.getData('text/plain');
        let target = e.target;
        let newIndex = Array.prototype.indexOf.call(target.parentNode.childNodes, target);

        let parent = e.target.parentNode;
        let children = parent.children;
        let dropped = children[oldIndex];
        parent.removeChild(dropped);
        tasks.splice(oldIndex, 1);
        tasks.splice(newIndex, 0, dropped);

        if (newIndex < oldIndex) {
            parent.insertBefore(dropped, target);
        } else {
            parent.insertBefore(dropped, target.nextSibling);
        }
    }
});

list.addEventListener("dragenter", cancelDefault);
list.addEventListener("dragover", cancelDefault);

items.forEach(item=>{addDragandDrop(item)})

function dragStart (e) {
let index = tasks.indexOf(e.target)
    e.dataTransfer.setData('text/plain', index)
}

// function dropped (e) {

// }

function cancelDefault (e) {
    e.preventDefault()
    e.stopPropagation()
    return false
}
