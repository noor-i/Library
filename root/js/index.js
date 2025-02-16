// This function drops the sidebar menu and hides the navigation bar
const barLogo = document.querySelector('.bar-logo');
const navBar = document.querySelector('.links');
const sideBar = document.querySelector('.sidebar');

function dropSidebar() {
    navBar.style.display = 'none';
    sideBar.style.display = 'flex';
}
barLogo.addEventListener("click", dropSidebar);

// This function closes the sidebar menu 
const exitLogo = document.querySelector('.exit-logo');

function closeSidebar() {
    sideBar.style.display = 'none';
    navBar.style.display = 'flex';
}
exitLogo.addEventListener("click", closeSidebar);

// Background particle floaters animation code
particlesJS.load('particles-js', '../assets/particlesjs-config.json', function() {
    console.log('particles.js loaded - callback');
});