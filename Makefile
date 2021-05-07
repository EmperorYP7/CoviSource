start:
	docker compose up

server-dev:
	cd server
	createdb covisourcetestdb
	yarn
	yarn watch
