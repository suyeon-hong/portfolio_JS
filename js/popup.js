// cookie popup
const $popup = $("#popup");
const $popup_close = $popup.find(".close");
const $delCookie = $(".delCookie");
let isCookie = document.cookie.indexOf("popup=done");

if(isCookie == 0){
    $popup.hide();
}else{
    $popup.show();
}

$popup_close.on("click", function(e){
    e.preventDefault();

    let isChecked = $popup.find("input[type=checkbox]").is(":checked");

    if(isChecked) setCookie(1);
    $popup.hide();
});

$delCookie.on("click", function(e){
    e.preventDefault();

    setCookie(0);
    alert("쿠키삭제완료");
});

$("#popup label").on("click", function(){
    $(this).toggleClass("on");
});

function setCookie(time){
    let today = new Date();
    let date = today.getDate();
    
    today.setDate(date + time);

    let duedate = today.toGMTString();

    document.cookie = "popup=done; expires=" + duedate;
}

//swiper
let swiper = new Swiper(".swiper", {
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});