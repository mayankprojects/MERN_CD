const express = require('express');
const server = express();
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

server.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);

// to use the rotue of the react router
server.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

server.listen(process.env.PORT, () => {
  console.log('server started');
});
