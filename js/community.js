const tabs = document.querySelectorAll(".community .tabs li");
const faq_nums = document.querySelectorAll(".community #faq .numbers span");
const notice_nums = document.querySelectorAll(".community #notice .numbers span");

activeBtn(tabs);
activeBtn(faq_nums);
activeBtn(notice_nums);

function activeBtn(items){
    items.forEach((item, index)=>{
        item.addEventListener("click", e=>{
            e.preventDefault();
    
            for(let el of items) el.classList.remove("on");
            items[index].classList.add("on");
        });
    });
}