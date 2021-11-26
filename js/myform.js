class MyForm{
    constructor(selector, option){
        this.init(selector);
        this.eventBinding(option);
    }
    init(selector){
        this.submitBtn = $(selector);
        this.result = [];
    }
    
    eventBinding(option){
        option.forEach((opt)=>{
            this.submitBtn.on("click", e=>{
                
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
                    if(!this.isTxt(opt.name)) e.preventDefault();
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
        this.submitBtn.on("click", e=>{
            if(this.result.length) {
                $(window).scrollTop(0);
                alert("아래 항목의 필수 입력값을 확인해 주세요\n\n" + this.result);
                this.result = [];
            }
        });
    }
    
    isId(name){
        let txt = $("[name="+ name +"]").val();
        let eng = /[a-z]/;
        let num = /[0-9]/;
    
        if(txt.length >= 4 && txt.length <= 16 && eng.test(txt) || num.test(txt)){
            $("[name="+ name +"]").parent().find("p").remove();
            return true;
        }else if(txt.length >= 4 && txt.length <= 16){
            $("[name="+ name +"]").parent().find("p").remove();
            $("[name="+ name +"]").parent().append(
                "<p class='caution'>영문소문자/숫자를 포함한 4~16자 이내로 입력해 주세요.</p>"
            );
            this.result.push($("label[for="+ name +"]").text());
            return false;
        }else{
            $("[name="+ name +"]").parent().find("p").remove();
            $("[name="+ name +"]").parent().append(
                "<p class='caution'>아이디를 입력해 주세요.</p>"
            );
            this.result.push($("label[for="+ name +"]").text());
            return false;
        }
    }
    
    isPw(name1, name2){
        let txt1 = $("[name = "+ name1 +"]").val();
        let txt2 = $("[name = "+ name2 +"]").val();
        let eng = /[a-zA-Z]/;
        let num = /[0-9]/;
        let spc = /[~!@#$%^&*()_+]/;
    
        if(txt1 === txt2 && txt1.length >= 8 && txt1.length <= 16){
            if(eng.test(txt1) && num.test(txt1)){
                $("[name="+ name2 +"]").parent().find("p").remove();
                $("[name="+ name1 +"]").parent().find("p").remove();
                return true;
            }else if(num.test(txt1) && spc.test(txt1)){
                $("[name="+ name2 +"]").parent().find("p").remove();
                $("[name="+ name1 +"]").parent().find("p").remove();
                return true;
            }else if(eng.test(txt1) && spc.test(txt1)){
                $("[name="+ name2 +"]").parent().find("p").remove();
                $("[name="+ name1 +"]").parent().find("p").remove();
                return true;
            }else{
                $("[name="+ name2 +"]").parent().find("p").remove();
                $("[name="+ name1 +"]").parent().find("p").remove();
                $("[name="+ name1 +"]").parent().append(
                    "<p class='caution'>영문 대소문자, 숫자, 또는 특수문자 중 2가지 이상 조합하여 8~16자로 입력해 주세요.</p>"
                );
                this.result.push($("label[for="+ name1 +"]").text());
                return false;
            }
        }else if(txt1 === txt2){
            $("[name="+ name1 +"]").parent().find("p").remove();
            $("[name="+ name2 +"]").parent().find("p").remove();
            $("[name="+ name1 +"]").parent().append(
                "<p class='caution'>영문 대소문자, 숫자, 또는 특수문자 중 2가지 이상 조합하여 8~16자로 입력해 주세요.</p>"
            );
            this.result.push($("label[for="+ name1 +"]").text());
            return false;
        }else{
            $("[name="+ name1 +"]").parent().find("p").remove();
            $("[name="+ name2 +"]").parent().find("p").remove();
            $("[name="+ name1 +"]").parent().append(
                "<p class='caution'>영문 대소문자, 숫자, 또는 특수문자 중 2가지 이상 조합하여 8~16자로 입력해 주세요.</p>"
            );
            $("[name="+ name2 +"]").parent().append(
                "<p class='caution'>동일한 비밀번호를 입력해 주세요.</p>"
            );
            this.result.push($("label[for="+ name1 +"]").text());
            return false;
        }
    }
    
    isSelect(name){
        let txt = $("[name="+ name +"]").find("option:selected").val();
        
        if(txt !== ""){
            $("[name="+ name +"]").parent().find("p").remove();
            return true;
        }else{
            $("[name="+ name +"]").parent().find("p").remove();
            $("[name="+ name +"]").parent().append(
                "<p class='caution'>항목을 선택해 주세요.</p>"
            )
            this.result.push($("label[for="+ name +"]").text());
            return false;
        }
    }
    
    isTxt(name){
        let txt = $("[name="+ name +"]").val();
        
        if(txt !== ""){
            $("[name="+ name +"]").parent().find("p").remove();
            return true;
        }else{
            $("[name="+ name +"]").parent().find("p").remove();
            $("[name="+ name +"]").parent().append(
                "<p class='caution'>필수 입력값을 입력해 주세요.</p>"
            )
            this.result.push($("label[for="+ name +"]").text());
            return false;
        }
    }
    
    isCheck(name, text){
        let txt = $("[name="+ name +"]").is(":checked");
        if(txt){
            $("[name="+ name +"]").parent().find(".caution").remove();
            return true;
        }else{
            $("[name="+ name +"]").parent().find(".caution").remove();
            $("[name="+ name +"]").parent().append(
                "<p class='caution'>"+ text +"에 체크해 주세요.</p>"
                )
                this.result.push(text);
            return false;
        }
    }
    
    isPhone(name1, name2, name3){
        let txt2 = $("[name="+ name2 +"]").val();
        let txt3 = $("[name="+ name3 +"]").val();
    
        if(this.isSelect(name1) && txt2 !== "" && txt3 !== ""){
            $("[name="+ name2 +"]").parent().find("p").remove();
            $("[name="+ name2 +"]").parent().find("p").remove();
            return true;
        }else{
            $("[name="+ name2 +"]").parent().find("p").remove();
            $("[name="+ name2 +"]").parent().append(
                "<p class='caution'>필수 입력값을 입력해 주세요.</p>"
            )
            this.result.push($("label[for="+ name1 +"]").text());
            return false;
        }
    }
    
    isAddress(name1, name2, name3){
        let txt1 = $("[name="+ name1 +"]").val();
        let txt2 = $("[name="+ name2 +"]").val();
        let txt3 = $("[name="+ name3 +"]").val();
        
        if(txt1 !== "" && txt2 !== "" && txt3 !==""){
            $("[name="+ name1 +"]").parent().find("p").remove();
            return true;
        }else{
            $("[name="+ name1 +"]").parent().find("p").remove();
            $("[name="+ name1 +"]").parent().append(
                "<p class='caution'>필수 입력값을 입력해 주세요.</p>"
            )
            this.result.push($("label[for="+ name1 +"]").text());
            return false;
        }
    }
    
    isEmail(name1, name2, name3){
        let txt1 = $("[name="+ name1 +"]").val();
        let txt2 = $("[name="+ name2 +"]").val();
        let txt3 = this.isSelect(name3);
        
        if(txt1 !== "" && txt2 !== "" || txt3){
            $("[name="+ name1 +"]").parent().find("p").remove();
            return true;
        }else{
            $("[name="+ name1 +"]").parent().find("p").remove();
            $("[name="+ name1 +"]").parent().append(
                "<p class='caution'>필수 입력값을 입력해 주세요.</p>"
            )
            this.result.push($("label[for="+ name1 +"]").text());
            return false;
        }
    }    
}