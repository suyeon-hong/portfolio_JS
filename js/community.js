const tab = document.querySelector(".community .tabs");
const tabs = document.querySelectorAll(".community .tabs li");
const faq_nums = document.querySelectorAll(".community #faq .numbers span");
const notice_nums = document.querySelectorAll(".community #notice .numbers span");
const qna = document.querySelector(".qna");
const notice = document.querySelector("#notice tbody");

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

fetch('js/data.json')
.then(data=> data.json())
.then(json=> {
    const itemsQna = json.qna;
    const itemsNotice = json.notice;

    createList(itemsQna);
    createList2(itemsNotice);

    tab.addEventListener("click", e=>{
        const value = e.target.dataset.value;
    
        if(value == null) return;
        updateItems(itemsQna, value);
    });

    qna.addEventListener("click", e=>{
        e.preventDefault();

        const target = e.target.closest("dt");
        const isOn = target.classList.contains("on");

        if(target == null) return;
        if(isOn){
            target.classList.remove("on");
            target.nextElementSibling.classList.remove("on");
            new Anim(target.nextElementSibling,{
                prop: "height",
                value: 0,
                duration: 500,
                callback: ()=>{
                    target.nextElementSibling.style.height = 0;
                }
            });
        }else{
            const dts = qna.querySelectorAll("dt");
            const dds = qna.querySelectorAll("dd");

            dts.forEach(dt=> dt.classList.remove("on"));
            dds.forEach(dd=> dd.classList.remove("on"));
            target.classList.add("on");
            target.nextElementSibling.classList.add("on");

            for(let dd of dds) dd.style.height = "0px";
            new Anim(target.nextElementSibling,{
                prop: "height",
                value: 100,
                duration: 500,
                callback: ()=>{
                    target.nextElementSibling.style.height = "auto"
                }
            });
        }
    })
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

function createList2(items){
    items.map((item,index)=>{
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="#">${item.title}</a></td>
            <td>${item.date}</td>
        `;
        notice.prepend(tr);
    });
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

function slideDown(index){
    let isOn = this.btns[index].classList.contains("on");
    if(isOn){
        this.btns[index].classList.remove("on");
        this.boxs[index].classList.remove("on");
        new Anim(this.boxs[index],{
            prop: "height",
            value: 0,
            duration: 500,
            callback: ()=>{
                this.boxs[index].style.height = 0;
            }
        });
    }else{
        for(let el of this.btns) el.classList.remove("on");
        this.btns[index].classList.add("on");
        for(let el of this.boxs) el.classList.remove("on");
        this.boxs[index].classList.add("on");
        for(let box of this.boxs) box.style.height = "0px";
        new Anim(this.boxs[index],{
            prop: "height",
            value: 100,
            duration: 500,
            callback: ()=>{
                this.boxs[index].style.height = "auto"
            }
        });
    }
}