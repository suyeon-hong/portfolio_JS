class Tab{
    constructor(opt){
        if(!opt.btns || !opt.boxs){
            console.error("btns와 boxs는 필수 입력사항 입니다.");
            return;
        }

        this.init(opt);
        this.bindingEvent(opt);
    }
    init(opt){
        this.btns = document.querySelectorAll(opt.btns);
        this.boxs = document.querySelectorAll(opt.boxs);
    }
    bindingEvent(opt){
        this.btns.forEach((btn, index)=>{
            btn.addEventListener("click", e=>{
                e.preventDefault();

                if(opt.type == "slideDown"){
                    this.slideDown(index);
                }else{
                    this.activation(btn);
                    this.showBox(index);
                }
            });
        });
    }
    activation(btn){
        let isOn = btn.classList.contains("on");
        if (isOn) return;
    
        for(let el of this.btns) el.classList.remove("on");
        btn.classList.add("on");
    }
    showBox(index){
        for(let el of this.boxs) el.style.display = "none";
        this.boxs[index].style.display = "block";
    }
    slideDown(index){
        let isOn = this.btns[index].classList.contains("on");
        if(isOn){
            this.btns[index].classList.remove("on");
            this.boxs[index].classList.remove("on");
            new Anim(this.boxs[index],{
                prop: "height",
                value: 0,
                duration: 500,
                callback: ()=>{
                    this.boxs[index].style.height = 0;
                }
            });
        }else{
            for(let el of this.btns) el.classList.remove("on");
            this.btns[index].classList.add("on");
            for(let el of this.boxs) el.classList.remove("on");
            this.boxs[index].classList.add("on");
            for(let box of this.boxs) box.style.height = "0px";
            new Anim(this.boxs[index],{
                prop: "height",
                value: 100,
                duration: 500,
                callback: ()=>{
                    this.boxs[index].style.height = "auto"
                }
            });
        }
    }
}
