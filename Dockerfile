FROM node:18

RUN \
    npm install -g npm
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
