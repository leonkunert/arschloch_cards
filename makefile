
test:
	/usr/local/share/npm/bin/mocha \
		--reporter spec
	cd api/test/test.js
	mocha