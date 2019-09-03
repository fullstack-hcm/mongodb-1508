const express = require('express');
const server  = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const PORT    = 3000;


/**
 * import internal
 */
const { USER_ROUTER } = require('./routers/user.route');

server.set('view engine', 'ejs');
server.set('views', './views');

server.use(express.static('./public/'));
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/user', USER_ROUTER);

server.get('*', (req, res) => res.json({ error: 'not found' }));

const url = 'mongodb://localhost:27017/mernstack_1508';
mongoose.connect(url);
mongoose.connection.once('open', () => {
    console.log(`mongodb connected`);
    server.listen(PORT, () => console.log(`server started at port ${PORT}`));
});