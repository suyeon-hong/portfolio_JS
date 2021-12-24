class Tab{
    constructor(opt){
        if(!opt.btns || !opt.boxs){
            console.error("btns와 boxs는 필수 입력사항 입니다.");
            return;
        }
        this.init(opt);
        this.bindingEvent();
    }
    init(opt){
        this.btns = document.querySelectorAll(opt.btns);
        this.boxs = document.querySelectorAll(opt.boxs);
    }
    bindingEvent(){
        this.btns.forEach((btn, index)=>{
            btn.addEventListener("click", e=>{
                e.preventDefault();

                this.activation(btn);
                this.showBox(index);
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
}
