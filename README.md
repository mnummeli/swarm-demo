# A Docker Swarm demo

## Pre-requisities

* Node.js
* Docker
* Docker-Compose

## Basic usage

```bash
node index.mjs
```

Point your browser to

```
http://localhost:3000/?=<your name>
```

## Build Docker image

```bash
docker build -t swarm-demo .
```

## Run Docker image

```bash
docker run -it --rm -p "3000:3000" swarm-demo
```

or

```bash
docker-compose up
```

## Run Docker image in a swarm

```bash
docker swarm init --advertise-addr=<YOUR IP ADDRESS>
```

```bash
docker service create --name swarm-demo --replicas 5 --publish "3000:3000" swarm-demo
```
An alternative to the former is:

```bash
docker stack deploy -c docker-stack.yml swarm-demo
```

where the `docker-stack.yml` content should be similar to:

```yaml
version: "3.8"

services:
    swarm-demo:
        image: swarm-demo
        deploy:
            replicas: 5
        ports:
            - "3000:3000"
```

The scaled up service should respond at:

* http://YOUR_HOSTNAME:3000/

Please note that you should use your proper hostname, not `localhost` here.

## Scale down and remove service

When you want to get rid of your service, first scale it down to `0` with:

```bash
docker service scale swarm-demo=0
```

and then remove the service with:

```bash
docker service rm swarm-demo
```

## Leave swarm

```bash
docker swarm leave --force
```
