
test:
	@cd api/ && node_modules/mocha/bin/mocha --reporter spec

.PHONY: all test clean
