// community tabs 버튼
const $tabs = $(".community .tabs li a");

$tabs.on("click", function(e){
    e.preventDefault();

    $tabs.removeClass("on");
    $(this).addClass("on");
});

// community pagination
const $faqBtns = $(".community #faq .numbers span");
const $noticeBtns = $(".community #notice .numbers span");

$faqBtns.on("click", function(e){
    e.preventDefault();

    $faqBtns.removeClass("on");
    $(this).addClass("on");
});

$noticeBtns.on("click", function(e){
    e.preventDefault();

    $noticeBtns.removeClass("on");
    $(this).addClass("on");
});
