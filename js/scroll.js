class MyScroll{
    constructor(opt){
        if(!opt.panel || !opt.btns){
            console.error("panel값과 btns값은 필수 입력사항 입니다.");
            return;
        }
        this.initDOM(opt);
        this.initScroll();
        this.bindingEvent();
    }
    initDOM(opt){
        this.boxs = document.querySelectorAll(opt.panel);
        this.btns = document.querySelectorAll(opt.btns);
        this.posArr = [];
        this.baseLine = -300;
    }
    bindingEvent(){
        window.addEventListener("resize", ()=>{
            this.initScroll();
        });
        
        window.addEventListener("scroll", ()=>{
            let scroll = window.scrollY || window.pageYOffset;
            this.activation(scroll);
        });
        
        this.btns.forEach((btn,index)=>{
            btn.addEventListener("click", e=>{
                e.preventDefault();
                this.moveScroll(index);
                this.activationBtn(this.btns, index)
            });
        });
    }
    initScroll(){
        this.posArr = [];
        for(let el of this.boxs) this.posArr.push(el.offsetTop);
    }
    activation(scroll){
        this.boxs.forEach((_,i)=>{
            if(scroll >= this.posArr[i] + this.baseLine){
                this.activationBtn(this.btns, i);
                this.activationBtn(this.boxs, i);
            }
            if(scroll >= this.posArr[1] + this.baseLine && scroll < this.posArr[2]){
                document.querySelector(".box2").classList.add("on");
            }else{
                document.querySelector(".box2").classList.remove("on");
            }
        });
    }
    moveScroll(index){
        new Anim(window, {
            prop: "scroll",
            value: this.posArr[index],
            duration: 1000
        });
    }
    activationBtn(item, index){
        for(let el of item) el.classList.remove("on");
        item[index].classList.add("on");
    }
}
