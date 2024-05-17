FROM  node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npx prisma generate
EXPOSE 8003
RUN npm run build
CMD npx prisma migrate dev --name init && npm run start 


