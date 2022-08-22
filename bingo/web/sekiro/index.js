// Options that can only be achieved by finding specific items that could
// theoretically be anywhere. A critical mass of these squares is crucial for a
// good bingo board, because they ensure that *you don't know which line will
// bingo before you start*.
//
// While there are some exceptions, especially for certain randomizer settings,
// for the most part any option in this list can show up anywhere in the game.
// This variance means that all bingo squares are potentially relevant for most
// of the duration of the game, that players have to take multiple challenges
// seriously, and that any item could potentially produce a win.
const exploration = S([
	O([
		F('Find {0} Spiritfalls', O([3, 4, 5])),
		F('Get both {0} Spiritfalls', O(['offsensive', 'defensive'])),
	]),
	W([400, 100, 50], N(3, [
		F('Kill {0} Ashina General minibosses', O([2, 3])),
		F('Kill {0} Shichimen Warriors', O([2, 3])),
		F('Kill {0} Lone Shadow minibosses', O([2, 3, 4])),
		F('Kill {0} Drunkards, Gluttons, and/or Red Guards', O([2, 3, 4])),
		F('Kill both {0}', S([
			'Centipedes',
			'Snake-Eyes',
			'Seven Ashina Spears',
			'Bulls',
			'Ogres',
			'Ashina Elites',
		])),
	])),
	F('Defeat {0}', S([
		'Demon of Hatred',
		'Father Owl',
		'Sword Saint',
		'Divine Dragon',
		'3 Genichiros',
	])),
	// Unique quick items
	F('Find {0}', S([
		'Hidden Tooth',
		'Ceremonial Tanto',
		'Five-Color Rice',
		"Jinza's Jizo Statue",
		'Nightjar Monocular',
		"Academic's Red Lump",
		'Taro Persimmon',
	])),
	// Post-Owl plot items
	F('Find {0}', S([
		'Frozen Tears',
		'Divine Dragon Tears',
		'Aromatic Flower',
		'Aromatic Branch',
	])),
	F('Fit the {0} tool', N(2, [
		'Loaded Shuriken',
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
	W([300, 100, 50], N(3, [
		// In theory this could list all skills since they're all
		// equally likely to be easy or hard to obtain, but exclusively
		// listing the high-tier skills makes it feel extra exciting
		// while still providing plenty of variety.
		W(200, F('Learn the {0} skill', S([
			// Ashina Arts
			'Ashina Cross',
			'Ichimonji: Double', // not technically a terminal skill but so
			                     // powerful it's worth including anyway.
			// Prosthetic Arts
			'Living Force',
			// Temple Arts
			'Most Virtuous Deed',
			'High Monk',
			'Devotion',
			// Shinobi Arts
			'Shadowrush',
			'Vault Over',
			// High-end Mushin Arts skills
			'Shadowfall',
			'Spiral Cloud Passage',
			'Empowered Mortal Draw',
			// Special texts
			'Floating Passage',
		]))),
		F('Learn both {0} skills', S([
			'Carp',
			'Nightjar Slash' ,
			'Suppress',
			"Emma's Medicine",
		])),
		// 5 total: two Shinobi's, two Sculptor's, and Beast's
		O([
			F('Learn both {0} Karma skills', O(["Shinobi's", "Sculptor's"])),
			F('Learn {0} Karma skills', O([3, 4, 5])),
		]),
		// 4 total: Breath of Nature/Life: Light/Shadow
		O([
			F('Learn both Breath of {0} skills', O(['Nature', 'Life'])),
			F('Learn both Breath of ____: {0} skills', O(['Light', 'Shadow'])),
			F('Learn {0} Breath skills', O([3, 4])),
		]),
		// 3 total: Combat Arts, Deflection, Prosthetic Tool
		F('Learn {0} Mid-Air skills', O([2, 3])),
		// 3 total: Rank 1, 2, and 3
		F('Learn {0} Shinobi Medicine skills', O([2, 3])),
	])),
	F('Find {0}', S([
		'Dragon Tally Board',
		'Water of the Palace',
		'Rice for Kuro',
		'Great White Whisker',
		'Sakura Droplet',
		// This is much harder than the rest of the items because it
		// requires finding three *specific* items.
		W(50, 'Dancing Dragon Mask'),
	])),
	// Many of these upgrades don't directly require specific items other
	// than the Mechanical Barrel, which will often show up early if the
	// player has any kind of standard item distribution enabled. However,
	// every upgrade does require the player to find the base weapon and
	// since the upgrade order is itself randomized it'll often be blocked
	// on other prosthetics or special upgrade materials as well.
	W([100, 50], F('Upgrade to the {0}', N(2, [
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
	]))),
	W([200, 100], F('Find {0}', N(2, [
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
	]))),
	// Miscellaneous options, grouped together to keep them from having a
	// ton of relative weight by virtue of being on the same level as
	// options that have a bunch of different sub-options.
	S([
		// Equivalent to finding White Pinwheel and Divine Abduction, plus
		// beating Genichiro's replacement and Monkeys.
		"Talk to Kotaro in the Halls of Illusion",
		// Equivalent to finding Red Carp Eyes plus defeating Snake Eyes
		// Shirahagi's replacement.
		"Complete Doujun's questline",
		W([100, 50], F('Find {0} Ninjutsu', S(['Puppeteer', 'Bloodsmoke', 'Bestowal']))),
		'Collect both Serpent Viscera',
		'Kill a Shichimen Warrior with an Anti-Air Deathblow',
		F('Open the {0} in Ashina Reservoir', S(['gatehouse', 'secret passage'])),
		O([
			F('Find Mottled {0} Gourd', O(['Purple', 'Green', 'Red'])),
			F('Find {0} Mottled Gourds', O([2, 3])),
		]),
	]),
]);

// Options that can and will be achieved by progressing far enough into the
// game. While exploration options is that those could be triggered very early
// or could be triggered very late, a canny player will usually be able to guess
// before the game starts approximately when a progression option will be
// triggered.
//
// As a consequence, these are less valuable than exploration options in terms
// of informing player behavior. That doesn't mean they're valueless, though!
// They inform what the player focuses on (saving rather than spending
// sen/scales, killing minibosses they might otherwise skip, etc), encourage the
// player to go deep rather than go wide, and provide an appealing variant in
// what the bingo asks. They should, however, appear sparingly on the board as
// too many of these in the same line can make the optimal path too
// deterministic.
//
// The line between exploration and progression can be blurry. "Find X
// Spiritfalls" is exploration while "Finding X beverages" is progression just
// because of the relative density of those two categories. The crucial question
// is, how confident is the player about when they're likely to achieve the
// goal?
const progression = S([
	// Plot items required to unlock Fountainhead are considered progression
	// because they *can't* appear in the lategame.
	F('Find {0}', O(['Lotus of the Palace', 'Shelter Stone'])),
	// Equivalent to finding the Mortal Blade
	'Kill Hanbei the Undying (for good)',
	// 10 total
	F('Collect {0} prayer necklaces', R([6, 9])),
	// 9 total
	F('Collect {0} gourd seeds', O([6, 8])),
	// 14 total
	F('Collect {0} memories', R([8, 13])),
	// 13 total: 9 sakes, 3 monkey boozes, 1 water of the palace
	F('Possess {0} beverages at one time', R(8, 12)),
	O([
		F('Possess at least {0} sen at one time', R(10000, 18000)),
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
	O([
		// 35 total, 7 from Fountainhead carp, 7 from underwater carp
		F('Possess {0} carp scales at one time', R(14, 28)),
		'Buy all items from one Pot Noble',
	]),
	F('Accumulate {0} skill points ({1} if skills are items)', R(8, 12), R(16, 22)),
	W([300, 100], F('Kill the minibosses {0} and {0}', N(2, [
		'on the Ashina Castle stairs',
		'in Temple Grounds',
		'by the Water Mill',
		'by the Moon-View Tower',
		'in the Serpent Shrine',
		'by the Hidden Forest campfire',
		'on the Ashina Castle ground floor',
		'outside Mibu Manor in Fountainhead',
		'on the Fountainhead tree',
		'by the Fountainhead waterfall',
		'by the Ashina Reservoir idol',
	]))),
	O([
		F('Collect at least {0} {1}', R(40, 60), O(['Scrap Iron', 'Scrap Magnetite'])),
		F('Collect at least {0} {1}', R(30, 45), O(['Adamantine Scrap', 'Black Gunpowder', 'Yellow Gunpowder'])),
		F('Collect at least {0} {1}', R(15, 25), O(['Fulminated Mercury', 'Lump of Fat Wax', 'Lump of Grave Wax'])),
	]),
]);

// Options that the player can do more or less on demand (at least after
// unlocking Ashina Castle and Hirata 1), but that take a non-trivial amount of
// time and effort to actually execute. In many cases these will be the last
// squares to be filled out after the rest of a line is complete, but the very
// best challenge options require the player to work on them (or actively decide
// not to) from the beginning of the run.
//
// Challenge options give the player agency over how they fill out the bingo
// board and produce exciting "last mile" moments where they player knows they
// have a bingo within their grasp but still need to nail the execution in order
// to count it. They should be the next most represented category after
// exploration options.
const challenge = S([
	// These are the most valuable challenges because they become *less*
	// available as the player moves through the game. The player is
	// incentivized to complete thse challenges as they go, rather than
	// saving them until the rest of a row is filled out.
	W([800, 300, 50, 25], N(4, [
		F('Kill {0} memory bosses in one attempt', O([1, 2, 3])),
		F('Kill {0} non-easy minibosses in one attempt', O([4, 5, 6])),
		F('Kill {0} memory bosses with Bell Demon', O([1, 2, 3])),
		F('Kill {0} non-easy minibosses with Bell Demon', O([4, 5, 6])),
		F('Kill {0} non-easy mini/bosses without taking damage from the boss', O([3, 4, 5])),
		'Kill a non-easy mini/boss without attacking (except deathblows)',
		'Kill a non-easy mini/boss without blocking/deflecting',
		'Kill a non-easy mini/boss without touching the control stick or arrow keys',
		'Kill a non-easy mini/boss using only combat arts',
		F('Kill the miniboss {0}', S([
			'in Temple Grounds without using the rafters',
			'in the tutorial',
			F('{0} without killing the mobs', O([
				'on the Ashina castle stairs',
				'by the Hidden Forest campfire',
				'in the Hirata Estate Main Hall',
				'before the Ashina Castle idol',
				'before the Underbridge Valley idol',
			])),
		])),
	])),
	W([100, 50], F('Kill all enemies {0}', N(2, [
		'in the Senpou Temple attic',
		"in Doujun's cave (except in cells)",
		'guarding Monkey Booze in Bodhisattva Valley',
		'in the Hidden Forest temple grove before clearing the mist',
	]))),
	// Since the randomizer default doesn't include headless in the pool
	// with other minibosses, we consider them challenge options rather than
	// an exploration options.
	F('Kill {0} Headless', O([1, 2, 3, 4, 5])),
	'Go from Bodhisattva Valley idol to Main Hall idol without resting, dying, or fast travel',
	F('Get {0} deathblows without resting, dying, or fast travel', R(15, 30)),
	F('Kill {0}', S([
		"both mini/bosses in the Guardian Ape's Burrow",
		// While this is mandatory to open Hirata 2 and so may block completing
		// the game, it's unlikely that that will be required to complete a
		// bingo except on high bias.
		'the memory bosses at the end of the first Hirata Estate',
		// This is usually *not* mandatory in randomizer, since all you need to
		// open the path to Fountainhead are Lotus of the Palace, Mortal Blade,
		// Shelter Stone, and Aromatic Branch.
		'the memory boss on Ashina Castle after the first invasion',
	])),
]);

// Prohibition options are marked by default, and can only become *un*-marked if
// the player violates some restriction on their behavior. They add spice to the
// bingo board, because they force the player to constantly think: is this
// square's position worth the price to follow this restriction? At what point
// is it better to abandon it to accelerate the other squares?
//
// We usually want one of these, but they become problematic in multiples as
// they can make individual lines *too* easy to achieve, so we limit them to
// three per board.
const prohibition = S([
	// This prohibition is particularly useful because it counterbalances the
	// otherwise extremely memory-heavy distribution of low-bias settings.
	W(300, F('Do not exceed {0} Attack Power', O([4, 5, 6, 7, 8]))),
	F('Never use {0}', O(['a combat art', 'either Mortal Draw'])),
	'Never use a temporary buff item except Divine Confetti',
	'Never use a stealth kill on a mini/boss',
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
]);

// Weight here totals to 25, and so represents the average number of squares
// each type is expected to take on a bingo board.
//
// We require between 13 and 20 exploration squares to ensure that the board is
// neither too deterministic nor too chaotic.
const OPTIONS = S([
	W(17, N(20, [exploration])),
	new ThreeMaxInALine(W(8, N(13, [
		W(3.5, challenge),
		W(3, progression),
		W(1.5, N(3, [prohibition])),
	]))),
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
