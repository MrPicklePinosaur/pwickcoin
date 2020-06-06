import express from 'express'

export const pwickcoinRouter = express.Router();

pwickcoinRouter.get('/', (req, res, next) => {

    res.send('testing route');

});

