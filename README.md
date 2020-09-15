# caluma-portal-demo

This project exists to showcase the usage of caluma in a portal.
This includes the following use-cases:
- Create and manage a case
- Create a form 
- Fill out a form

## Setup
To start the project you can run either `docker-compose up`
or `make`. To load some example data you can run `make loaddata`.

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
| `start` (default target)| Starts all containers                              |
| `loaddata`              | Loads a set of example data                        |
| `clean`                 | Stop and remove all containers and remove volumes. |
