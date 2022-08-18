const OPTIONS = S([
	F('Find {0}', S([
		"Gokan's Spiritfall",
		"Yashariku's Spiritfall",
		"Ako's Spiritfall",
		"Gachiin's Spiritfall",
		"Ungo's Spiritfall"
	])),
	"Complete Kotaro's questline (any ending)",
	N(3, [
		F('Kill {0} Ashina Generals', O([2, 3])),
		F('Kill {0} Shichimen Warriors', O([2, 3])),
		F('Kill {0} Headless', O([1, 2, 3, 4, 5])),
		F('Kill {0} Lone Shadows', O([2, 3, 4])),
		F('Kill {0} Drunkards, Gluttons, and/or Red Guards', O([2, 3, 4])),
		F('Kill both {0}', S([
			'Centipedes',
			'Snake-Eyes',
			'Seven Ashina Spears',
			'Bulls',
			'Ogres',
			'Ashina Elites',
		])),
	]),
	F('Defeat {0}', S([
		'Demon of Hatred',
		'Father Owl',
		'Sword Saint',
		'3 Genichiros',
	])),
	"Kill both mini/bosses in the Guardian Ape's Burrow",
	F('Find {0}', S([
		'Lotus of the Palace',
		'Shelter Stone', 
		'Aromatic Branch',
		'Frozen Tears',
		'Divine Dragon Tears',
		'Aromatic Flower'
	])),
	F('Fit the {0} tool', N(2, [
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
	F('Find {0} Ninjutsu', S(['Puppeteer', 'Bloodsmoke', 'Bestowal'])),
	F('Collect {0} prayer necklaces', O([5, 6, 7, 8, 9, 10])),
	F('Collect {0} gourd seeds', O([5, 6, 7, 8, 9])),
	'Collect both Serpent Viscera',
	// 13 total: 9 sakes, 3 monkey boozes, 1 water of the palace
	F('Collect {0} beverages', R(6, 10)),
	F('Learn the {0} skill', N(2, [
		'Empowered Mortal Draw',
		'Virtuous Deeds',
		'Most Virtuous Deeds',
		"Nightjar Slash",
		'Projected Force',
		'Chasing Slice',
	])),
	F('Find {0} ', S([
		'Dragon Tally Board',
		'Water of the Palace',
		'Rice for Kuro',
		'Dancing Dragon Mask',
		'Great White Whisker',
		'Red Carp Eyes',
	])),
	O([
		F('Possess at least {0} sen at some point', R(5000, 15000)),
		F('Buy all limited-stock items from {0} and {0}', S([
			"Crow's Bed Memorial Mob",
			'Battlefield Memorial Mob',
			'Blackhat Badger',
			'Anayama the Peddler',
			'Fujioka the Info Broker',
			'Dungeon Memorial Mob',
			'Shugendo Memorial Mob',
			'Toxic Memorial Mob',
			'Exiled Memorial Mob',
		])),
	]),
	F('Find {0}', S(['Purple Gourd', 'Green Gourd', 'Red Gourd'])),
	O([
		F('Collect {0} carp scales', R(5, 20)),
		'Buy all items from one Pot Noble',
	]),
	F('Defeat {0} mini/bosses with Bell Demon (not Shizu/Noble)', O([1, 2, 3])),
	F('Upgrade to the {0}', S([
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
	F('Find {0}', new SelectN(2, [
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
	N(3, [
		F('Kill {0} memory bosses in one attempt', O([1, 2, 3])),
		F('Kill {0} minibosses in one attempt (not Shizu/Noble)', O([4, 5, 6])),
		F('Kill {0} mini/bosses without taking damage (not Shizu/Noble)', O([4, 5, 6])),
		'Kill a mini/boss without attacking (except deathblows)',
		'Kill a mini/boss without blocking/deflecting (not Shizu/Noble)',
		'Kill a mini/boss without touching the control stick or arrow keys (not Shizu/Noble)',
		'Kill a mini/boss using only combat arts (not Shizu/Noble)',
	]),
	F('Accumulate {0} skill points ({1} if skills are items)', R(8, 12), R(16, 22)),
	N(2, [
		F('Do not use {0}', O(['any combat art', 'either Mortal Draw'])),
		'Never use a temporary buff item except Divine Confetti',
		'Never use a stealth kill on a mini/boss',
		F('Do not exceed {0} Attack Power', O([4, 5, 6, 7, 8])),
		O([
			'Never use a prosthetic tool in combat',
			F('{0} use bladed prosthetic tools in combat', O(['Exclusively', 'Never'])),
			F('{0} use fire prosthetic tools in combat', O(['Exclusively', 'Never'])),
			F(
				'Exclusively use prosthetic tools that cost {0} spirit emblems in combat',
				O([1, 2, 3])
			),
		]),
		O([
			F('Do not exceed {0} gourd charges', O([3, 4, 5])),
			F('Never use a healing consumable {0}', S(['', 'except Pellets'])),
		]),
	]),
	F('Kill all enemies {0}', S([
		'in the Senpou Temple attic',
		"in Doujun's cave",
		'guarding Monkey Booze in Bodhisattva Valley',
		'in the Hidden Forest temple grove before clearing the mist',
	])),
	F('Kill the miniboss {0}', S([
		'in Temple Grounds without using the rafters',
		F('{0} without killing the mobs', O([
			'on the Ashina castle stairs',
			'by the Hidden Forest campfire',
			'in the Hirata Estate Main Hall',
			'before the Ashina Castle idol',
			'before the Underbridge Valley idol',
		])),
		'in the tutorial'
	])),
	F('Kill the minibosses {0} and {0}', S([
		'on the Ashina Castle stairs',
		'in Temple Grounds',
		'by the Water Mill',
		'by the Moon-View Tower',
		'by the Ashina Reservoir idol',
		'on the Fountainhead tree',
		'by the Fountainhead waterfall',
		"the Sakura Bull's nook",
		'in the Serpent Shrine',
		'by the Hidden Forest campfire',
		'on the Ashina Castle ground floor',
	])),
	'Go from Bodhisattva Valley idol to Main Hall idol without resting, dying, or fast travel',
	F('Get {0} deathblows without resting, dying, or fast travel', R(15, 30)),
	O([
		F('Collect at least {0} {1}', R(40, 60), O(['Scrap Iron', 'Scrap Magnetite'])),
		F('Collect at least {0} {1}', R(30, 45), O(['Adamantine Scrap', 'Black Gunpowder', 'Yellow Gunpowder'])),
		F('Collect at least {0} {1}', R(15, 25), O(['Fulminated Mercury', 'Lump of Fat Wax', 'Lump of Grave Wax'])),
	]),
]);

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
