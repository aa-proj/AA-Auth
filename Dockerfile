FROM node:16
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY main.mjs .
RUN npm i
CMD ["node","./main.mjs"]
