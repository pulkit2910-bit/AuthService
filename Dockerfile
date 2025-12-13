FROM node:20-alpine

WORKDIR /app

# Copy package.json files for caching
COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "src/index.js"]