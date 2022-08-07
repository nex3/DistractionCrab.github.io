import os
import ast
import sys
import requests
import enum
import json
import random
from datetime import date

URL = "http://localhost:8911/api/"
CURRENCY_ID = "ffbe70b2-7333-4c1b-9149-deb108220987"
HEADERS = {'Content-type': 'application/json; charset=utf-8'}
RNG_REQUEST = "https://www.random.org/integers/?num={0}&min=1&max=20&col=1&base=10&format=plain&rnd=new"
ADVANTAGE_THRESHOLD = 3

LOG_FILE = os.path.join(os.path.split(__file__)[0], "log.err")

DICE_OUTCOMES = {
	1: [
		"They have suffered a horrible fate.",
		"Their seduction attempt against the dragon has failed.",
		"They stub their toe, slip on some ice while jumping in pain, fall down into a pit, and wake a cave troll.",
		"They step on a sleeping Cactuar, and the cactuar uses 1000 needles.",
		"Their number is not a prime number; Also they fall down a hole with spikes.",
		"YouDied",
	],
	2: [
		"They attempt to butter a muffin, but lose a pinky in the process.",
		"A pack of roving goblins steals their sushi.",
		"They a find a genie of the muffin, but is free thanks to Noob_almost, and will no longer grant you wishes.",
		"Their number is a prime number.",
	],
	3: [
		"They go to pet a cat, but the cat mauls them out of spite.",
		"They find a cursed dagger that can only heal those it stabs.",
		"Their number is a prime number.",
		"They are cursed with unending flatulence.",
	],
	4: [
		"Their bowl of ramen ends up burning their mouth.",
		"Their number is not a prime number.",
		"A seagull bombards them through their window.",
	],
	5: [
		"They stub their toe as they go to pet a cat.",
		"They save a turtle, that turns out to be evil and curses them.",
		"Their number is a prime number.",
		"They get a free pizza, but it has their least favourite toppings.",
	],
	6: [
		"They dropped their book in the water.",
		"Their ramen is missing some spice, and is barely adequate.",
		"Their number is not a prime number.",
	],
	7: [
		"They go to pet a puppy, but tripped and end up bopping it on the nose.",
		"They meet a stranger, and this stranger steals their shrimp.",
		"Their number is a prime number.",
		"They receive their favourite beer, but it's flat and warm.",
	],
	8: [
		"Their next soup will be perpetually cold.",
		"They find a soft puppy, but the puppy runs away before they can pet it.",
		"Their number is not a prime number, but is a perfect cube.",
		"A bumblebee flies bombards into them, knocking them over, but they find a somewhat shiny coin.",
	],
	9: [
		"Their next sushi roll will not have enough spicy mayo.",
		"They find a rusted coin.",
		"Their number is not a prime number, but is a perfect square.",
	],
	10: [
		"An uncomfortable smell graces their nose.",
		"Their shiny rock falls into the river, and is stolen by a fish.",
		"Their number is not a prime number.",
	],
	11: [
		"A comfortable breeze blows by.",
		"They find a shiny rock by the river.",
		"Their number is a prime number.",
	],
	12: [
		"They find a shiny coin.",
		"Their next sushi has adequate spicy mayo and diced crab.",
		"Their number is not a prime number.",
	],

	13: [
		"They find a soft puppy, and pet it.",
		"Their next soup will be warm for as long as they need.",
		"Their number is a prime number.",
	],
	14: [
		"They greet a stranger, and receive a free fish.",
		"They go to pet a puppy, and the puppy licks them.",
		"Their number is not a prime number.",
	],
	15: [
		"The ramen they ordered was perfectly hot and spicy.",
		"Their book falls, but they managed to catch it before it lands in the water.",
		"Their number is not a prime number.",
	],
	16: [
		"They save a turtle, and it grants them ten gold coins.",
		"They successfully pet a cat without incident.",
		"Their number is not a prime number, is a perfect 4-dimensional cube.",
	],
	17: [
		"Their number is a prime number.",
		"Their ramen is the perfect temperature.",
	],
	18: [
		"They discover a magical dagger, that is not cursed, and can be used to stab.",
		"They go to pet a cat, and it sits in their lap and purrs.",
		"Their number is not a prime number.",
	],

	19: [
		"They convince a pack of roving goblins to give them their sushi.",
		"They successfully butter a muffin, that happens to be the home of a genie.",
		"Their number is a prime number.",
	],

	20: [
		"They have successfully seduced the dragon.",
		"They have found the well of infinite ramen.",
		"An anvil narrowly misses falling on them, they find 50 gold coins in the hole made by the anvil, and a goat gifts them a watermelon.",
		"They stumble across their favourite shiny Pokemon",
		"Their number is not a prime number, but are able to solve the Riemann Hypothesis.",
	],
}

DICE_SCORES = {
	1: 0,
	2: -8,
	3: -7,
	4: -6,
	5: -5,
	6: -4,
	7: -3,
	8: -2,
	9: -1,
	10: 1,
	11: 2,
	12: 3,
	13: 4,
	14: 5,
	15: 6,
	16: 7,
	17: 8,
	18: 9,
	19: 10,
	20: 20

}

class User:
	def __init__(self, name):
		self.__name = name
		self.__data = json.loads(requests.get(f"http://localhost:8911/api/users/{name}").text)

	@property
	def name(self):
		return self.__name

	def __get_skill_amt(self, name):
		return next(x for x in self.get_skills() if x["Name"] == name)["Amount"]

	@property
	def thievery(self):
		return self.__get_skill_amt("Thievery")

	@property
	def luck(self):
		return self.__get_skill_amt("Luck")
	
	
	def get_skills(self):
		return next(x for x in self.__data["InventoryAmounts"] if x["Name"] == "Dice Skills")["Items"]

	def __refresh(self):
		self.__data = json.loads(requests.get(f"http://localhost:8911/api/users/{self.__name}").text)

	def get_shrimp(self):
		return next(x for x in self.__data['CurrencyAmounts'] if x['Name'] == "Dice Shrimps")['Amount']

	def add_shrimp(self, amt):
		c = self.get_shrimp()

		if c + amt < 0:
			requests.put(
				URL + f"/users/{self.__name}/currency/{CURRENCY_ID}/adjust", 
				headers=HEADERS,
				data=str({ "Amount": -c}))
			return 0
		else:
			requests.put(
				URL + f"/users/{self.__name}/currency/{CURRENCY_ID}/adjust", 
				headers=HEADERS,
				data=str({ "Amount": amt}))	
			return amt + c

	def delete_shrimp(self):
		c = self.get_shrimp()
		requests.put(
			URL + f"/users/{self.__name}/currency/{CURRENCY_ID}/adjust", 
			headers=HEADERS,
			data=str({ "Amount": -c}))	

	def cut_shrimp(self):
		c = self.get_shrimp()
		requests.put(
			URL + f"/users/{self.__name}/currency/{CURRENCY_ID}/adjust", 
			headers=HEADERS,
			data=str({ "Amount": -c/2}))	

	def bonk(self):
		requests.post(
			f"http://localhost:8911/api/commands/5c7e8c45-1fe8-415a-825f-cace3784773a",
			headers=HEADERS,
			data=repr([self.__name]))


"""
def clamp(current, sub):
	if current + sub < 0:
		return -current
	else:
		return sub

def get_shrimp(player):
	d = json.loads(requests.get(f"http://localhost:8911/api/users/{player}").text)
	return get_currency(d)


def get_currency(data):
	return next(x for x in data['CurrencyAmounts'] if x['Name'] == "Dice Shrimps")['Amount']

def set_shrimp(name, amt, current):
	amt = clamp(current, amt)

	r = requests.put(
			URL + f"/users/{name}/currency/{CURRENCY_ID}/adjust", 
			headers=HEADERS,
			data=str({ "Amount": amt}))	

"""

def determine_advantage(s):
	return s//ADVANTAGE_THRESHOLD + 1


def dice(name):
	roll = int(roll_dice()[0])
	user = User(name)

	amt = 0
	if roll == 1:
		user.cut_shrimp()
		user.bonk()
		amt = user.get_shrimp()/2
	else:
		v = DICE_SCORES[roll]
		if v >=0:
			v += user.luck
		amt = user.add_shrimp(v)


	outcome = random.choice(DICE_OUTCOMES[roll])
	print(f"{name} has rolled a {roll}. {outcome} (shrimp={amt})")


def give_shrimp(p1, p2, amt):
	amt = int(amt)
	p1 = User(p1)
	p2 = User(p2)

	amt = min(p1.get_shrimp(), amt)

	p1.add_shrimp(-amt)
	p2.add_shrimp(amt)



def steal(p1, p2):
	p1 = User(p1)
	p2 = User(p2)

	if p2.get_shrimp() == 0:
		print("Your target has no shrimp to steal.")
	else:
		v1, v2 = (determine_advantage(p1.thievery), determine_advantage(p2.thievery))
		d1, d2 = (max(roll_dice(v1)), max(roll_dice(v2)))

		v = d1 - d2
		if v == 0:
			print(f"{p1.name}'s attempt to steal shrimp was unsuccessful, but they did not lose anything. ({d1} v.s. {d2})")
		elif v > 0:
			if v == 19: # The case for a 20 vs 1
				p1.add_shrimp(p2.get_shrimp())
				p2.delete_shrimp()
				print(f"{p1.name} has stolen all of {p2.name}'s shrimp. ({d1} v.s. {d2})")
			else:
				amt = int(((19 - v)/float(19)) * p2.get_shrimp()/4)
				p1.add_shrimp(amt)
				p2.add_shrimp(-amt)
				print(f"{p1.name} has stolen {amt} shrimp from {p2.name}. ({d1} v.s. {d2})")
		else:
			if v == -19: # The case for a 1 vs 20
				p2.add_shrimp(p1.get_shrimp())
				p1.delete_shrimp()
				print(f"{p1.name} has lost all of their shrimp to {p2.name}, while attempting to be a thief. ({d1} v.s. {d2})")
			else:
				amt = int(((19 + v)/float(19)) * p1.get_shrimp()/4)
				p1.add_shrimp(-amt)
				p2.add_shrimp(amt)
				print(f"{p1.name} has lost {amt} shrimp to {p2.name}, while attempting to be a thief. ({d1} v.s. {d2})")



def roll_dice(amt=1):
	r = requests.get(RNG_REQUEST.format(amt)).text
	return list(map(int, (x for x in r.split("\n") if len(x.strip()) > 0)))

def main():
	if sys.argv[1] == 'test':
		dice('distractioncrab')
	elif sys.argv[1] == 'roll':
		dice(sys.argv[2])
	elif sys.argv[1] == "steal":
		steal(sys.argv[2], sys.argv[3])
	elif sys.argv[1] == "donate":
		give_shrimp(sys.argv[2], sys.argv[3], int(sys.argv[4]))

try:
	if __name__ == '__main__':
		main()
except Exception as ex:
	print("ERROR: " + str(ex))