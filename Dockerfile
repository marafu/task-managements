FROM node:latest
WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile
COPY src .
RUN yarn tsc --project tsconfig.json
RUN rm -rf src
CMD ["node", "./dist/src/main.js"]