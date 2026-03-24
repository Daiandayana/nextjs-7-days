import HomeContent from "@/components/HomeContent";
import { Suspense } from "react";
import HomePageSkeleton from "@/components/HomePageSkeleton";
import { connectToDatabase } from "@/lib/mongodb";

export const revalidate = 60;

async function checkDatabaseConnection() {
  try {
    await connectToDatabase();
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

async function DatabaseStatus() {
  const dbStatus = await checkDatabaseConnection();
  return <HomeContent dbStatus={dbStatus} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <DatabaseStatus />
    </Suspense>
  );
}
