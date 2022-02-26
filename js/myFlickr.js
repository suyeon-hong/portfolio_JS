class MyFlickr {
	constructor(opt) {
		if (!opt.selector || !opt.api_key) {
			console.error("selector값과 api_key값은 필수 입력사항 입니다.");
			return;
		}
		if (!opt.type) opt.type = "interest";
		this.init(opt);
		this.bindingEvent(opt);
	}

	init(opt) {
		this.gallery = document.querySelector(opt.selector);
		this.btnMain = document.querySelector(opt.btnMain);
		this.tabBox = document.querySelector(opt.tabBox);
		this.photoBox = document.querySelector(opt.photoBox);
		this.loadingImg = document.querySelector(opt.loadingImg);
		(this.api_key = opt.api_key), (this.user_id = opt.user_id);
		this.datatype = "json";
		this.type = opt.type;
		this.tag = opt.tag;
		this.totalImg = opt.totalImg;
	}

	bindingEvent(opt) {
		this.getList();

		this.gallery.querySelector("button").addEventListener("click", () => {
			this.checkInputValue(opt.type);
			this.getList();
		});

		window.addEventListener("keypress", (e) => {
			if (e.key == "Enter") {
				this.checkInputValue(opt.type);
				this.getList();
			}
		});

		this.photoBox.addEventListener("click", (e) => this.createPop(e));

		this.gallery.addEventListener("click", (e) => this.removePop(e));

		this.btnMain.addEventListener("click", () => {
			(this.type = "interest"), (this.tag = "interest");
			this.loadingImg.classList.remove("off");
			this.photoBox.classList.remove("on");

			for (let el of this.tabBox.querySelectorAll("li a"))
				el.classList.remove("on");

			this.getList();
		});

		this.tabBox.querySelectorAll("li a").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				e.preventDefault();

				this.type = opt.type;
				this.user_id = opt.user_id;
				this.tag = e.currentTarget.innerText;
				this.loadingImg.classList.remove("off");
				this.photoBox.classList.remove("on");

				for (let el of this.tabBox.querySelectorAll("li a"))
					el.classList.remove("on");
				btn.classList.add("on");

				this.getList();
			});
		});
	}

	getList() {
		let url;

		if (this.type == "interest") {
			url = `https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${this.api_key}&per_page=${this.totalImg}&format=${this.datatype}&nojsoncallback=1&privacy_filter=1`;
		}
		if (this.type == "search") {
			url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.api_key}&per_page=${this.totalImg}&format=${this.datatype}&nojsoncallback=1&privacy_filter=1&tags=${this.tag}&user_id=${this.user_id}`;
		}

		fetch(url)
			.then((data) => {
				let result = data.json();
				return result;
			})
			.then((json) => {
				let items = json.photos.photo;

				this.createList(items);
			});
	}

	createList(items) {
		let htmls = "";

		items.map((data) => {
			if (!data.title) data.title = "THIS PICTURE HAS NO TITLE";

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
            `;
		});
		this.photoBox.innerHTML = htmls;
		this.loadImg();
	}

	loadImg() {
		let imgNum = 0;

		this.photoBox.querySelectorAll("img").forEach((data) => {
			data.onload = () => {
				imgNum++;

				if (imgNum == this.totalImg) {
					this.loadingImg.classList.add("off");
				}
				this.photoBox.classList.add("on");
			};
		});
	}

	createPop(e) {
		e.preventDefault();

		if (e.target !== e.target.closest(".item").querySelector("img")) return;

		let target = e.target.closest(".item");
		let imgSrc = target.querySelector("a").getAttribute("href");

		let pop = document.createElement("aside");
		let pops = `
            <img src=${imgSrc}>
            <span class="close">CLOSE</span>
        `;
		pop.innerHTML = pops;
		this.gallery.append(pop);
	}

	removePop(e) {
		e.preventDefault();

		let target = e.target.closest("aside");

		if (target !== null) {
			let close = target.querySelector(".close");
			if (e.target == close) target.remove();
		}
	}

	checkInputValue(type) {
		this.tag = this.gallery.querySelector("input").value;

		if (!this.tag) {
			alert("검색어를 입력해 주세요.");
			return;
		}
		this.type = type;
		this.loadingImg.classList.remove("off");
		this.photoBox.classList.remove("on");
		this.user_id = "";
	}
}
