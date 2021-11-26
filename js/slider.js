class LoopSlider{
    constructor(opt){
        if(!opt.frame || !opt.slider){
            console.error("frame과 slider값은 필수입력사항 입니다");
            return;
        }

        const defaults = {
            prev: ".prev",
            next: ".next",
            default_percent: "-100%",
            moving_percent: "100%",
            speed: 1000,
        }
        let result_opt = {};
        result_opt = Object.assign({}, defaults, opt);

        this.initDOM(result_opt);
        this.init();
        this.bindingEvent();
    }
    initDOM(opt){
        this.frame = document.querySelector(opt.frame);
        this.slider = document.querySelector(opt.slider);
        this.prev = document.querySelector(opt.prev);
        this.next = document.querySelector(opt.next);
        this.default_per = opt.default_percent;
        this.moving_per = opt.moving_percent;
        this.speed = opt.speed;
        this.enableClick = true;
        this.len = this.slider.lenth;
    }
    init(){
        this.frame.style.left = "-100%";
        this.frame.prepend(this.frame.lastElementChild);
    
        this.timer = setInterval(()=>{
            this.movingRight();
        }, this.speed);
    }
    bindingEvent(){
        this.prev.addEventListener("click", e=>{
            e.preventDefault();
        
            if(this.enableClick){
                this.enableClick = false;
                clearInterval(this.timer);
                this.movingLeft();
            }
        });
        
        this.next.addEventListener("click", e=>{
            e.preventDefault();
        
            if(this.enableClick){
                this.enableClick = false;
                clearInterval(this.timer);
                this.movingRight();
            }
        });
    }
    movingLeft(){
        new Anim(this.frame,{
            prop: "margin-left",
            value: "0%",
            duration: 1000,
            callback: ()=>{
                this.frame.style.marginLeft = `${this.default_per}%`;
                this.frame.append(this.frame.lastElementChild);
                this.enableClick = true;
            }
        });
    }
    movingRight(){
        new Anim(this.frame,{
            prop: "margin-left",
            value: `${this.moving_per}%`,
            duration: 1000,
            callback: ()=>{
                this.frame.style.marginLeft = `${this.default_per}%`;
                this.frame.append(this.frame.firstElementChild);
                this.enableClick = true;
            }
        });
    }
}



class BasicSlider{
    constructor(opt){
        if(!opt.frame){
            console.error("frame값은 필수 입력값입니다.");
            return;
        }
        this.init(opt);
        this.bindingEvent();
    }
    init(opt){
        this.frame = document.querySelector(opt.frame);
        this.btns = document.querySelectorAll(opt.btns);
        this.enableClick = true;
        this.speed = opt.speed;
    }
    bindingEvent(){
        this.btns.forEach((btn,index)=>{
            btn.addEventListener("click", ()=>{
                if(this.enableClick){
                    this.enableClick = false;
        
                    this.activation(this.btns, index);
                    this.movingSlide(index);
                }
            })
        });
    }
    activation(item, index){
        for(let el of item) el.classList.remove("on");
        item[index].classList.add("on");
    }
    movingSlide(index){
        new Anim(this.frame, {
            prop: "left",
            value: `${-100 * index}%`,
            duration: this.speed,
            callback: ()=>{
                this.enableClick = true;
            }
        });
    }
}




