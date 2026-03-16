import HomeContent from "./components/HomeContent";

async function checkDatabaseConnection() {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "HEAD",
      cache: "no-store",
    });

    if (res.ok) {
      return {
        success: true,
        message: "Successfully connected to MongoDB",
      };
    }
    throw new Error("Failed to connect");
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

  return <HomeContent dbStatus={dbStatus} />;
}
