import mongoose, { Connection } from 'mongoose';

const connectMongo = async (): Promise<Connection> => {
  try {
    const {connection} = await  mongoose.connect(process.env.MONGO_URI! )

    if(connection.readyState == 1){
      console.log("DB 연결완료")
    }
    return connection
  } catch (errors) {
    return Promise.reject(errors)
  }
}

export default connectMongo;