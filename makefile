
test:
	@cd api/ && node_modules/mocha/bin/mocha --reporter spec
	@karma start test/config

.PHONY: all test clean
