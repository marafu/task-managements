FROM node:latest
WORKDIR /home/node/app
COPY package.json .
RUN yarn
COPY tsconfig.json .
RUN ls -la
COPY ./src .
RUN yarn tsc -p ./src
EXPOSE 4000
CMD [ "node", "dist/src/main.js"]