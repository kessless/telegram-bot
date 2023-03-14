const { MongoClient } = require('mongodb');

// 定义数据库连接的地址
const url = process.env.MONGO_URL;
// const url = 'mongodb://admin:123456@localhost:27017/'; 有密码连接方式 admin 表示用户名，123456 表示密码

// 定义要操作的数据库

const client = new MongoClient(url)

const oprateDBWraper = async (dbName) => {
  try {
    const database = await client.db(dbName);
    const buttons = await database.collection('menuButtons').find();
    return JSON.parse(buttons)
  } catch (error) {
    console.log(error)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


exports.oprateDBWraper = oprateDBWraper