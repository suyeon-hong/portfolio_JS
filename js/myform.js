class MyForm{
    constructor(selector, option){
        this.init(selector);
        this.eventBinding(option);
    }
    init(selector){
        this.frame = document.querySelector(selector);
        this.submitBtn = this.frame.querySelector("input[type=submit]");
        this.result = [];
    }
    
    eventBinding(option){
        option.forEach((opt)=>{
            this.submitBtn.addEventListener("click", e=>{
                
                if(opt.type == "id"){
                    if(!this.isId(opt.name)) e.preventDefault();
                }
                if(opt.type == "password"){
                    if(!this.isPw(opt.name[0], opt.name[1])) e.preventDefault();
                }
                if(opt.type == "select"){
                    if(!this.isSelect(opt.name)) e.preventDefault();
                }
                if(opt.type == "text"){
                    if(!this.isTxt(opt.name, opt.len)) e.preventDefault();
                }
                if(opt.type == "address"){
                    if(!this.isAddress(opt.name[0], opt.name[1], opt.name[2])) e.preventDefault();
                }
                if(opt.type == "phone"){
                    if(!this.isPhone(opt.name[0], opt.name[1], opt.name[2])) e.preventDefault();
                }
                if(opt.type == "email"){
                    if(!this.isEmail(opt.name[0], opt.name[1], opt.name[2])) e.preventDefault();
                }
                if(opt.type == "check"){
                    if(!this.isCheck(opt.name, opt.subject)) e.preventDefault();
                }
            });
        });
        this.submitBtn.addEventListener("click", e=>{
            e.preventDefault();

            if(this.result.length) {
                window.scrollTo(0,0);
                alert(`아래 항목의 필수 입력값을 확인해 주세요\n\n ${this.result}`);
                this.result = [];
            }
        });
    }
    
    isId(name){
        const txt = document.querySelector(`[name= ${name}]`);
        const val = txt.value;
        const eng = /[a-z]/;
        const num = /[0-9]/;
    
        if(txt.length >= 4 && txt.length <= 16 && eng.test(val) || num.test(val)){
            const errMsg = txt.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();
            return true;
        }else if(txt.length >= 4 && txt.length <= 16){
            const errMsg = txt.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();

            const htmls = "<p class='caution'>영문소문자/숫자를 포함한 4~16자 이내로 입력해 주세요.</p>";
            txt.closest("td").innerHTML += htmls;

            this.result.push(document.querySelector(`label[for= ${name}]`).innerText);
            return false;
        }else{
            const errMsg = txt.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();

            const htmls = "<p class='caution'>아이디를 입력해 주세요.</p>";
            txt.closest("td").innerHTML += htmls;

            this.result.push(document.querySelector(`label[for= ${name}]`).innerText);
            return false;
        }
    }
    
    isPw(name1, name2){
        const txt1 = document.querySelector(`[name= ${name1}]`);
        const txt2 = document.querySelector(`[name= ${name2}]`);
        const val1 = txt1.value;
        const val2 = txt2.value;
        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*()_+]/;
    
        if(val1 == val2 && val1.length >= 8 && val1.length <= 16){
            if(eng.test(val1) && num.test(val1)){
                const errMsg2 = txt2.closest("td").querySelector("p");
                const errMsg1 = txt1.closest("td").querySelector("p");
                if(errMsg2) errMsg2.remove();
                if(errMsg1) errMsg1.remove();
                return true;
            }else if(num.test(val1) && spc.test(val1)){
                const errMsg2 = txt2.closest("td").querySelector("p");
                const errMsg1 = txt1.closest("td").querySelector("p");
                if(errMsg2) errMsg2.remove();
                if(errMsg1) errMsg1.remove();
                return true;
            }else if(eng.test(val1) && spc.test(val1)){
                const errMsg2 = txt2.closest("td").querySelector("p");
                const errMsg1 = txt1.closest("td").querySelector("p");
                if(errMsg2) errMsg2.remove();
                if(errMsg1) errMsg1.remove();
                return true;
            }else{
                const errMsg2 = txt2.closest("td").querySelector("p");
                const errMsg1 = txt1.closest("td").querySelector("p");
                if(errMsg2) errMsg2.remove();
                if(errMsg1) errMsg1.remove();

                const htmls = "<p class='caution'>영문 대소문자, 숫자, 또는 특수문자 중 2가지 이상 조합하여 8~16자로 입력해 주세요.</p>";
                txt1.closest("td").innerHTML += htmls;
                
                this.result.push(document.querySelector(`label[for= ${name1}]`).innerText);
                return false;
            }
        }else if(val1 === val2){
            const errMsg2 = txt2.closest("td").querySelector("p");
            const errMsg1 = txt1.closest("td").querySelector("p");
            if(errMsg2) errMsg2.remove();
            if(errMsg1) errMsg1.remove();

            let htmls = "<p class='caution'>영문 대소문자, 숫자, 또는 특수문자 중 2가지 이상 조합하여 8~16자로 입력해 주세요.</p>";
            txt1.closest("td").innerHTML += htmls;
            
            this.result.push(document.querySelector(`label[for= ${name1}]`).innerText);
            return false;
        }else{
            const errMsg2 = txt2.closest("td").querySelector("p");
            const errMsg1 = txt1.closest("td").querySelector("p");
            if(errMsg2) errMsg2.remove();
            if(errMsg1) errMsg1.remove();

            let htmls = "<p class='caution'>영문 대소문자, 숫자, 또는 특수문자 중 2가지 이상 조합하여 8~16자로 입력해 주세요.</p>";
            let htmls2 = "<p class='caution'>동일한 비밀번호를 입력해 주세요.</p>";
            txt1.closest("td").innerHTML += htmls;
            txt2.closest("td").innerHTML += htmls2;
            
            this.result.push(document.querySelector(`label[for= ${name1}]`).innerText);
            return false;
        }
    }
    
    isSelect(name){
        const sel = document.querySelector(`[name=${name}]`);
        const sel_index = sel.options.selectedIndex;
        const val = sel.options[sel_index].value;
        
        if(val !== ""){
            const errMsg = sel.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();
            return true;
        }else{
            const errMsg = sel.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();

            const htmls = "<p class='caution'>필수 입력사항 입니다. 옵션을 선택해 주세요.</p>";
            sel.closest("td").innerHTML += htmls;
            
            this.result.push(document.querySelector(`label[for=${name}]`).innerText);

            return false;
        }
    }
    
    isTxt(name, len){
        const txt = document.querySelector(`[name=${name}]`);
        const val = txt.value;
        
        if(val.length >= len){
            const errMsg = txt.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();
            return true;
        }else{
            const errMsg = txt.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();

            const htmls = `<p class='caution'>필수 입력사항 입니다. ${len}자 이상 입력해 주세요.</p>`;
            txt.closest("td").innerHTML += htmls;
            
            this.result.push(document.querySelector(`label[for=${name}]`).innerText);
            return false;
        }
    }
    
    isCheck(name, text){
        const txt = document.querySelectorAll(`[name=${name}]`);
        let isChecked = false;
        for(let el of txt){
            if(el.checked) isChecked = true;
        }

        if(isChecked){
            const errMsg = txt[0].parentElement.querySelector(".caution");
            if(errMsg) errMsg.remove();

            return true;
        }else{
            const errMsg = txt[0].parentElement.querySelector(".caution");
            if(errMsg) errMsg.remove();

            const htmls = `<p class='caution'>${text}에 체크해 주세요.</p>`;
            txt[0].parentElement.innerHTML += htmls;

            this.result.push(text);
            return false;
        }
    }
    
    isPhone(name1, name2, name3){
        const num2 = document.querySelector(`[name= ${name2}]`);
        const num3 = document.querySelector(`[name= ${name3}]`);
        const val2 = num2.value;
        const val3 = num3.value;
    
        if(this.isSelect(name1) && val2.length >= 4 && val3.length >= 4){
            const errMsg = num2.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();
            return true;
        }else{
            const errMsg = num2.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();

            const htmls = "<p class='caution'>필수 입력값을 입력해 주세요.</p>";
            num2.closest("td").innerHTML += htmls;

            this.result.push(document.querySelector(`label[for=${name1}]`).innerText);
            return false;
        }
    }
    
    isAddress(name1, name2, name3){
        const txt1 = document.querySelector(`[name=${name1}]`);
        const txt2 = document.querySelector(`[name=${name2}]`);
        const txt3 = document.querySelector(`[name=${name3}]`);
        const val1 = txt1.value;
        const val2 = txt2.value;
        const val3 = txt3.value;
        
        if(val1 !== "" && val2 !== "" && val3 !==""){
            const errMsg = txt1.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();
            return true;
        }else{
            const errMsg = txt1.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();

            const htmls = "<p class='caution'>필수 입력사항 입니다. 올바른 값을 입력해 주세요.</p>";
            txt1.closest("td").innerHTML += htmls;
            
            this.result.push(document.querySelector(`label[for=${name1}]`).innerText);
            return false;
        }
    }
    
    isEmail(name1, name2, name3){
        const txt1 = document.querySelector(`[name=${name1}]`);
        const txt2 = document.querySelector(`[name=${name2}]`);
        const isChecked = this.isSelect(name3);
        const val1 = txt1.value;
        const val2 = txt2.value;
        
        console.log(txt1);
        console.log(txt1.closest("td"));

        if(val1 !== "" && (val2 !== "" || isChecked)){
            const errMsg = txt1.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();
            return true;
        }else{
            const errMsg = txt1.closest("td").querySelector("p");
            if(errMsg) errMsg.remove();

            const htmls = "<p class='caution'>필수 입력값을 입력해 주세요.</p>"
            txt1.closest("td").innerHTML += htmls;
            
            this.result.push(document.querySelector(`label[for=${name3}]`).innerText);
            return false;
        }
    }    
}