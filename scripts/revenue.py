import sqlite3
import os
import datetime
import sys

TABLE_FILE = os.path.join(os.path.split(__file__)[0], f'revenue.db')
HTML_FILE = os.path.join(os.path.split(__file__)[0], f'revenue.html')
TABLE_NAME = "REVENUE_DATA"

CUR_MONTH = datetime.datetime.now().strftime("%B")
GOAL = 900.0


HTML = """
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Revenue Tracker for Twitch</title>
	<style type="text/css">
		progress {{
			width: 100%;
			height: 100px;
		}}

		span {{
			position: absolute;
			top: 30px;
			left: 30%;
			font-size: 36px;
		}}
	</style>
</head>
<body>
	<div>
		<span>
			Monthly Goal (!goal): ({0:.2f}/{1:.2f}$)
		</span>
		<progress value="{0:.2f}" max="{1:.2f}"></progress>
	</div>
</body>
"""

class Table:
	def __init__(self):
		self.__table = sqlite3.connect(TABLE_FILE)

	def make_table(self):
		self.__table.execute(f"""CREATE TABLE {TABLE_NAME}
			(user TEXT, month TEXT, revenue REAL)
		""")

	def add_revenue(self, user, rev):
		print(user)
		print(rev)
		s = f"""INSERT INTO {TABLE_NAME} VALUES
			('{user}', '{CUR_MONTH}', '{float(rev)}')
		"""
		print(s)
		self.__table.execute(s)
		self.__table.commit()
		self.update_html()

	def add_sub(self, user, tier):
		print(user)
		print(tier)
		tier = int(tier)
		if tier == 1:
			self.add_revenue(user, 2.5)
		elif tier == 2:
			self.add_revenue(user, 5.0)
		elif tier == 3:
			self.add_revenue(user, 12.5)

	def update_html(self):
		t = self.monthly_rev()
		g = GOAL
		string = HTML.format(t, g)

		with open(HTML_FILE, 'w') as out:
			out.write(string)

	def monthly_rev(self):
		stuff = self.__table.execute(f"SELECT revenue from {TABLE_NAME} where month='{CUR_MONTH}'").fetchall()
		total = 0.0

		for a in stuff:
			total += a[0]

		return total

	def monthly_print(self):
		stuff = self.__table.execute(f"SELECT user, month, revenue from {TABLE_NAME}").fetchall()

		for a in stuff:
			print(a)



if __name__ == "__main__":
	if sys.argv[1] == "sub":
		t = Table()
		t.add_sub(sys.argv[2], sys.argv[3])
	elif sys.argv[1] == "rev":
		t = Table()
		t.add_revenue(sys.argv[2], sys.argv[3])
	elif sys.argv[1] == "init":
		t = Table()
		t.make_table()
	elif sys.argv[1] == "print":
		t = Table()
		t.monthly_print()
	elif sys.argv[1] == 'update':
		Table().update_html()
	elif sys.argv[1] == "rev":
		t = Table()
		t.add_revenue(sys.argv[2], float(sys.argv[3])/100)



