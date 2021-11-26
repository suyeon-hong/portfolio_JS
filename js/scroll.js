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
        this.boxs = $(opt.panel);
        this.btns = $(opt.btns);
        this.posArr = [];
        this.baseLine = -300;
    }
    bindingEvent(){
        $(window).on("resize", ()=>{
            this.posArr = [];
            let activeIndex = this.btns.find("a").filter(".on").parent().index();
        
            this.initScroll();
            this.moveScroll(activeIndex);
        });
        
        $(window).on("scroll", ()=>{
            let scroll = $(window).scrollTop();
        
            this.activation(scroll);
        });
        
        this.btns.on("click", e=>{
            e.preventDefault();
            let index = $(e.currentTarget).index();
    
            this.moveScroll(index);
        });
    }
    initScroll(){
        for (let i = 0; i < this.boxs.length; i++){
            let id = this.btns.eq(i).children("a").attr("href");
            this.posArr.push($(id).offset().top);
        }
    }
    activation(scroll){
        for (let i = 0; i < this.posArr.length; i++){
            if(scroll >= this.posArr[i] + this.baseLine){
                activeBtn(this.btns, i);
                activeBtn(this.boxs, i);
            }
            if(scroll >= this.posArr[1] + this.baseLine && scroll < this.posArr[2]){
                $(".box2").addClass("on");
            }else{
                $(".box2").removeClass("on");
            }
        }
    }
    moveScroll(index){
        $("html, body").animate({
            scrollTop : this.posArr[index]
        }, 1000);
    }    
}