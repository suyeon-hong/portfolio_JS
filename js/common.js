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
const gnb_lis = gnb.querySelectorAll("li");

gnb_lis.forEach((gnb_li,index)=>{
    gnb_li.addEventListener("mouseenter", e=>{
        e.currentTarget.querySelector(".sub").style.display = "block";
    })
    gnb_li.addEventListener("mouseleave", e=>{
        e.currentTarget.querySelector(".sub").style.display = "none";
    })
    // gnb_li.querySelector("a").addEventListener("focusin", e=>{
    //     e.currentTarget.querySelector(".sub").style.display = "block";
    // })
    // gnb_li.querySelector("a").lastElementChild.addEventListener("focusout", e=>{
    //     e.currentTarget.querySelector(".sub").style.display = "none";
    // })
});

// 자바스크립트로 수정해야함!!
// $("#gnb>li").each(function(index){
//     $("#gnb>li").eq(index).find("a").on("focusin", function(){
//         $("#gnb>li").eq(index).find(".sub").show();
//     })
//     $("#gnb>li").eq(index).find("a").last().on("focusout", function(){
//         $("#gnb>li").eq(index).find(".sub").hide();
//     })
// });
