const INACTIVE = 'bingo-inactive';
const ACTIVE = 'bingo-active';
const MINE_COUNT = 8;
const GOLD_COUNT = 8;

const COMMAND_ID = "c8543947-7c45-4cb6-8012-d5113db1db62";



function randInt(m) {
	return Math.floor(Math.random() * m);
}


function randInt(i) {
	return Math.floor(Math.random() * i);
}

class CellState {
	constructor(elem, ismine, istreasure, hint, position) {
		this.position = position;
		this.ismine = ismine;
		this.hint = hint;
		this.istreasure = istreasure;
		this.elem = elem;
		this.state = 0;
		this.max_state = 2;
		this.colors = [
			'black',
			'green',
			//'red'
		];
	}

	increment() {
		this.state = (this.state + 1) % this.max_state;
	}

	get_color() {
		return this.colors[this.state];
	}

	click() {
		this.click_no_comm();
		

		const http = new XMLHttpRequest();
		const url = `http://localhost:8911/api/commands/${COMMAND_ID}`

		http.open("POST", url, true);
		http.setRequestHeader("Content-type", 'application/json; charset=utf-8');

		var sqval = "none";
		if (this.state == 0) {
			sqval = "unclick";
		} else {
			if (this.ismine) {
				sqval = "mine";
			} else if (this.istreasure) {
				sqval = "treasure";
			} else {
				sqval = "none";
			}
		}
		

		http.send(`["click", "r${this.position[0]+1}c${this.position[1]+1}", "${sqval}"]`);
	}

	click_no_comm() {
		this.increment();

		this.elem.style.backgroundColor = this.get_color();

		if (this.state == 1 && this.ismine) {
			this.elem.style.backgroundImage = "url('images/mine.png')";	
		} else if (this.state == 1 && this.istreasure) {
			this.elem.style.backgroundImage = "url('images/treasure.png')";	
		} else {
			if (this.state == 1) {
				this.elem.style.backgroundImage = `url('images/mines - ${this.hint}.png')`;
			} else {
				this.elem.style.backgroundImage = "";		
			}
		}
	}
}

function isCoord(i, k) {
	return !(i < 0 || i > 4 || k < 0 || k > 4);
}

function computeHints() {
	var hints = Array(5).fill().map(() => Array(5).fill(0));

	for (var i = 0; i < 5; ++i) {
		for (var k = 0; k < 5; k++) {
			var count = 0;


			if (isCoord(i, k+1) && GOALS[i][k+1][1] == -1) {
				count += 1;
			}
			if (isCoord(i, k-1) && GOALS[i][k-1][1] == -1) {
				count += 1;
			}


			if (isCoord(i-1, k) && GOALS[i-1][k][1] == -1) {
				count += 1;
			}
			if (isCoord(i-1, k-1)  && GOALS[i-1][k-1][1] == -1) {
				count += 1;
			}
			if (isCoord(i-1, k+1) && GOALS[i-1][k+1][1] == -1) {
				count += 1;
			}
			
			if (isCoord(i+1, k+1) && GOALS[i+1][k+1][1] == -1) {
				count += 1;
			}
			if (isCoord(i+1, k-1) && GOALS[i+1][k-1][1] == -1) {
				count += 1;
			}
			if (isCoord(i+1, k) && GOALS[i+1][k][1] == -1) {
				count += 1;
			}
			hints[i][k] = count;
		}
	}

	return hints;
}

class Bingo {
	constructor() {
	}

	generate() {
		const table = document.getElementById('bingo-table');

		for (var i = 0; i < 5; ++i) {
			const row = table.rows[i];
			for (var k = 0; k < 5; ++k) {
				const col = row.cells[k];
				var opt = GOALS[i][k][0];
				col.innerHTML = opt + col.innerHTML;
				var index = 5*i + k;
				var o = { name: opt};
				//this.goalList[index] = o;
			}
		}
	}

	add_listeners() {
		const table = document.getElementById('bingo-table');
		const hints = computeHints();

		for (var i = 0; i < 5; ++i) {
			const row = table.rows[i];
			for (var k = 0; k < 5; ++k) {
				const col = row.cells[k];
				const [goal, type] = GOALS[i][k];
				let state = new CellState(
					col, 
					type == -1, 
					type == 1, 
					hints[i][k],
					[i, k]);
				col.onclick = function(event) {
					state.click();
				};

				if (CLICKED[5*i + k] != 0) {
					state.click_no_comm()
				}
			}
		}	
	}

	get_goal_string() {
		return JSON.stringify(this.goalList);
		return this.goalList.toString();
	}
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}