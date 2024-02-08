install:
	npm install

docker:
	docker compose up

e2e-test:
	(cd e2e && npm run test)

test:
	(cd api && npm run test && cd ../ui && npm run test)
