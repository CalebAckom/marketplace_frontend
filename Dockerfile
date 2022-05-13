# Pulling base image
FROM node:10-alpine

#Setting working directory
WORKDIR /usr/src/app/


#Installing dependencies
COPY package*.json ./
RUN npm install

# Copying project
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
