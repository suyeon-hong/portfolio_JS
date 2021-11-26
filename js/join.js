letter(".join h1", 0.1);

function letter(item, interval){
    let txt = $(item).text();
    let num = 0;

    txt = txt.split(" ");
    $(item).empty();

    for(let el of txt){
        $(item).append(
            $("<span>").text(el).css({
                transitionDelay: num*interval +"s",
                transform: "translateY(-200px)",
                opacity: 0
            })
        )
        num++;

        $(item).find("span").stop().animate({
            opacity: 1
        }, 500, function(){
            $(this).css({transform: "translateY(0)"})
        });
    }
}