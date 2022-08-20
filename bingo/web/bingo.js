const INACTIVE = 'bingo-inactive';
const ACTIVE = 'bingo-active';

/// The abstract base class of various ways of describing bingo options.
///
/// Option classes are immutable. When it's time to generate squares for a new
/// board, the `build()` method is called to return a mutable generator that can
/// track state over time (for example, to ensure the same option isn't selected
/// more than once).
class Option {
  static wrap(item) {
    return item instanceof Option ? item : new Unique(item);
  }

  /// Returns a generator object given a random number generator. In addition to
  /// storing private state, this object must expose a `select()` method that
  /// returns either a new unique option or null/undefined to indicate that the
  /// generator is exhausted and cannot generate any more squares.
  ///
  /// It may also expose a `weight` getter that's used to determine its relative
  /// likelihood of being selected. If it doesn't, the weight defaults to 100.
  /* build(rng); */
}

class Select extends Option {
	constructor(items) {
		super();
		this.items = items.map(Option.wrap);
	}

	build(rng) {
		return {
			generators: this.items.map(item => item.build(rng)),
			select() {
				while (this.generators.length > 0) {
					const indices = Object.keys(this.generators);
					const i = rng.weighted(indices, this.generators.map(generator => generator.weight ?? 100));
					const result = this.generators[i].select();
					if (result) return result;

					this.generators.splice(i, 1);
				}
				return null;
			},
			toString: () => this.toString(),
		};
	}

	toString() {
		return `S([${this.items}])`;
	}
}

class SelectN extends Select {
	constructor(n, items) {
		super(items);
		this.n = n;
	}

	build(rng) {
		return {
			parent: super.build(rng),
			n: this.n,
			select() {
				if (this.n === 0) return null;
				this.n--;
				return this.parent.select();
			},
			toString: () => this.toString(),
		};
	}

	toString() {
		return `N(${this.n}, [${this.items}])`;
	}
}

class Range extends Option {
	constructor(min, max) {
		super();
		this.min = min;
		this.max = max;
	}

	build(rng) {
		return {
			min: this.min,
			max: this.max,
			select() {
				if (this.done) return null;
				this.done = true;
				return rng.integer({min: this.min, max: this.max});
			},
			toString: () => this.toString(),
		};
	}

	toString() {
		return `R(${this.min}, ${this.max})`;
	}
}

/// Formats a string with values selected from other `Option` objects.
class Format extends Option {
	constructor(format, ...options) {
		super();
		this.format = format;
		this.options = options;
	}

	build(rng) {
		return {
			format: this.format,
			options: this.options.map(option => option.build(rng)),
			select() {
				var str = this.format;
				for (let i = 0; i < this.options.length; i++) {
					// Allow the option format to specify the same number multiple
					// times to select different values from the options.
					const occurrences = str.split(`{${i}}`).length - 1;
					for (let j = 0; j < occurrences; j++) {
						const choice = this.options[i].select();
						if (!choice) return null;
						str = str.replace(`{${i}}`, choice);
					}
				}
				return str;
			},
			toString: () => this.toString(),
		};
	}

	toString() {
		return `F(${JSON.stringify(this.format)}, ${this.options})`;
	}
}

/// Wraps another option and gives it a specific weight. Can take multiple
/// weights, which are used in order as more items are selected.
class Weight extends Option {
	constructor(weights, option) {
		super();
		this.weights = weights instanceof Array ? weights : [weights];
		this.option = Option.wrap(option);
	};

	build(rng) {
		return {
			_inner: this.option.build(rng),
			_weights: this.weights,
			get weight() {
				return this._weights[0];
			},
			select() {
				if (this._weights.length > 0) this._weights.shift();
				return this._inner.select();
			},
			toString: () => this.toString(),
		};
	}

	toString() {
		return `W(${this.weights}, ${this.option})`;
	}
}

/// A special class that adds a tag to an option's result. The bingo board will
/// be modified to avoid containing more than three options tagged this way in a
/// line (row, column, or diagonal).
class ThreeMaxInALine extends Option {
	constructor(option) {
		super();
		this.option = Option.wrap(option);
	};

	build(rng) {
		return {
			_inner: this.option.build(rng),
			get weight() {
				return this._inner.weight;
			},
			select() {
				let result = this._inner.select();
				if (!result) return result;
				result = new String(result);
				result.threeMaxInALine = true;
				return result;
			},
			toString: () => this.toString(),
		};
	}

	toString() {
		return `ThreeMaxInALine(${this.option})`;
	}
}

/// A single bingo option that can be selected exactly once. This doesn't need
/// to be instantiated manually, since `new Select()` will automatically
/// translate plain strings into `Unique` options.
class Unique extends Option {
	constructor(value) {
		super();
		this.value = value;
	}

	build(rng) {
		return {
			value: this.value,
			select() {
				if (this.done) return null;
				this.done = true;
				return this.value;
			},
			toString: () => this.toString(),
		};
	}

	toString() {
		return JSON.stringify(this.value);
	}
}

function S(items) { return new Select(items); }
function O(items) { return new SelectN(1, items); }
function N(n, items) { return new SelectN(n, items); }
function R(min, max) { return new Range(min, max); }
function F(format, ...options) { return new Format(format, ...options); }
function W(weights, option) { return new Weight(weights, option); }

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
	constructor(option, seed=-1) {
		this.option = option;
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
		this.goals = [];
		const generator = this.option.build(this.rng);
		for (var i = 0; i < 5; ++i) {
			for (var k = 0; k < 5; ++k) {
				while (true) {
					var choice = generator.select();
					this.goals.push({"name": choice});
					break;
				}
			}
		}
		this.rng.shuffle(this.goals);
		this.ensureThreeMaxInALine();
	}

	ensureThreeMaxInALine() {
		function row(number) {
			return [
				number * 5,
				number * 5 + 1,
				number * 5 + 2,
				number * 5 + 3,
				number * 5 + 4,
			];
		}

		function column(number) {
			return [
				number,
				5 + number,
				10 + number,
				15 + number,
				20 + number,
			];
		}

		const checkLine = indexes => {
			const problems = indexes.filter(i => this.goals[i].name.threeMaxInALine);
			if (problems.length <= 3) return true;

			// Choose an index to swap out.
			const i = this.rng.pick(problems);

			// Choose an index to swap in.
			const j = this.rng.pick([...new Array(25).keys()].filter(i =>
				!this.goals[i].name.threeMaxInALine && !indexes.includes(i)));

			console.log(`swapping "${this.goals[i].name}" with "${this.goals[j].name}"`);
			const tmp = this.goals[j];
			this.goals[j] = this.goals[i];
			this.goals[i] = tmp
			return false;;
		};

		// Check each line and makes a random swap if any of them have
		// too many three-max options. Do this up to 30 times before
		// giving up and regenerating the entire board.
		for (let i = 0; i < 30; i++) {
			if (!checkLine(row(0))) continue;
			if (!checkLine(row(1))) continue;
			if (!checkLine(row(2))) continue;
			if (!checkLine(row(3))) continue;
			if (!checkLine(row(4))) continue;
			if (!checkLine(column(0))) continue;
			if (!checkLine(column(1))) continue;
			if (!checkLine(column(2))) continue;
			if (!checkLine(column(3))) continue;
			if (!checkLine(column(4))) continue;
			if (!checkLine([0, 6, 12, 18, 24])) continue;
			if (!checkLine([4, 8, 12, 16, 20])) continue; 

			// Once we get here, we've ensured that all lines in the
			// bingo board have three or fewer ThreeMaxInALine
			// options.
			return;
		}

		this.generate();
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
