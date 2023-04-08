//Connection file to mongo db
import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://Conveya:yash799@cluster0.pm0sfis.mongodb.net/newproject?retryWrites=true&w=majority', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;
