const skip = document.querySelectorAll("#skip a");
skip.forEach(a=>{
    a.addEventListener("focusin", ()=>{
        a.classList.add("on")
    });
    a.addEventListener("focusout", ()=>{
        a.classList.remove("on")
    });
})