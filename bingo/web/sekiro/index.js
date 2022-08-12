const OPTIONS = [
	new Option('Find {0}', S([
		"Gokan's Spiritfall",
		"Yashariku's Spiritfall",
		"Ako's Spiritfall",
		"Gachiin's Spiritfall",
		"Ungo's Spiritfall"
	])),
	new Option('Receive all three items from a hag.'),
	new Option("Complete Kotaro's questline."),
	new Option('Kill {0} Ashina Generals', O([2, 3])),
	new Option('Kill {0} Shichimen Warriors', O([2, 3])),
	new Option('Kill {0} Headless', O([1, 2, 3, 4, 5])),
	new Option('Kill {0} Lone Shadows', O([2, 3, 4])),
	new Option('Kill {0} Drunkards, Gluttons, and/or Red Guards', O([2, 3, 4])),
	new Option('Kill both {0}', S([
		'Centipedes',
		'Snake-Eyes',
		'Seven Ashina Spears',
		'Bulls',
		'Ogres',
		'Ashina Elites',
	])),
	new Option('Defeat {0}', S([
		'Demon of Hatred',
		'Father Owl',
		'Sword Saint',
	])),
	new Option('Find {0}', S([
		'Lotus of the Palace',
		'Shelter Stone', 
		'Aromatic Branch',
		'Frozen Tears',
		'Divine Dragon Tears',
		'Aromatic Flower'
	])),
	new Option('Find {0}', N(2, [
		'Shuriken',
		'Flame Vent',
		'Firecrackers',
		'Shinobi Axe',
		'Mist Raven',
		'Loaded Spear',
		'Sabimaru',
		'Loaded Umbrella',
		'Divine Abduction',
		'Finger Whistle'
	])),
	new Option('Find {0} Ninjutsu', S(['Puppeteer', 'Bloodsmoke', 'Bestowal'])),
	new Option('Collect {0} prayer necklaces', O([5, 6, 7, 8, 9, 10])),
	new Option('Collect {0} gourd seeds', O([5, 6, 7, 8, 9])),
	new Option('Do not exceed {0} Attack Power', O([4, 5, 6, 7, 8])),
	new Option('Collect both Serpent Viscera'),
	new Option('Learn the {0} skill', N(2, [
		'Empowered Mortal Draw',
		'Virtuous Deeds',
		'Most Virtuous Deeds',
		"Nightjar Slash",
		'Projected Force',
		'Chasing Slice',
	])),
	new Option('Find {0} ', S([
		'Dragon Tally Board',
		'Water of the Palace',
		'Rice for Kuro',
		'Dancing Dragon Mask',
		'Great White Whisker',
		'Red Carp Eyes',
	])),
	new Option('Do not use either Mortal Draw'),
	new Option('Possess at least {0} sen at some point', R(5000, 15000)),
	new Option('Find {0}', S(['Purple Gourd', 'Green Gourd', 'Red Gourd'])),
	new Option('Collect {0} carp scales', R(5, 20)),
	new Option('Defeat {0} bosses with Bell Demon (not Shizu/Noble)', O([1, 2, 3])),
	new Option('Upgrade to the {0}', S([
		'Lazulite Axe',
		'Sparking Axe',
		'Spring-load Axe',
		'Phantom Kunai',
		'Sen Throw',
		'Gouging Top',
		'Lazulite Shuriken',
		'Spinning Shuriken',
		'Spiral Spear',
		'Leaping Flame',
		'Loaded Spear Thrust Type',
		'Loaded Spear Cleave Type',
		"Phoenix's Lilac Umbrella",
		"Suzaku's Lotus Umbrella",
		'Loaded Umbrella - Magnet',
		"Okinaga's Flame Vent",
		'Lazulite Sacred Flame',
		'Spring-load Flame Vent',
		'Long Spark',
		'Sprig-load Firecracker',
		'Purple Fume Spark',
		'Lazulite Sabimaru',
		'Piercing Sabimaru',
		'Improved Sabimaru',
		'Aged Feather Mist Raven',
		'Great Feather Mist Raven',
		'Golden Vortex',
		'Double Divine Abduction',
		'Malcontent',
		'Mountain Echo'
	])),
	new Option('Find {0}', new SelectN(2, [
		'Black Scroll',
		"Dosaku's Note",
		"Flame Barrel Memo",
		"Fragrant Flower Note",
		"Tomoe's Note",
		"Herb Catalogue Scrap",
		"Holy Chapter: Dragon's Return",
		"Holy Chapter: Infested",
		"Immortal Severance Scrap",
		"Immortal Severance Text",
		"Isshin's Letter",
		"Nightjar Beacon Memo",
		"Okami's Ancient Text",
		"Ornamental Letter",
		"Rat Description",
		"Rotting Prisoner's Note",
		"Sabimaru Memo",
		"Surgeon's Stained Letter",
		"Three-Story Pagoda Memo",
		"Valley Apparitions Memo"
	])),
	new Option('Kill {0} memory bosses in one attempt', O([1, 2, 3])),
	new Option('Kill {0} minibosses in one attempt (not Shizu/Noble)', O([4, 5, 6])),
	new Option('Kill a boss without attacking (except deathblows)'),
	new Option('Kill a boss without blocking/deflecting (not Shizu/Noble)'),
	new Option('Accumulate 10 skill points (20 if skills are items)'),
	new Option('Never use a temporary buff item'),
	new Option('Never use a healing consumable {0}', S(['', 'except Pellets'])),
	new Option('Never use a prosthetic tool'),
	new Option('Never use a stealth kill'),
	new Option('Do not exceed {0} gourd charges', O([3, 4, 5])),
]

var BINGO = new Bingo(OPTIONS);

function main() {
	BINGO.generate();
	BINGO.write_to_board()
}

function seed() {
	var text = document.getElementById("seed").value;
	BINGO = new Bingo(OPTIONS, text);
	main();
}

document.addEventListener('DOMContentLoaded', main, false);
