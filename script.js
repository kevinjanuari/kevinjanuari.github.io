const body = document.body;
document.addEventListener('mousemove', function(e) {
    const width = body.clientWidth;
    const height = body.clientHeight;
    const offsetX = Math.floor(e.pageX/width*100);
    const offsetY = Math.floor(e.pageY/height*100);
    const one = 65-(offsetY/2);
    const two = offsetY;
    const hue = Math.floor(offsetX/100*360);
    body.style = `--hue:${hue}deg;--one:${Math.floor(one)}%;--two:${Math.floor(two)}%;--left:${Math.floor(e.pageX)}px;--top:${Math.floor(e.pageY)}px`;
});
document.addEventListener('touchmove', function(ev) {
    const e = ev.changedTouches[0];
    const width = body.clientWidth;
    const height = body.clientHeight;
    const offsetX = Math.floor(e.pageX/width*100);
    const offsetY = Math.floor(e.pageY/height*100);
    const one = 65-(offsetY/2);
    const two = offsetY;
    const hue = Math.floor(offsetX/100*360);
    body.style = `--hue:${hue}deg;--one:${Math.floor(one)}%;--two:${Math.floor(two)}%;--left:${Math.floor(e.pageX)}px;--top:${Math.floor(e.pageY)}px`;
});

document.addEventListener('click', function(e) {
    const click = document.createElement('div');
    click.classList.add('click-motion');
    click.style = `top:${(e.pageY-35)}px;left:${(e.pageX-35)}px`;
    body.appendChild(click);
    setTimeout(() => {
        click.classList.add("show");
        setTimeout(() => {
            click.remove();
        }, 2000);
    });
});

function createRipple() {
    const width = Math.floor(Math.random()*(body.clientWidth-100));
    const height = Math.floor(Math.random()*(body.clientHeight-100));
    const click = document.createElement('div');
    click.classList.add('click-motion');
    click.style = `top:${height}px;left:${width}px`;
    body.appendChild(click);
    setTimeout(() => {
        click.classList.add("show");
        setTimeout(() => {
            click.remove();
        }, 2000);
    });
}

const bgText = document.querySelector('.texteditable');
const textWrap = document.querySelector('.text-wrap');
const textAll = document.querySelectorAll('.text');
const firstMenu = document.querySelector('.menu-inner');
const menus = document.querySelectorAll('.menu-inner');
menus.forEach(menu => {
    menu.addEventListener('click', function() {
        textWrap.style = `--height:0px`;
        bgText.classList.remove('active');
        menus.forEach(men => {
            men.classList.remove('active');
        });
        menu.classList.add('active');
        textAll.forEach(text => {
            text.classList.remove('active');
            if (text.getAttribute('data-page') === menu.textContent.toLowerCase().trim()) {
                textWrap.style = `--height:${text.children[0].offsetHeight}px`;
                setTimeout(() => {
                    text.classList.add('active');
                    if (menu.textContent.trim() == 'Home') bgText.children[0].textContent = '';
                    else {
                        bgText.children[0].textContent = menu.textContent.trim();
                        bgText.classList.add('active');
                    }
                }, 1000);
            }
        });
    });
});

let battery = 100;
let batteryInterval;
const batteryWrap = document.querySelector('.battery-wrap');
const batteryValue = document.querySelector('.battery-value');
const batteryAlt = document.querySelector('.battery-alt');
const gelap = document.querySelector('.gelap');
function batteryDecrease() {
    batteryWrap.style = `--battery:${100-(battery)}%`;
    batteryValue.textContent = `${battery--}%`;
    if (battery < 0) {
        clearInterval(batteryInterval);
        gelap.classList.add('active');
    }
    if (battery <= 20) batteryAlt.classList.add('active');
}

batteryWrap.addEventListener('click', () => {
    battery = 100;
    batteryWrap.style = `--battery:0%`;
    batteryValue.textContent = `100%`;
    batteryAlt.classList.remove('active');
    gelap.classList.remove('active');
    clearInterval(batteryInterval);
    batteryInterval = setInterval(batteryDecrease, 1000);
});

document.addEventListener('DOMContentLoaded', (e) => {
	document.getElementById('preloader').classList.add('loaded');
	setTimeout(function(){
        document.getElementById('preloader').remove();
        firstMenu.click();
        setInterval(createRipple, 1000);
        batteryInterval = setInterval(batteryDecrease, 1000);
    }, 2000);
    console.log('%c>.<', 'color: green; background: yellow; font-size:50px');
});

document.querySelector('.mobile-button').addEventListener('click', function() {
    const mobileHelp = document.querySelector('.mobile-help');
    mobileHelp.classList.add('fade');
    mobileHelp.addEventListener("transitionend", () => {
        mobileHelp.remove();
    })
})