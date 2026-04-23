let menus = document.getElementById(`menu-lists`);
let navigation = document.getElementById(`animated`);
let show_menu = document.getElementById(`js-triggers-menu`);
// let show_modal = document.getElementById(`js-triggers-modal`);

menus.innerHTML =`<a id="menu-list-one" href="#">Menu 1</a><a id=
    "menu-list-two" href="#">Menu 2</a>`;

show_menu.addEventListener("click", toggle_menu);

function toggle_menu() {
    if(visualViewport.width > 736) {
        navigation.style.transitionProperty = `top`;
        navigation.style.transitionDuration = `2s`;
        navigation.style.transitionBehavior = `cubic-bezier(0.25, 1, 0.5, 1)`;
        navigation.classList.toggle("shift_vertical");
    }
    else {
        navigation.style.transitionProperty = `left`;
        navigation.style.transitionDuration = `1.5s`;
        navigation.style.transitionBehavior = `cubic-bezier(0.25, 1, 0.5, 1)`;
        navigation.classList.toggle("shift_horizontal");
    }
}
