loaddata:
	@docker-compose exec caluma ./manage.py loaddata setup/example-data.json

flush:
	@docker-compose exec caluma ./manage.py flush --no-input
