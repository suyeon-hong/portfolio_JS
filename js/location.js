const $btn = $(".location input[type=submit]");
let result;

$btn.on("click", function(e){
    result = [];

    if(!isTxt("contact_name")) e.preventDefault();
    if(!isTxt("contact_lastname")) e.preventDefault();
    if(!isTxt("contact_qeustions")) e.preventDefault();
    if(!isTxt("contact_content")) e.preventDefault();

    if(result.length) alert("아래 필수입력값을 확인해주세요.\n\n"+ result);
});

function isTxt(name){
    let txt = $("[name="+ name +"]").val();
    
    if(txt !== ""){
        $("label[for="+ name +"]").css({color: "#222"});
        return true;
    }else{
        $("label[for="+ name +"]").css({color: "rosybrown"});
        result.push($("label[for="+ name +"]").text());
        return false;
    }
}