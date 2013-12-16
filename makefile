
test:
## Mocha tests (Backend)
	@cd api/ && node_modules/mocha/bin/mocha --reporter spec
## Karma tests (Frontend)
	@karma start test/karma.config.js

.PHONY: all test clean
