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
                    this.activation(this.btns, index);
                    this.activation(this.boxs, index);
                    this.slideDown(index);
                }else{
                    this.activation(this.btns, index);
                    this.showBox(index);
                }
            });
        });
    }
    activation(item, index){
        this.isOn = item[index].classList.contains("on");
        if (this.isOn) return;
    
        for(let el of item) el.classList.remove("on");
        item[index].classList.add("on");
    }
    showBox(index){
        for(let el of this.boxs) el.style.display = "none";
        this.boxs[index].style.display = "block";
    }
    slideDown(index){
        if(this.isOn) return;

        for(let box of this.boxs) box.style.height = "0px";
        new Anim(this.boxs[index],{
            prop: "height",
            value: 180,
            duration: 500,
            callback: ()=>{
            }
        });
    }
}
