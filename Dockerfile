FROM node:alpine
WORKDIR /usr/src/app

CMD ["npm", "run", "watch-build"]
