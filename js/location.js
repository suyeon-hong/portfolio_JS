const btn = document.querySelector(".location input[type=submit]");
let result;

btn.addEventListener("click", e=>{
    result = [];

    if(!isTxt("contact_name")) e.preventDefault();
    if(!isTxt("contact_lastname")) e.preventDefault();
    if(!isTxt("contact_qeustions")) e.preventDefault();
    if(!isTxt("contact_content")) e.preventDefault();

    if(result.length) alert(`아래 필수입력값을 확인해주세요.\n\n ${result}`);
});

function isTxt(name){
    const txt = document.querySelector(`[name=${name}]`);
    const tit = document.querySelector(`label[for=${name}]`);
    const val = txt.value;
    
    if(val !== ""){
        tit.style.color = "#222";
        return true;
    }else{
        tit.style.color = "rosybrown";
        result.push(tit.innerText);
        return false;
    }
}