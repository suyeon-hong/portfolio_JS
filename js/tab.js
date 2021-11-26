class Tab{
    constructor(opt){
        if(!opt.btns || !opt.boxs){
            console.error("btns와 boxs는 필수 입력사항 입니다.");
            return;
        }
        const defaults = {
            motion: "show"
        }
        let result = Object.assign({}, defaults, opt);

        this.init(result);
        this.bindingEvent();
    }
    init(opt){
        this.btns = $(opt.btns);
        this.boxs = $(opt.boxs);
        this.motion = opt.motion;
        this.speed = opt.speed;
    }
    bindingEvent(){
        this.btns.on("click focus", e=>{
            e.preventDefault();

            if(this.motion == "show"){
                this.activation(e.currentTarget);
                this.showBox();
            }
            if(this.motion == "slideDown"){
                let i = $(e.currentTarget).index();
                let isOn = $(e.currentTarget).hasClass("on");
                
                if (isOn) {
                    this.slideUp(e.currentTarget);
                } else{
                    this.slideDown(e.currentTarget, i);
                }
            }
        });
    }
    activation(e){
        this.target = $(e).children("a").attr("href");
        this.isOn = $(e).hasClass("on");
        if (this.isOn) return;
    
        this.btns.removeClass("on");
        $(e).addClass("on");
    }
    showBox(){
    this.boxs.hide();
    $(this.target).show();
    }
    slideUp(e){
        $(e).removeClass("on");
        $(e).next().slideUp();
    }
    slideDown(e, i){
        this.btns.removeClass("on");
        $(e).addClass("on");

        this.boxs.slideUp();
        $(e).next().slideDown(this.speed);
    }
}
