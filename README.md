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
docker swarm init --advertise-addr=127.0.0.1
```

## Leave swarm

```bash
docker swarm leave --force
``