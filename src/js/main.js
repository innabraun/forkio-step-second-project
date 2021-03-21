const menu = document.querySelector('.menu');
const right=document.querySelector(".right__mobile");
const mobile=document.querySelector(".mobile");

menu.addEventListener('click', () => {
    menu.classList.toggle('active')
    right.classList.toggle("activeRight")
    mobile.classList.toggle("flexColumn")
})