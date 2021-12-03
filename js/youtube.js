class MyYoutube{
    constructor(opt){
        if(!opt.frame || !opt.key){
            console.error("frame값과 key값은 필수 입력사항 입니다.");
            return;
        }
        if(!opt.playlist) opt.playlist = "PLbO44G2j_RJzPLODoK6qiJwJ39JK4JyCY";
        if(!opt.num) opt.num = 10;
        this.init(opt);
        this.bindingEvent();
    }
    init(opt){
        this.body = document.querySelector("body");
        this.frame = document.querySelector(opt.frame);
        this.key = opt.key;
        this.playlist = opt.playlist;
        this.num = opt.num;
    }
    bindingEvent(){
        this.createVid();

        this.frame.addEventListener("click", e=>this.createPop(e));

        this.body.addEventListener("click", e=>this.removePop(e));
    }
    createVid(){
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${this.key}&part=snippet&playlistId=${this.playlist}&maxResults=${this.num}`;

        fetch(url)
        .then(data=>{
            return data.json();
        })
        .then(json=>{
            const items = json.items;
            let htmls = "";

            items.forEach(item=>{
                let txt = item.snippet.description;
                
                if(txt.length > 200) txt = txt.substr(0, 200) + "..";

                htmls += `
                    <article>
                        <a href=${item.snippet.resourceId.videoId}>
                            <img src=${item.snippet.thumbnails.high.url}>
                        </a>
                        <h3>${item.snippet.title}</h3>
                        <p>${txt}</p>
                        <span class="play">
                            비디오재생
                            <i class='fas fa-play'></i>
                        </span>
                    </article>
                `;
            });
            this.frame.innerHTML += htmls;
        });
    }
    createPop(e){
        if(e.target.nodeName !== "SPAN") return;

        const vidId = e.target.closest("article").querySelector("a").getAttribute("href");
        const pop = document.createElement("aside");
        pop.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${vidId}" width="100%" height="100%" frameborder=0 allowfullscreen=true></iframe>
            <span class="close">CLOSE</span>
        `;
        this.body.append(pop);
    }
    removePop(e){
        const pop = this.body.querySelector("aside");
        if(pop == null) return;

        const closeBtn = pop.querySelector(".close");
        if(e.target == closeBtn) pop.remove();
    }
}
