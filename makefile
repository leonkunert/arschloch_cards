
test:
## Mocha tests (Backend)
	@cd api/ && node_modules/mocha/bin/mocha --reporter spec
## Karma tests (Frontend)
	@karma start test/config

.PHONY: all test clean
