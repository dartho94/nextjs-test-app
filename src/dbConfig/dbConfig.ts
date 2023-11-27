import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully.');
        });

        connection.on('error', (err) => {
            console.log('MongoDB error');
            console.error(err);
        });
    } catch (error) {
        console.log('Something went wrong!');
        console.error(error);
    }
}