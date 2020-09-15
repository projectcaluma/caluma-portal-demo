start:
	@docker-compose up -d

loaddata:
	@docker-compose exec caluma ./manage.py loaddata setup/example-data.json

clean:
	@docker-compose down -v
