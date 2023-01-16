//-----TOGGLE MODE-------// 
const toggleSwitch = document.querySelector(".theme-switch-wrapper")
const body = document.querySelector("body")
const themeIcon = document.querySelector("#icon")
const headerImg = document.querySelector("#hero")


function setTheme() {
    darkMode() 
}

function setHeaderImg() {
    if (body.getAttribute("data-theme") === "dark") {
        headerImg.setAttribute("src", "images/bg-mobile-dark.jpg")
    } else {
        headerImg.setAttribute("src", "images/bg-mobile-light.jpg")
    }
}



function darkMode() {
    // Check what is the current theme and get the opposite one
    let targetTheme = body.getAttribute('data-theme') === 'dark'
    ? 'light' 
    : 'dark';
    let targetIcon = themeIcon.getAttribute("src") === "images/icon-moon.svg" 
    ? "images/icon-sun.svg"
    : "images/icon-moon.svg"
    body.setAttribute('data-theme', targetTheme); // Set the attribute 'data-theme' to the targetTheme
    themeIcon.setAttribute("src",targetIcon)
    localStorage.setItem('theme', targetTheme); // Save the targetTheme to the localstorage
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
        bindRemove(toDo.querySelector(".remove"))
        bindDone(toDo.querySelector(".checkBtn"))
        noTasksNote();
        updateTaskCount();
    }
}

//bind remove and done functions to the buttons 


const bindRemove = (btn) => {
    btn.addEventListener("click", () => {
        const mainPar = btn.parentElement
        mainPar.remove()
        tasks.pop()
        noTasksNote()
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
            tasks.pop();
            updateTaskCount();
        }
    }
    noTasksNote();
})


//---- HANDLE ITEMS LEFT-----//

const itemsLeft = document.querySelector("#items-left")



let updateTaskCount = () => {
    let activeTasks = tasks.filter((task)=> {
     console.log(tasks[task].classList)
    })
    console.log(activeTasks)
    itemsLeft.textContent = `${activeTasks.length} items left`
}

const noTasksNote = () => {
    noTasksLeft.style.display = tasks.length === 0
    ? "block" 
    : "none"
}


//HANDLE COMPLETED

// add a commpleted class to the task, 
//if user clicks on "completed", show only completed tasks (display.none method)
// !=completed, show the task 


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
    if (attr === "all") {
        tasks.forEach((task) => task.style.display = "flex")
    } else if (attr === "completed") {
        tasks.forEach((task) => task.style.display = "none")
        completedTasks.forEach((task) => task.style.display = "flex")
    } else if (attr === "active") {
        tasks.forEach((task) => task.classList.contains("completed") ? task.style.display = "none" : task.style.display = "flex")
 }}