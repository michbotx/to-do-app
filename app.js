

//-----TOGGLE MODE-------// 
const toggleSwitch = document.querySelector(".theme-switch-wrapper")
const body = document.querySelector("body")
const themeIcon = document.querySelector("#icon")
const headerImg = document.querySelector("#hero")

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




// ----HANDLE INPUT ---- //

const toDoText = document.querySelector(".todo-text")
const toDoContainer = document.querySelector(".tasksList")
toDoText.addEventListener("change", createToDo)
const toDoButtons = document.querySelectorAll(".checkBtn")
const tasks = document.querySelectorAll(".task")
const noTasksLeft = document.querySelector("#noTasksLeft")

function createToDo(e) {
    let newToDo = e.target.value
    toDoContainer.innerHTML += `
    <div class="task"}>
    <div>
      <button class="checkBtn">          
        <img 
          id="checkIcon" 
          src="/images/icon-check.svg" 
          alt="check-icon">
        </button>
        <span class="toDoText">${newToDo}</span>
    </div>  
    <img alt="deleteBtn" class="deleteBtn" src="images/icon-cross.svg">
  </div>
   `
    e.target.value = ""
    toDoCheck();
}

function toDoCheck() {
    let toDoCount
    for (button of toDoButtons) {
        button.checked ? toDoCount++ : toDoCount
    }
    noTasksNote() 

}

// STRIKE THROUGH IF COMPLETE



//REMOVE IF CLICKED
let deleteBtns = document.querySelectorAll(".deleteBtn")

toDoContainer.addEventListener("click", (e) => {
    if(e.target.classList.value === "deleteBtn") {
        e.target.parentNode.remove() 
    }
    console.log(tasks.length)
})

function noTasksNote() {
    noTasksLeft.style.display = tasks.length >= 1 ?  "block" : "none"
}


// STRIKE THROUGH IF COMPLETE

