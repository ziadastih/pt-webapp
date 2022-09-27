require("dotenv").config();

const connectDB = require("./connectDb/connect");
const workouts = require("./models/workoutSchema");

const wokroutplans = require("./workouts.json");

const start = async () => {
  try {
    await connectDB(process.env.PT_URI);
    await workouts.deleteMany();
    await workouts.create(wokroutplans);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
