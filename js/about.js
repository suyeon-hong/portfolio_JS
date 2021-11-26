// projects 더보기 버튼
const $projectBtn = $(".about .projects .btnMore");
const $moreClose = $(".about .projects .btnClose");

$projectBtn.on("click", function(e){
    e.preventDefault();

    $(".about .projects .swiper").addClass("on");
});
$moreClose.on("click", function(e){
    e.preventDefault();

    $(".about .projects .swiper").removeClass("on");
});

let swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// team 더보기버튼
const $teamBtn = $(".about .team .btnMore");
const $orgClose = $(".about .team .orgchart .close");

$teamBtn.on("click", function(e){
    e.preventDefault();

    $(".team .orgchart").addClass("on");
});

$orgClose.on("click", function(e){
    e.preventDefault();

    $(".team .orgchart").removeClass("on");
});

//news 더보기버튼
const $newsBtn = $(".news .btnMore");
const $newsClose = $(".news .btnClose");

$newsBtn.on("click", function(e){
    e.preventDefault();

    $(".news .more").addClass("on");
});
$newsClose.on("click", function(e){
    e.preventDefault();

    $(".news .more").removeClass("on");
});

let swiper2 = new Swiper(".mySwiper2", {
    effect: "cards",
    grabCursor: true,
    loop: true,
});