import { Blockchain } from './Blockchain'
import express from 'express'


const bc = new Blockchain();

const app = express();

app.get('/blockchain', (req, res) => {
    res.send(JSON.stringify(bc));
});
app.post('/newblock', (req, res) => {
    //generate a new block
    
});

app.listen(5000);

/*
console.log(bc.blockchain);

console.log(bc.validateBlockChain(bc.blockchain));
*/