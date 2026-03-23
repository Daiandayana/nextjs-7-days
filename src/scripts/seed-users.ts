/**
 * Seed Script - Add Demo Users to MongoDB
 * Run this once to create demo users in the database
 * 
 * Usage: npx tsx src/scripts/seed-users.ts
 * or: npm run seed:users
 */

// Load dotenv FIRST before any other code
require("dotenv").config({ path: ".env.local" });

// Debug: Check if env vars are loaded
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✓ loaded" : "✗ NOT loaded");
console.log("MONGODB_DB:", process.env.MONGODB_DB ? "✓ loaded" : "✗ NOT loaded");

// Now import and run seed
const { seedDemoUsers } = require("../lib/users");

async function main() {
  console.log("🌱 Seeding demo users to MongoDB...");
  
  try {
    const count = await seedDemoUsers();
    
    if (count > 0) {
      console.log(`✅ Successfully added ${count} demo users!`);
      console.log("\n📝 Demo Accounts:");
      console.log("   - syah@example.com / 123456");
      console.log("   - admin@example.com / admin123");
    } else {
      console.log("ℹ️  Demo users already exist. No changes made.");
    }
    
    console.log("\n✅ Seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

main();