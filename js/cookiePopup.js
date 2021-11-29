class CookiePopup{
    constructor(selector, opt){
        if(!selector){
            console.error("selector값은 필수입력값입니다.");
            return;
        }
        const defaults = {
            btnClose: ".close",
            name: "popup",
            value: "isdone",
            delay: 1
        }
        let results = Object.assign({}, defaults, opt);
        this.init(selector, results);
        this.bindingEvent();
    }
    init(selector, opt){
        this.popup = document.querySelector(selector);
        this.btnClose = this.popup.querySelector(opt.btnClose);
        this.checkbox = this.popup.querySelector("label");
        this.isCookie = document.cookie.indexOf(`${opt.name}=${opt.value}`);
        this.name = opt.name;
        this.value = opt.value;
        this.dalay = opt.delay;
    }
    bindingEvent(){
        (this.isCookie == 0) ? this.popup.style.display = "none" : this.popup.style.display = "block";

        this.btnClose.addEventListener("click", e=>{
            e.preventDefault();
            let isChecked = popup.querySelector("input[type=checkbox]").checked;
        
            if(isChecked) this.setCookie();
            this.popup.style.display = "none";
        });
        
        this.checkbox.addEventListener("click", ()=>{
            this.checkbox.classList.toggle("on");
        });
    }
    setCookie(){
        let today = new Date();
        let date = today.getDate();
        
        today.setDate(date + this.delay);
    
        let duedate = today.toGMTString();
    
        document.cookie = `${this.name}=${this.value}; expires=${duedate}`;
    }
}