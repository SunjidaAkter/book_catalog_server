import mongoose from 'mongoose';
import colors from 'colors';
import app from './app';
import config from './config';
import { Server } from 'http';

//Defining Server
let server: Server;

//Handling uncaught exception
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

//main function
async function bootstrap() {
  try {
    //Connecting mongoDB
    await mongoose.connect(config.database_url as string);
    console.log(
      colors.green.bold(`🟢🟢 Database is connected successfully! 🟢🟢`)
    );

    //Listening to the server
    server = app.listen(config.port, () => {
      console.log(
        colors.blue.bold(`🔵🔵 Server is listenting on ${config.port}! 🔵🔵`)
      );
    });
  } catch (error) {
    console.log('Failed to connect database', error);
  }

  //Gracefully off the server
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

//Calling main function
bootstrap();

//Handling Signal Termination
process.on('SIGTERM', () => {
  console.log('SIGTERM is received!');
  if (server) server.close();
});
