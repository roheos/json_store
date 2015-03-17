#JsonStoreSimple
#### a simple solution for storing your json data in files using a restful webservice api

JSONstoreSimple is developed as there was no existing Solution in Github etc.
for storing any kind of JSON-Files over REST-Api.

So the existing Solution is kind of very basic and simple -
it needs only a server with running node and the ability of installing npm-packes
This could be any cheap (virtual) "Root-Server" with shell login

Actual the storing is simply done in a File for each Json,
performance is no issue and unixoid filesystem are very fast and stable.
If you are planning to store more than 300.000 files you could think for adopting it to storing in a database.

## API (CORS-enabled)

####Store new Data:
Post Call to http://servername:port/new
Result: responseText with the id for getting the Json back

####Get Data:
Get Call to http://servername:port/:id
Server Response OK 200

####Update Data:
Post Call to http://servername:port/:id
Server Response OK 200  

##Installing
in directory with any name,  
download via zip (and unpack) or install via git  
adopt following variables in JsonStoreSimple.js  

`var jsonStoreDir = './jsonstore/'; //if possible a local mount (for performance issues)`

`var debugLevel = 2;      //0 shows nothing, 3 most messages at console.log`

`var randomIdLength = 6; //if you are expecting really lot of json data request this should be set to 8 or 10`

`var portNumber = 1212; //set here or use environment Variable "PORT" to setup`


npm install  
npm start

to verify functionality (maybe adopt var myJsonUrl='http://127.0.0.1:1212/'; in JsonStoreSimple.html ):
http://127.0.0.1/your_directory/JsonStoreSimple.html
then in top-right of text-field click on "fill with test data" and then click "save" button


