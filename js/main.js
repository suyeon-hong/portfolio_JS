// visual letter motion
const visual = document.querySelector("#visual");
const letter1 = visual.querySelector(".inner >h1");
const letter2 = visual.querySelector(".inner >h2");

letterMotion(letter1, 0.1);
letterMotion(letter2, 0.2);

function letterMotion(item, delay){
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


// visual article motion

class Visual{
    constructor(){
        this.initDOM();
        this.init();
        this.bindingEvent();
    }
    initDOM(){
        this.wrap = visual.querySelectorAll(".wrapbox >.wrap");
        this.section = visual.querySelectorAll(".wrapbox section");
        this.back = visual.querySelectorAll("section .back");
        this.btns = visual.querySelectorAll(".filter li");
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















//visual detail page
const $detail = $(".detail");
const $btnClose = $detail.find(".close");
const $img = $wrap.find("img");
const $detail_img = $detail.find(".pic");
let imgPos;

$img.on("click", function(e){
    e.preventDefault();
    let imgSrc = $(this).attr("src");
    let imgAlt = $(this).attr("alt");
    let imgTop = $(this).offset().top;
    let imgLeft = $(this).offset().left;
    let itemIndex = $(this).closest("section").index();
    let boxIndex = $(this).closest("article").parent("section").parent(".wrap").index();

    imgPos = {
        width: "250px",
        height: "280px",
        top: imgTop - 70,
        left: imgLeft
    }
    let tit1 = $wrap.eq(boxIndex).find("section").eq(itemIndex).find("h2").text();
    let tit2 = $wrap.eq(boxIndex).find("section").eq(itemIndex).find("li").text();
    let desc = $wrap.eq(boxIndex).find("section").eq(itemIndex).find(".wrap p").text();

    clearInterval(timer);

    $detail_img.css(imgPos);
    setTimeout(function(){
        $detail_img.css({
            width: "40vw",
            height: "100%",
            left: "10vw",
            top: 0
        })
    }, 100);
    $detail_img.find("img").attr({src: imgSrc, alt: imgAlt});
    $detail.find(".thumb img").attr({src: imgSrc, alt: imgAlt});
    $detail.find(".con >h1").text(tit1);
    $detail.find(".con >h2").text(tit2);
    $detail.find(".con p").text(desc);

    $detail.fadeIn(0);
    $detail.addClass("on");
});

$btnClose.on("click", function(e){
    e.preventDefault();
    
    $detail_img.css(imgPos);
    $detail.removeClass("on");
    $detail.fadeOut(1000);

    timer = setInterval(function(){
        (i >= 2) ? i=0 : i++;
        reverse(i)
    }, 4000);
});

// detail page date
const $date = $detail.find(".date");
const date = new Date();
const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

$date.find("h1").text(date.getDate());
$date.find("h2").text(day[date.getDay()]);
$date.find("h3").text(month[date.getMonth()]);