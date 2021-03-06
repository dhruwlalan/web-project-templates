require('dotenv').config();
const mongodb = require('./database/mongodb.js');
const app = require('./app.js');

///Connect to MongoDB///
mongodb.connect();

///Start Server///
const server = app.listen(process.env.PORT || 8000);

///Global Error Handlers for Unhandled Errors///
process.on('unhandledRejection', (err) => {
   console.log('Unhandled Rejection Error: ', err);
   console.log('Shutting Down...');
   server.close(() => {
      process.exit(1);
   });
});
process.on('uncaughtException', (err) => {
   console.log('Uncaught Exception Error: ', err);
   console.log('Shutting Down...');
   server.close(() => {
      process.exit(1);
   });
});
process.on('SIGTERM', () => {
   console.log('SIGTERM RECEIVED. Shutting down gracefully..!');
   server.close(() => {
      console.log('Process Terminated!');
   });
});
