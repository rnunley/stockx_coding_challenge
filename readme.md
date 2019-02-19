##True to Size Demo

#### Quick Aside
I would have used Docker Compose for this project, however it 
requires Windows Pro and I have Home available to me at the moment.
Further, in a production service I would include unit tests with Jest 
and Sinon for mocking.

## Setup

1) Execute create_database.sql with a user that has the appropriate permissions 
    on a Postgress server. 
    
2) Update database details in index.js to match your configuration. 

3) Run npm install at the command prompt or terminal.

4) Run npm start at the command prompt or terminal. 


## Usage 

The service exposes a RESTful endpoint at localhost:(port configured in index.js)/truetosize 
that handles GET and POST methods. 

GET - Expects query parameters make and model and returns and object containing the true to size 
    value.

POST - Expects query parameters make, model and size and returns the inserted record with the 
    identifier populated.  