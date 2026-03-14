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
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-cyan-400">
        My Blog
      </h1>

      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        
        {/* Left Side - Status & Create Button */}
        <div className="w-full md:w-1/3">
          <div className="bg-[#1e3a5f] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Database Status</h2>
            <p
              className={`p-2 rounded mb-4 ${
                dbStatus.success
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {dbStatus.message}
            </p>
            
            <CreatePostButton />
          </div>
        </div>

        {/* Right Side - Posts List */}
        <div className="w-full md:w-2/3">
          <div className="bg-[#1e3a5f] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">All Posts</h2>
            <DisplayPostList />
          </div>
        </div>
        
      </div>
    </div>
  );
}
