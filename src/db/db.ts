import mongoose from "mongoose";

db().catch(err => console.log(err));

export async function db() {

  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/app_ingressos`);
    console.log('database connected');
  } catch(error: any) {
    console.log(`oops! an error ocurred: ${error.message}`);
  }
}