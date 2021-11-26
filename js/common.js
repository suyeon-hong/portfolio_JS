let speed = 1000;

// btnMo button
const btnMo = document.querySelector(".btnMo");
const gnbMo = document.querySelector(".gnbMo");
const gnb = document.querySelector("#gnb");

btnMo.addEventListener("click", e=>{
    e.preventDefault();

    btnMo.classList.toggle("on");
    gnbMo.classList.toggle("on");
});

// gnbMo tabmenu
const gnbMo_tabs = gnbMo.querySelectorAll(".arrow");
const gnbMo_boxs = gnbMo.querySelectorAll("ul li ul");

for(let i=0; i<gnbMo_tabs.length; i++){
    gnbMo_tabs[i].addEventListener("click", ()=>{
        gnbMo_tabs[i].classList.toggle("on");
        gnbMo_boxs[i].classList.toggle("on");
    });
}

// gnb 2depth menu
$("#gnb>li").on("mouseenter", function(){
    $(this).find(".sub").show();
});

$("#gnb>li").on("mouseleave", function(){
    $(this).find(".sub").hide();
});

$("#gnb>li").each(function(index){
    $("#gnb>li").eq(index).find("a").on("focusin", function(){
        $("#gnb>li").eq(index).find(".sub").show();
    })
    $("#gnb>li").eq(index).find("a").last().on("focusout", function(){
        $("#gnb>li").eq(index).find(".sub").hide();
    })
});

function activeBtn(item, index){
    item.removeClass("on");
    item.eq(index).addClass("on");
}