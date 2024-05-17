FROM  node:lts-alpine

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .


RUN npx prisma generate



EXPOSE 8003

RUN npm run build

CMD npx prisma migrate dev --name init && npm run start 


