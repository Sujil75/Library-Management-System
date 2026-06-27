const app = require('./app')
const connectDb = require('./config/dbConnetion');
const dns = require('dns');
require('dotenv').config();

const DNS_PORT = process.env.DNS_PORT.split(',').map(s => s.trim());
dns.setServers(DNS_PORT)

const PORT = process.env.PORT;

const startServer = () => {
    try {
        app.listen(PORT, async () => {
            await connectDb()
            console.log(`Server is running at localhost:${PORT}`)
        })
    } catch (err) {
        console.error("Server not running: ", err.message)
    }
};

startServer();