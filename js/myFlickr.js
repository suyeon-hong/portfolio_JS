/*
https://www.flickr.com/services/rest/?method=flickr.photos.search
https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

21be590b77fb11bd12a7266f99a2f2d8
*/




class MyFlickr{
    constructor(opt){
        if(!opt.selector || !opt.api_key){
            console.error("selector값과 api_key값은 필수 입력사항 입니다.");
            return;
        }
        if(!opt.type) opt.type = "interest";
        this.init(opt);
        this.bindingEvent();
    }
    
    init(opt){
        this.gallery = document.querySelector(opt.selector);
        this.main = document.querySelector(opt.main);
        this.tabBox = document.querySelector(opt.tabBox);
        this.photoBox = document.querySelector(opt. photoBox);
        this.loadingImg = document.querySelector(opt. loadingImg);
        this.api_key = opt.api_key,
        this.user_id = opt.user_id;
        this.datatype = "json";
        this.type = opt.type;
        this.tag = opt.tag;
        this.totalImg = opt.totalImg;
    }
    
    bindingEvent(){
        this.getList();
        
        this.gallery.querySelector("button").addEventListener("click", ()=>{
            this.tag = this.gallery.querySelector("input").val();
        
            if(!this.tag){
                alert("검색어를 입력해 주세요.");
                return;
            }
            this.loadingImg.classList.remove("off");
            this.photoBox.classList.remove("on");
            this.user_id = "";
        
            this.getList();
        });
        
        window.addEventListener("keypress", e=>{
            if(e.key == "Enter"){
                this.tag = this.gallery.querySelector("input").val();
        
                if(!this.tag){
                    alert("검색어를 입력해 주세요.");
                    return;
                }
                this.loadingImg.classList.remove("off");
                this.photoBox.classList.remove("on");
                this.user_id = "";
        
                this.getList();
            }
        });
        
        this.photoBox.addEventListener("click", e=>{
            e.preventDefault();

            if(e.target !== e.target.closest(".item").querySelector("img")) return;

            let target = e.target.closest(".item");
            let imgSrc = target.querySelector("a").getAttribute("href");

            let pop = document.createElement("aside");
            let pops = `
                <img src=${imgSrc}>
                <span class="close">CLOSE</span>
            `
            pop.innerHTML = pops;
            this.gallery.append(pop);
        });

        this.gallery.addEventListener("click", e=>{
            e.preventDefault();

            let target = e.target.closest("aside");

            if(target !== null){
                let close = target.querySelector(".close");
                if(e.target == close) target.remove();
            }
        });

        // this.main.on("click", ()=>{
        //     this.type = "interest",
        //     this.tag = "interest";
        //     this.loadingImg.removeClass("off");
        //     this.photoBox.removeClass("on");
            
        //     this.getList();
        // });

        // this.tabBox.find("li a").on("click", e=>{
        //     e.preventDefault();
        //     this.tag = $(e.currentTarget).text();
        //     this.loadingImg.removeClass("off");
        //     this.photoBox.removeClass("on");
        //     this.tabBox.find("li a").removeClass("on");
        //     $(e.currentTarget).addClass("on");
        
        //     this.getList();
        // });
    }
    
    getList(){
        let url;
    
        if(this.type == "interest"){
            url = `https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${this.api_key}&per_page=${this.totalImg}&format=${this.datatype}&nojsoncallback=1&privacy_filter=1`
        }
        if(this.type == "search"){
            url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.api_key}&per_page=${this.totalImg}&format=${this.datatype}&nojsoncallback=1&privacy_filter=1&tags=${this.tag}&user_id=${this.user_id}`
        }
    
        fetch(url)
        .then(data=>{
            let result = data.json();
            return result;
        }).then(json=>{
            let items = json.photos.photo;

            this.createList(items);
        })
    }
    createList(items){
        let htmls ="";

        items.map(data=>{
            htmls += `
                <li class='item'>
                    <a href="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg" title="새창열림">
                        <img src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_w.jpg">
                    </a>
                    <h2>${data.title}</h2>
                    <h3>
                        CATEGORY |
                        <span>${this.tag}</span>
                        <span class="id">${data.owner}</span>
                    </h3>
                </li>
            `
        });
        this.photoBox.innerHTML = htmls;
        this.loadImg();
    }
    
    loadImg(){
        let imgNum = 0;
    
        this.photoBox.querySelectorAll("img").forEach((data)=>{
            data.onload = ()=>{
                imgNum++;
    
                if (imgNum == this.totalImg){
                    this.loadingImg.classList.add("off");
                }
                this.photoBox.classList.add("on");
            }
        });
    }
}