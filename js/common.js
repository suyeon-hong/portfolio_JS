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
const gnb_lis = document.querySelectorAll(" #gnb >li");

gnb_lis.forEach(gnb_li=>{
    const len = gnb_li.querySelectorAll("a").length;

    gnb_li.addEventListener("mouseenter", e=>{
        e.currentTarget.querySelector(".sub").style.display = "block";
    })
    gnb_li.addEventListener("mouseleave", e=>{
        e.currentTarget.querySelector(".sub").style.display = "none";
    })
    gnb_li.querySelector("a").addEventListener("focusin", e=>{
        e.currentTarget.parentElement.querySelector(".sub").style.display = "block";
    })
    gnb_li.querySelectorAll("a")[len-1].addEventListener("focusout", ()=>{
        for(let li of gnb_lis){
            li.querySelector(".sub").style.display = "none";
        }
    })
});
