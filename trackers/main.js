icons = document.getElementsByClassName("icon");

function getImages(list) {
	var newlist = [];
	for (var i = 0; i < list.length; ++i) {
		console.log(list[i].tagName);
		if (list[i].tagName == 'IMG') {
			newlist.push(list[i])
		}
	}
	return newlist;
}


class Icon {
	constructor(telem) {
		this.cell = telem;
		this.icon = telem.getElementsByTagName('img')[0];
		this.icon.style["filter"] = "grayscale(100%)";
		this.icon.style["opacity"] = 0.5;
		this.active = false;
	}

	do_swap() {
		this.active = !this.active;
		if (this.active) {
			this.activate();
		} else {
			this.deactivate();
		}
	}

	activate() {
		this.icon.style["filter"] = "grayscale(0%)";
		this.icon.style["opacity"] = 1.0;
	}

	deactivate() {
		this.icon.style["filter"] = "grayscale(100%)";
		this.icon.style["opacity"] = 0.5;
	}
}


for (let item of icons) {
	let icon = new Icon(item);

	item.onclick = function() { 
		icon.do_swap();
	}
}
