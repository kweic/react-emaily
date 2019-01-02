const express = require('express');
const app = express();

//run with 'node index.js'
//ctrl + c to stop node

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

//get get info
//post send info
//put update all the properties of something
//delete delete something
//patch update one or two properties of something

const PORT = process.env.PORT || 5000; //port declared by heroku
app.listen(PORT);
//instructs express to tell node.js (the runtime) to listen to this port

//releasing on Heroku
// 'heroku create'
// outputs the url & the git link
// git push heroku master