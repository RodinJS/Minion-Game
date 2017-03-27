const app = require('./express');
const apiSocket = require('./apiSocket');
const PORT = process.env.PORT || 3010;

const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT} ('Minion Game' )`);
});
apiSocket.run(server);

module.exports = app;
