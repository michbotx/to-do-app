

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
