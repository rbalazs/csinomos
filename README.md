# ottvok
> When to get going, if I want to spent the least possibe time in the traffic?

Provisional data about the time spent driving with various departure times.

Prototype: http://gooffice.herokuapp.com/

## Contribute
 - Clone
 - NPM install
    - docker run -v $HOME/ottvok:/foo -w /foo node:argon npm install
 - Fire up the Docker container
    - docker build -t \<username>/ottvok-app .
    - docker run -p 49160:8080 -v $HOME/ottvok:/usr/src/app \<username>/ottvok-app
 - Open up http://localhost:49160/

Contributions are always welcome! : )