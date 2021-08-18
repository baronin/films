up:
	docker-compose up -d

upbuild: 
	docker-compose up  -d --build

ps: 
	docker-compose ps

down:
	docker-compose down --remove-orphans
	
cli:
	docker exec -ti mongo /bin/bash	
