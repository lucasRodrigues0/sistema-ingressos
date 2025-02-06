import mongoose from "mongoose";

db().catch(err => console.log(err));

export async function db() {

  try {
    await mongoose.connect(`${process.env.DB_STRING}`);
    console.log('database connected');
  } catch(error: any) {
    console.log(`oops! an error ocurred: ${error.message}`);
  }
}