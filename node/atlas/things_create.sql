1	use test
2	db.things.drop()
3
4	m = {ename : "smith"}
5	n = {empno : 1101}
6	db.things.save(m)
7	db.things.save(n)
8	db.things.find()
9
10	db.things.insert({empno:1102, ename:"king"})
11	db.things.find()
12
13	for (var n = 1103; n <= 1120; n++) db.things.save({n:n, m:"test"})
14	db.things.find()
15	it
