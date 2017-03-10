FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8080
CMD [ "npm", "start" ]

# cd working directory ($HOME/ottvok)
# npm: docker run -v $HOME/ottvok:/foo -w /foo node:argon npm install
# build: docker build -t <username>/ottvok-app .
# startup: docker run -p 49160:8080 -v $HOME/ottvok:/usr/src/app <username>/ottvok-app

# docker run -v $HOME/ottvok:/usr/src/app rbalazs/jsdoc /usr/src/app -r -c conf.json