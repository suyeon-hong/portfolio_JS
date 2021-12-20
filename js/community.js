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

const qna = document.querySelector(".qna");

fetch('../data.json')
.then(data=> {return data.json()})
.then(json=> {
    const items = json.qna;
    let htmls = "";

    items.map(item=>{
        htmls += `
            <dt>
                <span class="icon">Q</span>
                <p>${item.question}</p>
                <span class="subj">${item.subject}</span>
                <a href="#" class="arrow" title="답변보기"></a>
            </dt>
            <dd>
                <span class="icon">A</span>
                <p>${item.answer}</p>
            </dd>
        `;
    });
    qna.innerHTML = htmls;
});