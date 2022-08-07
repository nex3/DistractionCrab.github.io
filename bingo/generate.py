import os
import ast
import sys
import requests
import enum
import sqlite3
import pathlib
import time
import random
import itertools as itools
from datetime import date
import shutil

GOALS_FILE = os.path.join(os.path.split(__file__)[0], f'goals.js')
GOALS_FILE_DEFAULT = os.path.join(os.path.split(__file__)[0], f'goals - default.js')

def reset_js():
	shutil.copyfile(GOALS_FILE_DEFAULT, GOALS_FILE)


class Select:
	def __init__(self, *items):
		self.__items = tuple(*items)


	@property
	def count(self):
		return len(self.__items)


	def select(self):
		return self.__items[random.randint(0, self.count)]

class SelectOne(Select):
	@property
	def count(self):
		return 1
	
class SelectN(Select):
	def __init__(self, n, *items):
		super().__init__(*items)
		self.__n = n

	@property
	def count(self):
		return self.__n
	

class Range:
	def __init__(self, min, max):
		self.__min = min
		self.__max = max

	@property
	def count(self):
		return 1

	def select(self):
		return random.randint(self.__min, self.__max)
	
class Goal:
	def __init__(self, desc, *items):
		self.__desc = desc
		self.__items = tuple(items)

	@property
	def count(self):
		if len(self.__items) > 0:
			m = 1
			for i in range(len(self.__items)):
				m *= self.__items[i].count
			return m
		else:
			return 1

	def select(self):
		if len(self.__items) > 0:
			values = tuple(i.select() for i in self.__items)
			return self.__desc.format(*values)
		else:
			return self.__desc

def generate_mines():
	locations = random.sample(list(itools.product(range(5), range(5))), 16)
	return locations[0:8], locations[8:]


def generate_board(goals):
	#choices = [[["None", 0] for _ in range(5)] for _ in range(5)]
	choices = [["None", 0] for _ in range(25)]
	selected = set([])
	counts = { a: 0 for a in goals }

	for i in range(5):
		for k in range(5):
			filled = False
			while not filled:
				c = random.choice(goals)
				if counts[c] < c.count:
					opt = c.select()
					if opt not in selected:
						counts[c] += 1
						choices[5*i +k][0] = opt
						filled = True
						selected.update([opt])


	random.shuffle(choices)
	choices = [[choices[5*i + k] for k in range(5)] for i in range(5)]

	mines, treasures = generate_mines()

	for (i, k) in mines:
		choices[i][k][1] = -1

	for (i, k) in treasures:
		choices[i][k][1] = 1

	with open(GOALS_FILE, 'w') as out:
		out.write(f"const GOALS = {repr(choices)};")
