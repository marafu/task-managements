FROM node:latest
WORKDIR /usr/app
COPY package.json .
COPY tsconfig.json . 
COPY . . 
RUN yarn
RUN yarn tsc --project tsconfig.json
CMD ["node", "./dist/src/main.js"]