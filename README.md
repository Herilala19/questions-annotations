## Installation of the application
- Environment variable: please contact me for the variables

- After the git clone, go to the project folder. We have two options: 
    - Using docker-compose
    - Using system shell command

### System internal command
- npm install
- sudo npm install -g nodemon
- nodemon
### Docker-compose
- (sudo) docker-compose up (-d)
## Questions and annotations handlers
The application store questions and topics (annotations).
Questions can have multiple topics that's represented as a tree.
## Import topics and questions
It's mendatory that first import is topics, then topics child and finally questions
### Import topics
http://localhost:3003/script/import?range=Topics!A2:I (get)
Call this end-point in postman or simple browser

### Import child of topcs
http://localhost:3003/script/import-child (get)

### Import questions
http://localhost:3003/script/import?range=Questions!A2:I (get)

### Remarque
These initialisations takes more times, please, be patient.

## Search: 
Call this end-point to make the search questions linked to the selected topic
http://localhost:3003/api/search?q=Golgi body

### Remarque
Be sure about the topic name request, if the topic doesn't exist, there will be a message that the topic doesn't exist