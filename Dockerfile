FROM node:latest
WORKDIR /usr/app
COPY . .
RUN yarn
RUN yarn tsc --project tsconfig.json
RUN rm -rf src tests tsconfig.json yarn* 
CMD ["node", "./dist/src/main.js"]


