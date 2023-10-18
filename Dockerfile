FROM node:latest
WORKDIR /home/node/app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn tsc -p .
EXPOSE 4000
CMD [ "node", "dist/src/main.js"]