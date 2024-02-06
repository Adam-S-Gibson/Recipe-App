install:
	npm install

docker:
	docker compose up

integration-test:
	(cd e2e && npm run e2e)

test:
	(cd ../api && npm run test && cd ../ui && npm run test)
