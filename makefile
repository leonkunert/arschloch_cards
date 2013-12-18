
test:
## Mocha tests (Backend)
	@cd api/ && node_modules/mocha/bin/mocha --reporter spec
## Karma tests (Frontend)
	@karma start config/karma.config.js
## Start the webserver
	#@node api/app.js
## Karma tests (E2E)
	@karma start config/karma-e2e.conf.js

.PHONY: all test clean
