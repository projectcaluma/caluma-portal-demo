loaddata:
	@docker compose exec caluma poetry run ./manage.py loaddata setup/example-data.json

flush:
	@docker compose exec caluma poetry run ./manage.py flush --no-input
