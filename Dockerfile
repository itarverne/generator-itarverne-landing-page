FROM node:8

# RUN mkdir -p /usr/src/app/public/node_modules 

# Create app directory
WORKDIR /usr/src/app/public

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g grunt-cli sass
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

# EXPOSE 9000
# RUN cd public && npm install && grunt serve