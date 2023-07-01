#==================================================
# checkout layer
#==================================================
FROM node:18.16.1 as checkout

WORKDIR /app

COPY package.json package-lock.json ./

COPY src ./src

#==================================================
# local install layer
#==================================================
FROM checkout as local_install

RUN npm install

COPY tsconfig.json ./

#==================================================
# development run layer
#==================================================
FROM local_install as development_run

CMD ["npm", "start"]
