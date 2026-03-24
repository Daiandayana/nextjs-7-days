import { ObjectId, Filter } from "mongodb";
import { connectToDatabase } from "./mongodb";
import type { User } from "@/types/User";

const USERS_COLLECTION = "users";

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const { db } = await connectToDatabase();
  const user = await db.collection<User>(USERS_COLLECTION).findOne({ email } as Filter<User>);
  
  if (!user) return null;
  
  // Convert MongoDB _id to string
  return {
    ...user,
    _id: user._id.toString(),
  };
}

/**
 * Find a user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  const { db } = await connectToDatabase();
  
  try {
    const objectId = new ObjectId(id);
    const user = await db.collection<User>(USERS_COLLECTION).findOne({ _id: objectId } as Filter<User>);
    
    if (!user) return null;
    
    return {
      ...user,
      _id: user._id.toString(),
    };
  } catch {
    return null;
  }
}

/**
 * Create a new user
 */
export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}): Promise<User> {
  const { db } = await connectToDatabase();
  
  const newUser = {
    email: data.email,
    password: data.password, // In production, this should be hashed!
    name: data.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await db.collection(USERS_COLLECTION).insertOne(newUser);
  
  return {
    ...newUser,
    _id: result.insertedId.toString(),
  };
}

/**
 * Update user password
 */
export async function updateUserPassword(
  id: string,
  newPassword: string
): Promise<boolean> {
  const { db } = await connectToDatabase();
  
  try {
    const objectId = new ObjectId(id);
    const result = await db.collection(USERS_COLLECTION).updateOne(
      { _id: objectId } as Filter<User>,
      { 
        $set: { 
          password: newPassword, // In production, hash this!
          updatedAt: new Date() 
        } 
      }
    );
    
    return result.modifiedCount > 0;
  } catch {
    return false;
  }
}

/**
 * Seed demo users (for development only)
 */
export async function seedDemoUsers(): Promise<number> {
  const existingUsers = await findUserByEmail("syah@example.com");
  if (existingUsers) {
    return 0; // Already seeded
  }

  const demoUsers = [
    {
      email: "syah@example.com",
      password: "123456",
      name: "Syah",
    },
    {
      email: "admin@example.com",
      password: "admin123",
      name: "Admin",
    },
  ];

  const { db } = await connectToDatabase();
  const usersToInsert = demoUsers.map((user) => ({
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await db.collection(USERS_COLLECTION).insertMany(usersToInsert);
  
  return demoUsers.length;
}