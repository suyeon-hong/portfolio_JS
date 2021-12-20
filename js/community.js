const tab = document.querySelector(".community .tabs");
const tabs = document.querySelectorAll(".community .tabs li");
const faq_nums = document.querySelectorAll(".community #faq .numbers span");
const notice_nums = document.querySelectorAll(".community #notice .numbers span");
const qna = document.querySelector(".qna");

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


fetch('../data.json')
.then(data=> data.json())
.then(json=> {
    const items = json.qna;
    createList(items);
    tab.addEventListener("click", e=>{
        const value = e.target.dataset.value;
    
        if(value == null) return;
        updateItems(items, value);
    });
});


function createList(items){
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
}

function updateItems(items, value){
    let htmls = "";

    let result = items.filter(item => item["subject"] == value);
    if (value == "전체") result = items;

    result.map(item=>{
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
}