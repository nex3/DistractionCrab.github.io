const OPTIONS = [
	new Option('Find {0}', 100, S([
		"Gokan's Spiritfall",
		"Yashariku's Spiritfall",
		"Ako's Spiritfall",
		"Gachiin's Spiritfall",
		"Ungo's Spiritfall"
	])),
	new Option("Complete Kotaro's questline (any ending)", 100),
	new Option('Kill {0} Ashina Generals', 100, O([2, 3])),
	new Option('Kill {0} Shichimen Warriors', 100, O([2, 3])),
	new Option('Kill {0} Headless', 100, O([1, 2, 3, 4, 5])),
	new Option('Kill {0} Lone Shadows', 100, O([2, 3, 4])),
	new Option('Kill {0} Drunkards, Gluttons, and/or Red Guards', 100, O([2, 3, 4])),
	new Option('Kill both {0}', 100, S([
		'Centipedes',
		'Snake-Eyes',
		'Seven Ashina Spears',
		'Bulls',
		'Ogres',
		'Ashina Elites',
	])),
	new Option('Defeat {0}', 100, S([
		'Demon of Hatred',
		'Father Owl',
		'Sword Saint',
	])),
	new Option('Find {0}', 100, S([
		'Lotus of the Palace',
		'Shelter Stone', 
		'Aromatic Branch',
		'Frozen Tears',
		'Divine Dragon Tears',
		'Aromatic Flower'
	])),
	new Option('Find {0}', 100, N(2, [
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
	new Option('Find {0} Ninjutsu', 100, S(['Puppeteer', 'Bloodsmoke', 'Bestowal'])),
	new Option('Collect {0} prayer necklaces', 100, O([5, 6, 7, 8, 9, 10])),
	new Option('Collect {0} gourd seeds', 100, O([5, 6, 7, 8, 9])),
	new Option('Do not exceed {0} Attack Power', 100, O([4, 5, 6, 7, 8])),
	new Option('Collect both Serpent Viscera', 100),
	// 13 total: 9 sakes, 3 monkey boozes, 1 water of the palace
	new Option('Collect {0} beverages', 100, O([5, 6, 7, 8, 9])),
	new Option('Learn the {0} skill', 100, N(2, [
		'Empowered Mortal Draw',
		'Virtuous Deeds',
		'Most Virtuous Deeds',
		"Nightjar Slash",
		'Projected Force',
		'Chasing Slice',
	])),
	new Option('Find {0} ', 100, S([
		'Dragon Tally Board',
		'Water of the Palace',
		'Rice for Kuro',
		'Dancing Dragon Mask',
		'Great White Whisker',
		'Red Carp Eyes',
	])),
	new Option('Do not use either Mortal Draw', 100),
	new Option('Possess at least {0} sen at some point', 100, R(5000, 15000)),
	new Option('Find {0}', 100, S(['Purple Gourd', 'Green Gourd', 'Red Gourd'])),
	new Option('Collect {0} carp scales', 100, R(5, 20)),
	new Option('Defeat {0} bosses with Bell Demon (not Shizu/Noble)', 100, O([1, 2, 3])),
	new Option('Upgrade to the {0}', 100, S([
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
	new Option('Find {0}', 100, new SelectN(2, [
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
	new Option('Kill {0} memory bosses in one attempt', 100, O([1, 2, 3])),
	new Option('Kill {0} minibosses in one attempt (not Shizu/Noble)', 100, O([4, 5, 6])),
	new Option('Kill {0} bosses without taking damage (not Shizu/Noble)', 100, O([4, 5, 6])),
	new Option('Kill a boss without attacking (except deathblows)', 100),
	new Option('Kill a boss without blocking/deflecting (not Shizu/Noble)', 100),
	new Option('Accumulate 10 skill points (20 if skills are items)', 100),
	new Option('Never use a temporary buff item', 100),
	new Option('Never use a healing consumable {0}', 100, S(['', 'except Pellets'])),
	new Option('Never use a prosthetic tool in combat', 100),
	new Option('Never use a stealth kill', 100),
	new Option('Do not exceed {0} gourd charges', 100, O([3, 4, 5])),
	new Option('Kill all enemies {0}', 100, O([
		'in the Senpou Temple attic',
		"in Doujun's cave",
		'guarding Monkey Booze in Bodhisattva Valley',
	]),
	new Option('Kill the miniboss {0}', 100, O([
		'in Temple Grounds without using the rafters',
		'in Bamboo Thicket Slope without leaving the courtyard',
		'on the Ashina Castle stairs without killing the mobs',
	]),
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
