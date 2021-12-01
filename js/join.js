class LetterMotion{
    constructor(){
        this.letter(".join h1", 0.1);
    }
    letter(item, interval){
        const frame = document.querySelector(item);
        let txts = frame.innerText;
        let num = 0;
    
        txts = txts.split(" ");
        frame.innerText = "";
    
        txts.forEach((txt,index)=>{
            const htmls = `<span>${txt}</span>`;

            frame.innerHTML += htmls;
            frame.querySelectorAll("span")[index].style.transitionDelay = `${num*interval}s`;
            frame.querySelectorAll("span")[index].style.transform = "translateY(-200px)";
            frame.querySelectorAll("span")[index].style.opacity = 0;

            num++;

            for(let el of frame.querySelectorAll("span")){
                new Anim(el,{
                    prop: "opacity",
                    value: 1,
                    duration: 500,
                    callback: ()=>{
                        el.style.transform = "translateY(0)"
                    }
                });
            }
        });
    }
}