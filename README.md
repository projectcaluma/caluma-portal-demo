# caluma-building-permit-demo

This is a demo project to showcase the usage of caluma, emeis and alexandria in
a building permit scenario.

## Setup
You have to add the following entry to your `/etc/hosts`:
```
127.0.0.1 minio
```

To start the project:
```
cd ember && yarn ember build && cd -
docker-compose up -d
docker-compose exec alexandria ./manage.py migrate
docker-compose exec alexandria ./manage.py loaddata inital_data.json
```

