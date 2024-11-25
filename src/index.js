const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo')
const {insertAd, getAds} = require('./database/ads');
const {deleteAd, updateAd} = require('./database/ads');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
//adding morgan to log HTTP requests
app.use(morgan('combined'));

app.get('/', async(req, res) => {
    res.send(await getAds());
});
app.post('/', async(req,res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({ message : 'new ad inserted.' })
})
app.delete('/', async(req,res) => {
    await deleteAd(req.params.id);
    res.send({ message : 'Ad removed.' })
})
app.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.send({ message: 'Ad updated.' });
  });

startDatabase().then(async () => {
    await insertAd({title: 'Hellow, from the in-memory database'});

    app.listen(3001, async () => {
        console.log('listening on port 3001')
    });

});






