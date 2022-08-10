import os
import ast
import sys
import requests
import enum
import sqlite3
import pathlib
import time
import random
from datetime import date
import er
import shutil
import generate
import json


class Guess(enum.Enum):
	r1c1 = 'r1c1'
	r1c2 = 'r1c2'
	r1c3 = 'r1c3'
	r1c4 = 'r1c4'
	r1c5 = 'r1c5'
	r2c1 = 'r2c1'
	r2c2 = 'r2c2'
	r2c3 = 'r2c3'
	r2c4 = 'r2c4'
	r2c5 = 'r2c5'
	r3c1 = 'r3c1'
	r3c2 = 'r3c2'
	r3c3 = 'r3c3'
	r3c4 = 'r3c4'
	r3c5 = 'r3c5'
	r4c1 = 'r4c1'
	r4c2 = 'r4c2'
	r4c3 = 'r4c3'
	r4c4 = 'r4c4'
	r4c5 = 'r4c5'
	r5c1 = 'r5c1'
	r5c2 = 'r5c2'
	r5c3 = 'r5c3'
	r5c4 = 'r5c4'
	r5c5 = 'r5c5'


def check_guess(s):
	try:
		Guess(s)
		return True
	except ValueError:
		return False


DATE_STRING = date.today().strftime("%b-%d-%Y")
TABLE_FILE = os.path.join(os.path.split(__file__)[0], f'bingo.db')
CLICKED_FILE = os.path.join(os.path.split(__file__)[0], f'clicked.js')
CLICKED_FILE_DEFAULT = os.path.join(os.path.split(__file__)[0], f'clicked - default.js')


GUESS_TABLE_NAME = "bingoguesses"
MAX_GUESSES = 8
BINGO_BOARD_PLAYER = "###Bingo Board###"
TREASURE_SQUARE = 1
TREASURE_VALUE = 3
MINE_SQUARE = -1
MINE_VALUE = -1
EMPTY_SQUARE  = 3
UNCLICKED_SQUARE  = 0
URL = 'http://localhost:8911/api/'

def get_currency(data):
	return next(x for x in data['CurrencyAmounts'] if x['Name'] == "Bingo Score")['Amount']

class Bingo:
	def __init__(self):
		self.__conn = sqlite3.connect(TABLE_FILE)
		self.__path = pathlib.Path(TABLE_FILE)

	def __del__(self):
		self.__conn.commit()
		self.__conn.close()

	@property
	def game_start(self):
		return self.__path.stat().st_ctime
	
	def remaining_guesses(self):
		return MAX_GUESSES

	def add_points(self, player, points):
		r = requests.get(URL + f"/users/{player}")

		init_pt = json.loads(r.text)
		#init_pt = ast.literal_eval(r.text)
		init_pt = get_currency(init_pt)

		c = init_pt + points
		points = points if c >= 0 else 0

		r = requests.put(
			URL + f"/users/{player}/currency/4d8cb9a4-6985-4959-bfbd-e1dee1d416bd/adjust", 
			headers={'Content-type': 'application/json; charset=utf-8'},
			data=str({ "Amount": points }))

	def init_file(self):
		self.__conn.execute(f"""
			CREATE TABLE {GUESS_TABLE_NAME}
			(
				user TEXT,
				r1c1 INTEGER,
				r1c2 INTEGER,
				r1c3 INTEGER,
				r1c4 INTEGER,
				r1c5 INTEGER,
				r2c1 INTEGER,
				r2c2 INTEGER,
				r2c3 INTEGER,
				r2c4 INTEGER,
				r2c5 INTEGER,
				r3c1 INTEGER,
				r3c2 INTEGER,
				r3c3 INTEGER,
				r3c4 INTEGER,
				r3c5 INTEGER,
				r4c1 INTEGER,
				r4c2 INTEGER,
				r4c3 INTEGER,
				r4c4 INTEGER,
				r4c5 INTEGER,
				r5c1 INTEGER,
				r5c2 INTEGER,
				r5c3 INTEGER,
				r5c4 INTEGER,
				r5c5 INTEGER
			)
		""")

		self.__conn.commit()
		print("Initialized file.")


	def finish_game(self):
		squares = self.get_row(BINGO_BOARD_PLAYER)
		if squares is None:
			print("A bingo game has not been started yet")
			return
		else:
			squares = squares[1:]
		row = self.__conn.execute(f"SELECT * from {GUESS_TABLE_NAME}").fetchall()

		for r in row:
			user = r[0]
			if user == BINGO_BOARD_PLAYER:
				continue

			score = 0

			for (guess, actual, key) in zip(r[1:], squares, Guess):
				if actual == TREASURE_SQUARE:
					score += TREASURE_VALUE if guess == 1 else 0
				if actual == MINE_SQUARE:
					score += MINE_VALUE if guess == 1 else 0
			self.add_points(user, score)

		self.clear_guesses()
		self.__conn.commit()

		print("Bingo has finished, use !bingoscore to check your new score :D")
		reset_js()
		generate.reset_js()
		
	def get_board(self, value):
		return self.__conn.execute(
			f"SELECT {value} from {GUESS_TABLE_NAME} where user = '{BINGO_BOARD_PLAYER}'").fetchone()[0]

	def init_game(self, game):
		reset_js()
		self.clear_guesses()
		
		self.__conn.execute(f"""
			INSERT INTO {GUESS_TABLE_NAME} VALUES
			('{BINGO_BOARD_PLAYER}', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
		""")

		self.__conn.commit()

		if game == "er":
			generate.generate_board(er.GOALS)

		print("Bingo has been opened!")

		

	def clear_guesses(self):
		self.__conn.execute(f"DELETE from {GUESS_TABLE_NAME}")

	def ensure_user_exists(self, user):
		d = self.__conn.execute(
			f"SELECT user FROM {GUESS_TABLE_NAME} where user = ?", (user,)).fetchone()

		if d is None:
			d = self.__conn.execute(f"""
				INSERT INTO {GUESS_TABLE_NAME} VALUES
				('{user}', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
			""")

	def get_row(self, user):
		self.ensure_user_exists(user)
		s = self.__conn.execute(
			f"SELECT * FROM {GUESS_TABLE_NAME} where user = ?", 
			(user,))
		return s.fetchone()


	def guess_count(self, user):		
		r = self.get_row(user)

		return (r, sum(r[1:]))



	def add_guess(self, user, value):
		self.ensure_user_exists(user)
		(r, c) = self.guess_count(user)
		
		if value == "random":
			for _ in range(0, self.remaining_guesses()-c):
				r = self.get_row(user)[1:]
				c = list(filter(lambda x: x[1] == UNCLICKED_SQUARE, zip(Guess, r)))
				a = random.choice(c)
				self.add_guess(user, a[0].value)
		else:

			if not check_guess(value):
				print("Invalid Guess; Use !guess r#c# to guess (1 <= # <= 5)")
				return

			sq = self.get_board(value)
			if sq is not UNCLICKED_SQUARE:
				print(f"{user}: Cannot guess on already found square.")
				return

			if c >= self.remaining_guesses():
				print(f"{user} you've reached the maximum number of guesses for this game.")
			elif not check_guess(value):
				print(f"{user} has input an invalid guess.")
			else:
				self.__conn.execute(
					f"UPDATE {GUESS_TABLE_NAME} SET {value}=1 where user='{user}'")
			self.__conn.commit()

	def get_clicked(self):
		return list(self.get_row(BINGO_BOARD_PLAYER)[1:])


	def add_square(self, sq, value):
		v = UNCLICKED_SQUARE
		if value == "treasure":
			v = TREASURE_SQUARE
		elif value == "mine":
			v = MINE_SQUARE
		elif value == "unclick":
			v = UNCLICKED_SQUARE
		elif value == "none":
			v = EMPTY_SQUARE

		self.__conn.execute(
			f"UPDATE {GUESS_TABLE_NAME} SET {sq}={v} where user='{BINGO_BOARD_PLAYER}'")
		self.__conn.commit()

		write_clicked(self.get_clicked())

def write_clicked(clicked):
	with open(CLICKED_FILE, 'w') as out:
		out.write(f"const CLICKED = {clicked};")

def reset_js():
	shutil.copyfile(CLICKED_FILE_DEFAULT, CLICKED_FILE)


def delete_file():
	try:
		os.remove(TABLE_FILE)
	except:
		pass


try:
	if __name__ == '__main__':
		if sys.argv[1] == "reset":
			delete_file()
			reset_js()
			generate.reset_js()
			game = Bingo()
			game.init_file()
		else:			
			if sys.argv[1] == "init":
				game = Bingo()
				game.init_file()
			elif sys.argv[1] == "start":
				game = Bingo()
				game.init_game(sys.argv[2])
			elif sys.argv[1] == 'guess':
				game = Bingo()
				user = sys.argv[2]
				guess = sys.argv[3]
				game.add_guess(user, guess)				
			elif sys.argv[1] == "click":
				game = Bingo()
				square = sys.argv[2]
				value = sys.argv[3]		
				game.add_square(square, value)
			elif sys.argv[1] == "finish":
				game = Bingo()
				game.finish_game()

except Exception as ex:
	print(f"An error has occurred: " + str(ex))		
