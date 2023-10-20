FROM node:latest
WORKDIR /usr/app
COPY dist .
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile
CMD ["node", "./src/main.js"]