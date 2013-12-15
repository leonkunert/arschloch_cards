
test:
	@cd api/test/ && mocha --reporter spec

.PHONY: all test clean
