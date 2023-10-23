FROM node:latest
WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
COPY . .
RUN yarn
RUN yarn tsc --project tsconfig.json
RUN rm -rf node_modules src tests tsconfig.json yarn.lock
RUN yarn install --production --frozen-lock
CMD ["node", "./dist/src/main.js"]


