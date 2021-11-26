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
        this.gallery = $(opt.selector);
        this.main = $(opt.main);
        this.tabBox = $(opt.tabBox);
        this.photoBox = $(opt. photoBox);
        this.loadingImg = $(opt. loadingImg);
        this.api_key = opt.api_key,
        this.user_id = opt.user_id;
        this.type = opt.type;
        this.tag = opt.tag;
        this.totalImg = opt.totalImg;
    }
    
    bindingEvent(){
        this.getList();
        
        this.gallery.find("button").on("click", ()=>{
            this.tag = this.gallery.find("input").val();
        
            if(!this.tag){
                alert("검색어를 입력해 주세요.");
                return;
            }
            this.loadingImg.removeClass("off");
            this.photoBox.removeClass("on");
            this.user_id = "";
        
            this.getList();
        });
        
        $(window).on("keypress", e=>{
            if(e.key == "Enter"){
                this.tag = this.gallery.find("input").val();
        
                if(!this.tag){
                    alert("검색어를 입력해 주세요.");
                    return;
                }
                this.loadingImg.removeClass("off");
                this.photoBox.removeClass("on");
                this.user_id = "";
        
                this.getList();
            }
        });
        
        $("body").on("click", this.photoBox.selector +(" li"), e=>{
            e.preventDefault();
        
            let imgSrc = $(e.currentTarget).find("a").attr("href");
        
            $(".pop").remove();
            $("body").append(
                $("<div class='pop'>").append(
                    $("<img>").attr({src: imgSrc}),
                    $("<span>").text("CLOSE")
                )
            )
        });
        
        $("body").on("click", ".pop span", ()=>{
            $(".pop").remove();
        });

        this.main.on("click", ()=>{
            this.type = "interest",
            this.tag = "interest";
            this.loadingImg.removeClass("off");
            this.photoBox.removeClass("on");
            
            this.getList();
        });

        this.tabBox.find("li a").on("click", e=>{
            e.preventDefault();
            this.tag = $(e.currentTarget).text();
            this.loadingImg.removeClass("off");
            this.photoBox.removeClass("on");
            this.tabBox.find("li a").removeClass("on");
            $(e.currentTarget).addClass("on");
        
            this.getList();
        });
    }
    
    getList(){
        let result_opt = {};
    
        if(this.type == "interest"){
            result_opt = {
                url: "https://www.flickr.com/services/rest/?method=flickr.interestingness.getList",
                datatype: "json",
                data: {
                    api_key: this.api_key,
                    per_page: this.totalImg,
                    format: "json",
                    nojsoncallback: 1,
                    privacy_filter: 1,
                }
            }
        }
        if(this.type == "search"){
            result_opt = {
                url: "https://www.flickr.com/services/rest/?method=flickr.photos.search",
                datatype: "json",
                data: {
                    api_key: this.api_key,
                    per_page: this.totalImg,
                    format: "json",
                    nojsoncallback: 1,
                    privacy_filter: 1,
                    tags: this.tag,
                    user_id: this.user_id
                }
            }
        }
    
        $.ajax(result_opt)
        .success(data=>{
            let items = data.photos.photo;
            
            $(this.photoBox).empty();
            $(items).each((_,data)=>{
                let title = data.title;
        
                if(!data.title){
                    title = "No description in this photo"
                }
    
                $(this.photoBox).append(
                    $("<li class='item'>").append(
                        $("<a>").attr({
                            href: "https://live.staticflickr.com/"+ data.server +"/"+ data.id +"_"+ data.secret +"_b.jpg",
                            title: "새창열림"
                        }).append(
                            $("<img>").attr({
                                src: "https://live.staticflickr.com/"+ data.server +"/"+ data.id +"_"+ data.secret +"_w.jpg"
                            })
                        ),
                        $("<h2>").text(title),
                        $("<h3>").text("CATEGORY |").append(
                            $("<span>").text(this.tag),
                            $("<span class='id'>").text(data.owner)
                        )
                    )
                );
            });
            this.loadImg();
        }).error(err=>{
            console.error("데이터를 불러오지 못했습니다.");
        });
    }
    
    loadImg(){
        let imgNum = 0;
    
        this.photoBox.find("img").each((_, data)=>{
            data.onload = ()=>{
                imgNum++;
    
                if (imgNum == this.totalImg){
                    this.loadingImg.addClass("off");
                }
                this.photoBox.addClass("on");
            }
        });
    }
}