const menu = document.querySelector('.menu');
const right=document.querySelector(".right");

menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    right.classList.toggle("activeRight")
})