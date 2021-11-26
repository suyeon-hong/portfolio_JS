const mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new kakao.maps.LatLng(37.545566976145004, 127.22368010224646),
        level: 3
    };
const map = new kakao.maps.Map(mapContainer, mapOption);
const tBtn = document.querySelector(".location .traffic");

// 교통정보 보기 버튼
map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
tBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    let isOn = tBtn.classList.contains("on");
    if(isOn){
        tBtn.classList.remove("on");
        map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }else{
        tBtn.classList.toggle("on");
        map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    }
})

// 마커 표시
const map_btns = document.querySelectorAll(".location .tabmenu li");
const positions = [
    {
        title: '스타필드 하남', 
        latlng: new kakao.maps.LatLng(37.545566976145004, 127.22368010224646),
        button: map_btns[0]
    },
    {
        title: '스타필드 코엑스몰', 
        latlng: new kakao.maps.LatLng(37.511354442426004, 127.05978822539129),
        button: map_btns[1]
    },
    {
        title: '스타필드 시티 위례', 
        latlng: new kakao.maps.LatLng(37.48010154291463, 127.14840202223859),
        button: map_btns[2]
    }
];
const imageSrc = "img/marker_icon.png";

for (let i = 0; i < positions.length; i ++) {
    let imageSize = new kakao.maps.Size(40, 40);
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    let marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title : positions[i].title,
        image : markerImage
    });
    map_btns[i].addEventListener("click", ()=>{
        for (let k = 0; k < map_btns.length; k++){
            map_btns[k].classList.remove("on");
        }
        positions[i].button.classList.add("on");
        $(".address h2").text($(map_btns[i]).find("h2").text());
        $(".address address").text($(map_btns[i]).find("address").text());
        $(".address p").text($(map_btns[i]).find("p").text());
        panTo(positions[i].latlng);
    });
}


// 지도타입 컨트롤 버튼
const mapTypeControl = new kakao.maps.MapTypeControl();
const zoomControl = new kakao.maps.ZoomControl();

map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

window.addEventListener("resize", ()=>{
    for (let i = 0; i < positions.length; i ++) {
        let target = document.querySelector(".location .tabmenu li.on");
        let index = target.getAttribute("data-index");
        panTo(positions[index].latlng);
    }
})

// 지도위치 이동
function panTo(target) {
    map.panTo(target);            
}  