# caluma-portal-demo

This project exists to showcase the usage of caluma in a portal.
This includes the following use-cases:
- Create and manage a case
- Create a form 
- Fill out a form

## Setup
To start the project you can run `docker-compose up`
To load some example data you can run `make loaddata`.

If you get exceptions from `make loaddata` make sure that the caluma container
is running *and* has all migrations finished.

To start the ember development server, use:
```bash
cd ember && yarn && yarn start-proxy
```

### Optional

To use alexandria and emeis you need to do the following steps:

You have to add the following entry to your `/etc/hosts`:
```
127.0.0.1 minio
```

To start the project:
```bash
docker-compose exec alexandria ./manage.py migrate
docker-compose exec alexandria ./manage.py loaddata inital_data.json
```

## Make commands

| Command                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `loaddata`              | Loads a set of example data                        |
| `flush`                 | Flush the caluma container                         |
