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
        this.frame = $(opt.frame);
        this.key = opt.key;
        this.playlist = opt.playlist;
        this.num = opt.num;
    }

    bindingEvent(){
        this.createVid();

        $("body").on("click", this.frame.selector +(" article .play"), e=>{
            e.preventDefault();
        
            let vidId = $(e.currentTarget).parent().find("a").attr("href");
        
            $("body").append(
                $("<div class='pop'>").append(
                    $("<iframe>").attr({
                        src: "https://www.youtube.com/embed/"+ vidId,
                        width: "100%",
                        height: "100%",
                        frameborder: 0,
                        allowfullscreen: true,
                    }),
                    $("<span class='close'>").text("CLOSE")
                )
            )
        });
        
        $("body").on("click", ".close", ()=>{
            $(".pop").remove();
        })
    }

    createVid(){
        $.ajax({
            url:"https://www.googleapis.com/youtube/v3/playlistItems",
            dataType: "jsonp",
            data: {
                part: "snippet",
                key: this.key,
                maxResults: this.num,
                playlistId: this.playlist
            }
        }).success(data=>{
            let items = data.items;
        
            $(items).each((_, data)=>{
                let txt = data.snippet.description;
                let len = txt.length;
        
                if (len > 200){
                    txt = txt.substr(0, 200)+ "..";
                }
        
                $(this.frame).append(
                    $("<article>").append(
                        $("<a>").attr({
                            href : data.snippet.resourceId.videoId
                        }).append(
                            $("<img>").attr({src: data.snippet.thumbnails.high.url})
                        ),
                        $("<h3>").text(data.snippet.title),
                        $("<p>").text(txt),
                        $("<span class='play'>").text("비디오재생").append(
                            $("<i class='fas fa-play'>")
                        )
                    )
                )
            });
        }).error(err=>{
            console.error(err);
        });
    }
}
