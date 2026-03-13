import CreatePostButton from "./components/CreatePostButton";
import DisplayPostList from "./components/DisplayPostList";
import { connectToDatabase } from "./lib/mongodb";

async function checkDatabaseConnection() {
  try {
    const { db } = await connectToDatabase();

    await db.command({ ping: 1 });

    return {
      success: true,
      message: "Successfully connected to MongoDB",
    };
  } catch (error) {
    return {
      success: false,
      message:
        "Failed to connect to MongoDB: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export default async function HomePage() {
  const dbStatus = await checkDatabaseConnection();

  return (
    <div>
      <h1>MongoDB Connection Status</h1>
      <p>{dbStatus.message}</p>

      <CreatePostButton />
      <DisplayPostList />
    </div>
  );
}
