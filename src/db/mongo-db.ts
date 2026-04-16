import { MongoClient } from "mongodb";
import { BlogDbModel } from "../blogs/models/blogs-models";
import { PostDbModel } from "../posts/models/posts-models";
import { UserDbModel } from "../users/models/users-models";
import { CommentDbModel } from "../comments/models/comments-models";
import dotenv from 'dotenv';


dotenv.config()

// 1. Получаем URL из окружения или используем локальный
console.log("Current MONGO_URL:", process.env.MONGO_URL);
const mongoUri = process.env.MONGO_URL || "mongodb://0.0.0.0:27017";
const dbName = "BlogsAndPosts";

// 2. Создаем клиента
export const client = new MongoClient(mongoUri);

// 3. Создаем объект базы данных
export const db = client.db(dbName);

// 4. Экспортируем коллекции (Централизованно)
export const blogsCollection = db.collection<BlogDbModel>("blogs");
export const postsCollection = db.collection<PostDbModel>("posts");
export const usersCollection = db.collection<UserDbModel>("users");
export const commentsCollection = db.collection<CommentDbModel>("comments");

// 5. Функция запуска базы
export async function runDb() {
  try {
    // Соединяемся с сервером
    await client.connect();

    // Проверяем соединение через пинг
    await db.command({ ping: 1 });
    console.log(`✅ Connected successfully to Mongo database: ${dbName}`);

    // Выводим текущую статистику для контроля при старте
    const usersCount = await usersCollection.countDocuments();
    console.log(`👥 Users in DB: ${usersCount}`);

    return true;
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e);
    // Закрываем соединение при ошибке
    await client.close();
    return false;
  }
}
