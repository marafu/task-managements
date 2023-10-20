FROM node:latest
WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lock
COPY dist .
CMD ["node", "./dist/src/main.js"]


