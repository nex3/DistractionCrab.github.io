const INACTIVE = 'bingo-inactive';
const ACTIVE = 'bingo-active';

class Select {
	constructor(items) {
		this.items = items;
	}

	count() {
		return this.items
			.map(item => typeof item === 'object' ? item : 1)
			.reduce((a, b) => a + b);
	}

	select(rng) {
		const choice = rng.pickone(this.items);
		return typeof choice === 'object' ? choice.select(rng) : choice;
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
		if (!weight) throw new Error("An Option must have a weight.");

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
				// Allow the option format to specify the same number multiple
				// times to select different values from the options.
				const seen = new Set();
				str = str.replaceAll(`{${i}}`, () => {
					while (true) {
						const choice = this.options[i].select(rng);
						if (seen.has(choice)) continue;
						seen.add(choice);
						return choice;
					}
				});
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
		var counts  = new Map();
		const table = document.getElementById('bingo-table');
		const weights = this.options.map(x => x.weight);
		console.log(weights.toString())

		for (var i = 0; i < 5; ++i) {
			for (var k = 0; k < 5; ++k) {
				while (true) {
					const option = this.rng.weighted(this.options, weights);
					if (!counts.has(option)) counts.set(option, 0);
					const count = counts.get(option);
					if (count >= option.count()) continue;

					var opt = option.select(this.rng);
					if (choices.includes(opt)) continue;

					counts.set(option, count + 1);
					choices.push(opt);
					this.goals.push({"name": opt});
					break;
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
