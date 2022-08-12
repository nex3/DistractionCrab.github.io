const INACTIVE = 'bingo-inactive';
const ACTIVE = 'bingo-active';

class Select {
	constructor(items) {
		this.items = items;
	}

	count() {
		return this.items.length;
	}

	select(rng) {
		return rng.pickone(this.items);
	}
}

class SelectOne extends Select {
	count() {
		return 1;
	}
}

class SelectN extends Select {
	constructor(n, items) {
		super(items);
		this.n = n;
	}
	count() {
		return this.n;
	}
}

class Range {
	constructor(min, max) {
		this.min = min;
		this.max = max;
	}

	count() {
		return 1;
	}

	select(rng) {
		return rng.integer({ min: this.min, max: this.max })
	}
}

function S(items) { return new Select(items); }
function O(items) { return new SelectOne(items); }
function N(n, items) { return new SelectN(n, items); }
function R(min, max) { return new Range(min, max); }

class Option {
	// Weight starts at 100 so that any value between 0 to 100 will give a relative percentage that
	// can be somewhat intuitively understood.
	constructor(desc, weight) {
		this.desc = desc;
		this.weight = weight;
		this.options = [...arguments].slice(2);
	}

	count() {
		if (this.options.length > 0) {
			var m = 1;
			for (var k = 0; k < this.options.length; ++k) {
				m *= this.options[k].count();
			}
			return m;
		} else {
			return 1;
		}
	}

	select(rng) {
		if (this.options.length > 0) {
			var str = this.desc;
			for (var i = 0; i < this.options.length; ++i) {
				str = str.replace(`{${i}}`, this.options[i].select(rng));
			}

			return str;
		} else {
			return this.desc;
		}
	}
}

function randInt(i) {
	return Math.floor(Math.random() * i);
}

class CellState {
	constructor() {
		this.state = 0;
		this.max_state = 3;
		this.colors = [
			'black',
			'green',
			'red'
		];
	}

	increment() {
		this.state = (this.state + 1) % this.max_state;
	}

	get_color() {
		return this.colors[this.state];
	}
}

class Bingo {
	constructor(options, seed=-1) {
		this.options = options;
		this.goals = []
		if (seed < 0) {
			this.rng = chance;
		} else {
			this.rng = new Chance(seed);
		}
	}

	get_goal_string() {
		return JSON.stringify(this.goals);
	}

	write_to_board() {
		const table = document.getElementById('bingo-table');
		for (var i = 0; i < 5; ++i) {
			const row = table.rows[i];
			for (var k = 0; k < 5; ++k) {
				const col = row.cells[k];
				col.innerHTML = this.goals[i + 5*k]["name"];
			}
		}
		this.add_listeners();
	}

	generate() {
		var choices = [];
		var counts  = new Array(this.options.length).fill(0);
		const table = document.getElementById('bingo-table');
		const weights = this.options.map(x => x.weight);
		//console.log(weights.toString())

		for (var i = 0; i < 5; ++i) {
			const row = table.rows[i];
			for (var k = 0; k < 5; ++k) {
				var filled = false;
				const col = row.cells[k];
				while (!filled) {
					const c = randInt(this.options.length);
					if (counts[c] < this.options[c].count()) {
						//var opt = this.options[c].select();
						var opt = this.rng.weighted(this.options, weights).select(this.rng);
						//var opt = this.rng.pickone(this.options).select(this.rng);
						//console.log(opt)
						if (!choices.includes(opt)) {
							counts[c] += 1;
							choices.push(opt);
							filled = true;
							this.goals.push({"name": opt});
						}
					}
				}
			}
		}
		//shuffleArray(this.goals);
		this.rng.shuffle(this.goals);
	}

	add_listeners() {
		const table = document.getElementById('bingo-table');

		for (var i = 0; i < 5; ++i) {
			const row = table.rows[i];
			for (var k = 0; k < 5; ++k) {
				const col = row.cells[k];
				let state = new CellState();
				col.onclick = function(event) {
					const elem = event.target;
					state.increment();
					elem.style.backgroundColor = state.get_color();
				};
			}
		}	
	}
}




function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
