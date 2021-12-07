class Visual{
    constructor(selector, opt){
        this.initDOM(selector, opt);
        this.init();
        this.bindingEvent();
    }
    initDOM(selector, opt){
        this.visual = document.querySelector(selector);
        this.letter1 = this.visual.querySelector(opt.letter1);
        this.letter2 = this.visual.querySelector(opt.letter2);

        this.wrap = this.visual.querySelectorAll(opt.cardBoxs);
        this.section = this.visual.querySelectorAll(opt.cards);
        this.back = this.visual.querySelectorAll(opt.card_back);
        this.btns = this.visual.querySelectorAll(opt.btns);

        this.detail = this.visual.querySelector(opt.detail);
        this.btnClose = this.detail.querySelector(opt.detail_close);
        this.imgs = this.visual.querySelectorAll(opt.card_img);
        this.detail_img = this.detail.querySelector(opt.detail_img);

        this.date = this.detail.querySelector(opt.date);
        this.today = new Date();
        this.day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        this.enableClick = true;
        this.i=0;
        this.timer;
    }
    init(){
        this.letterMotion(this.letter1, 0.1);
        this.letterMotion(this.letter2, 0.2);

        this.wrap[0].classList.add("on");
        this.wrap[0].style.display = "block";

        setTimeout(()=>{
            for(let el of this.back) el.style.display = "none";
        },2000);
        this.timer = setInterval(()=>{
            (this.i >= 2) ? this.i=0 : this.i++;
            this.reverse(this.i)
        }, 4000);

        this.date.querySelector("h1").innerText = this.today.getDate();
        this.date.querySelector("h2").innerText = this.day[this.today.getDay()];
        this.date.querySelector("h3").innerText = this.month[this.today.getMonth()];
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

        this.wrap.forEach((item)=>{
            item.addEventListener("click", e=>{
                e.preventDefault();
        
                const target = e.target.closest("article").querySelector("img");
                if(e.target !== target) return;
        
                const imgSrc = e.target.getAttribute("src");
                const imgAlt = e.target.getAttribute("alt");
                this.imgWidth = e.target.offsetWidth;
                this.imgHeight = e.target.offsetHeight;
                this.imgTop = e.target.getBoundingClientRect().top;
                this.imgLeft =e.target.getBoundingClientRect().left;
        
                const tit1 = e.target.closest("article").querySelector("h2").innerText;
                const tit2 = e.target.closest("article").querySelector("h1").innerText;
                const desc = e.target.closest("article").querySelector(".wrap p").innerText;
        
                clearInterval(this.timer);
        
                this.detail_img.style.width = `${this.imgWidth}px`;
                this.detail_img.style.height = `${this.imgHeight}px`;
                this.detail_img.style.top = `${this.imgTop}px`;
                this.detail_img.style.left = `${this.imgLeft}px`;
                this.detail_img.style.transition = "0s";
                setTimeout(()=>{
                    this.detail_img.style.width = "40vw";
                    this.detail_img.style.height = "100%";
                    this.detail_img.style.top = 0;
                    this.detail_img.style.left = "10vw";
                    this.detail_img.style.transition = ".8s";
                }, 100);
                this.detail_img.querySelector("img").setAttribute("src", imgSrc);
                this.detail_img.querySelector("img").setAttribute("alt", imgAlt);
                this.detail.querySelector(".thumb img").setAttribute("src", imgSrc);
                this.detail.querySelector(".thumb img").setAttribute("alt", imgAlt);
                this.detail.querySelector(".con >h1").innerText = tit1;
                this.detail.querySelector(".con >h2").innerText = tit2;
                this.detail.querySelector(".con p").innerText = desc;
                this.detail.classList.add("on");
            })
        });
        this.btnClose.addEventListener("click", e=>{
            e.preventDefault();
        
            this.detail.classList.remove("on");
            this.detail_img.style.width = `${this.imgWidth}px`;
            this.detail_img.style.height = `${this.imgHeight}px`;
            this.detail_img.style.top = `${this.imgTop}px`;
            this.detail_img.style.left = `${this.imgLeft}px`;
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
        for(let el of this.wrap) el.style.display = "none";
        this.wrap[index].style.display = "block";

        setTimeout(()=>{
            this.activeBtn(this.btns, index);
            this.activeBtn(this.wrap, index);
    
            for(let el of this.back) el.style.display = "block";
    
            setTimeout(()=>{
                for(let el of this.back) el.style.display = "none";
                this.enableClick = true;
            },2000);
        }, 100);
    }
    activeBtn(item, index){
        for(let el of item) el.classList.remove("on");
        item[index].classList.add("on");
    }
}