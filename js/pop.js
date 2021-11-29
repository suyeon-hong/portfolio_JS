class Pop{
    constructor(selector, opt){
        this.init(selector, opt);
        this.bindingEvent(opt);
    }
    init(selector, opt){
        this.selector = document.querySelector(selector)
        this.btnOpen = this.selector.querySelector(opt.btnOpen);
        this.btnClose = this.selector.querySelector(opt.btnClose);
        this.box = opt.popBox;
    }
    bindingEvent(){
        this.btnOpen.addEventListener("click", e=>{
            e.preventDefault();
            this.selector.querySelector(this.box).classList.add("on");
        });

        this.btnClose.addEventListener("click", e=>{
            e.preventDefault();
            this.selector.querySelector(this.box).classList.remove("on");
        });
    }
}
