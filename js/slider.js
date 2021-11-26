class Slider{
    constructor(opt){
        if(!opt.frame || !opt.slider){
            console.error("frame과 slider값은 필수입력사항 입니다");
            return;
        }

        const defaults = {
            prev: $(".prev"),
            next: $(".next"),
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
        this.frame = $(opt.frame);
        this.slider = $(opt.slider);
        this.prev = $(opt.prev);
        this.next = $(opt.next);
        this.default_per = opt.default_percent;
        this.moving_per = opt.moving_percent;
        this.speed = opt.speed;
        this.enableClick = true;
    }
    init(){
        this.frame.find(this.slider).last().prependTo(this.frame);
    
        this.timer = setInterval(()=>{
            this.movingRight();
        }, this.speed);
    }
    bindingEvent(){
        this.prev.on("click", e=>{
            e.preventDefault();
        
            if(this.enableClick){
                this.enableClick = false;
                clearInterval(this.timer);
                this.movingLeft();
            }
        });
        
        this.next.on("click", e=>{
            e.preventDefault();
        
            if(this.enableClick){
                this.enableClick = false;
                clearInterval(this.timer);
                this.movingRight();
            }
        });
    }
    movingLeft(){
        this.frame.animate({marginLeft: "0%"}, 1000, ()=>{
            this.frame.css({marginLeft: this.default_per +"%"});
            this.frame.children(this.slider).last().prependTo(this.frame);
            this.enableClick = true;
        });
    }
    movingRight(){
        this.frame.animate({marginLeft: this.moving_per +"%"}, 1000, ()=>{
            this.frame.css({marginLeft: this.default_per +"%"});
            this.frame.children(this.slider).first().appendTo(this.frame);
            this.enableClick = true;
        });
    }
}



// box1 slide
const $sliderBtns = $(".box1 .btns li");
const $frame = $(".box1 .slider-wrapper");
let enableClick = true;

$sliderBtns.on("click", function(){

    if(enableClick){
        enableClick =false;
        let index = $(this).index();

        $sliderBtns.removeClass("on");
        $(this).addClass("on");
        $frame.animate({left: -(100 * index) +"%"}, speed/2, function(){
            enableClick = true;
        });
    }
});

