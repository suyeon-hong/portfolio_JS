class Visual{
    constructor(){
        this.initDOM();
        this.init();
        this.bindingEvent();
    }
    initDOM(){
        this.visual = document.querySelector("#visual");
        this.letter1 = this.visual.querySelector(".inner >h1");
        this.letter2 = this.visual.querySelector(".inner >h2");
        this.wrap = this.visual.querySelectorAll(".wrapbox >.wrap");
        this.section = this.visual.querySelectorAll(".wrapbox section");
        this.back = this.visual.querySelectorAll("section .back");
        this.btns = this.visual.querySelectorAll(".filter li");
        this.enableClick = true;
        this.i=0;
        this.timer;
    }
    init(){
        this.wrap[0].classList.add("on");
    
        setTimeout(()=>{
            for(let el of this.back){
                el.style.display = "none";
            }
        },2000);
    
        this.timer = setInterval(()=>{
            (this.i >= 2) ? this.i=0 : this.i++;
            this.reverse(this.i)
        }, 4000);
    }
    bindingEvent(){
        this.letterMotion(this.letter1, 0.1);
        this.letterMotion(this.letter2, 0.2);

        this.btns.forEach((btn,index)=>{
            btn.addEventListener("click", e=>{
                e.preventDefault();
    
                let isActive = btn.classList.contains("on");
                if(isActive) return;
    
                if(this.enableClick){
                    this.enableClick = false;
                    clearInterval(this.timer);
                    this.reverse(index);
                }
            })
        });
    }
    letterMotion(item, delay){
        let txt = item.innerText;
        let bg = getComputedStyle(item).color;
        let num = 0;
        let letters = "";
    
        item.innerHTML = "";
    
        for(let el of txt){
            letters += `
                <span style="transition-delay: ${delay * num}s">${el}</span>
            `;
            num++;
        }
        letters += `<p style="background=${bg}"></p>`
        item.innerHTML = letters;
    
        new Anim(item.querySelector("p"),{
            prop: "left",
            value: "100%",
            duration: 1000
        });
        for(let el of item.querySelectorAll("span")){
            el.style.opacity = 1;
        }
    }
    reverse(index){
        this.activeBtn(this.btns, index);
        this.activeBtn(this.wrap, index);
    
        for(let el of this.back){
            el.style.display = "block";
        }
    
        setTimeout(()=>{
            for(let el of this.back){
                el.style.display = "none";
            }
            this.enableClick = true;
        },2000);
    }
    activeBtn(item, index){
        for(let el of item) el.classList.remove("on");
        item[index].classList.add("on");
    }
}


const visual = document.querySelector("#visual");
const wrap = visual.querySelectorAll(".wrapbox >.wrap");
//visual detail page
const detail = visual.querySelector(".detail");
const btnClose = detail.querySelector(".close");
const imgs = visual.querySelectorAll(".wrapbox img");
const detail_img = detail.querySelector(".pic");
let imgPos = {};

wrap.forEach((item, index)=>{
    item.addEventListener("click", e=>{
        e.preventDefault();
        console.log(e.target);

        let target = e.target.closest("article").querySelector("img");
        if(e.target !== target) return;

        let imgSrc = e.target.getAttribute("src");
        let imgAlt = e.target.getAttribute("alt");
        let imgTop = e.target.offsetTop;
        let imgleft = e.target.offsetLeft;

        let tit1 = item.querySelector("h2").innerText;

        // let tit2 = wrap[boxIndex].querySelectorAll("section")[itemIndex].querySelector("h1").innerText;
        // let desc = wrap[boxIndex].querySelectorAll("section")[itemIndex].querySelector(".wrap p").innerText;
    })
});

/*
imgs.forEach((img,index)=>{
    img.addEventListener("click", e=>{
        e.preventDefault();
        let imgSrc = img.getAttribute("src");
        let imgAlt = img.getAttribute("alt");
        let imgTop = img.offsetTop;
        let imgleft = img.offsetLeft;
        // let itemIndex = wrap.indexOf(img.closest("section"));
        // let boxIndex = img.closest(".wrap").indexOf();

        let tit1 = wrap[index].querySelector("h2").innerText;
        let tit2 = wrap[boxIndex].querySelectorAll("section")[itemIndex].querySelector("h1").innerText;
        let desc = wrap[boxIndex].querySelectorAll("section")[itemIndex].querySelector(".wrap p").innerText;
        clearInterval(timer);

        detail_img.style.width = "250px";
        detail_img.style.height = "280px";
        detail_img.style.top = imgTop - 70;
        detail_img.style.left = imgleft;
        setTimeout(()=>{
            detail_img.style.width = "40vw";
            detail_img.style.height = "100%";
            detail_img.style.top = 0;
            detail_img.style.left = "10vw";
        }, 100);
        detail_img.querySelector("img").setAttribute("src") = imgSrc;
        detail_img.querySelector("img").setAttribute("alt") = imgAlt;
        detail_img.querySelector(".con >h1").innerText = tit1;
        detail_img.querySelector(".con >h2").innerText = tit2;
        detail_img.querySelector(".con p").innerText = desc;
        detail.classList.add("on");
    })
});

// $btnClose.on("click", function(e){
//     e.preventDefault();
    
//     $detail_img.css(imgPos);
//     $detail.removeClass("on");
//     $detail.fadeOut(1000);

//     timer = setInterval(function(){
//         (i >= 2) ? i=0 : i++;
//         reverse(i)
//     }, 4000);
// });

// // detail page date
// const $date = $detail.find(".date");
// const date = new Date();
// const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// $date.find("h1").text(date.getDate());
// $date.find("h2").text(day[date.getDay()]);
// $date.find("h3").text(month[date.getMonth()]);

*/