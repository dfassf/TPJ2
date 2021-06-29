$(function () {

    $('#fullpage').fullpage({
        navigation: true,
        navigationPosition: 'right'
    });
})

function menu_on(){
    eee = document.querySelector(".three_bar");
    ddd = document.querySelector(".menu_container")
    ddd.style.display = "block"
}

function menu_out(){
    fff = document.querySelector(".x_bar");
    ggg = document.querySelector(".menu_container")
    ggg.style.display = "none"
}
