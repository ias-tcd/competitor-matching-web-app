run:
	pnpm run tsc && docker-compose -f docker/docker-compose.local.yml up --build
	
build:
	pnpm run tsc && docker-compose -f docker/docker-compose.local.yml build

down:
	docker-compose -f docker/docker-compose.local.yml down

restart:
	make down && make run
