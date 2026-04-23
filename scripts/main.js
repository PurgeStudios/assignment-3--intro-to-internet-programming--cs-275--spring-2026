const body = document.querySelector(`body`);
let menus = document.getElementById(`menu-lists`);
let navigation = document.getElementById(`animated`);
let show_menu = document.getElementById(`js-triggers-menu`);
let show_modal = document.getElementById(`js-triggers-modal`);
let modal_background = document.getElementById(`modal-panel`);

show_menu.addEventListener(`click`, toggle_menu);
show_modal.addEventListener(`click`, toggle_modal);
modal_background.addEventListener(`click`, toggle_modal_off);
window.addEventListener(`resize`, adjust_layout);

function adjust_layout() {
    modal_background.style.height = visualViewport.height + `px`;

    if(window.innerWidth >= 736){
        menus.innerHTML =`<a id="menu-list-one" href="#">Menu 1</a><a id="menu-list-two" href="#">Menu 2</a>`;
    }
    else {
        menus.innerHTML = `<a id="menu-list-one" href="#">Menu 1</a><br><a id="menu-list-two" href="#">Menu 2</a>`;
    }
}

adjust_layout();

function toggle_menu() {
    if(visualViewport.width > 736) {
        navigation.style.transitionProperty = `top`;
        navigation.style.transitionDuration = `1.5s`;
        navigation.style.transitionBehavior = `cubic-bezier(0.25, 1, 0.5, 1)`;
        navigation.classList.toggle(`shift_vertical`);
    }
    else {
        navigation.style.transitionProperty = `left`;
        navigation.style.transitionDuration = `1.5s`;
        navigation.style.transitionBehavior = `cubic-bezier(0.25, 1, 0.5, 1)`;
        navigation.classList.toggle(`shift_horizontal`);
    }
}
let box = modal_background.children[0];

function toggle_modal() {

    modal_background.style.display = `block`;
    box.style.display = `block`;
}

function toggle_modal_off() {
    modal_background.style.display = `none`;
}

const script = document.createElement(`script`);
script.setAttribute(`src`, `scripts/main.js`);
body.appendChild(script);
