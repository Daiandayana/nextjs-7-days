import { ObjectId } from "mongodb";
import { connectToDatabase } from "./mongodb";

const USERS_COLLECTION = "users";

/**
 * Find a user by email
 */
export async function findUserByEmail(email: string) {
  const { db } = await connectToDatabase();
  const user = await db.collection(USERS_COLLECTION).findOne({ email });
  
  if (!user) return null;
  
  return {
    _id: user._id?.toString() || '',
    email: user.email,
    password: user.password,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/**
 * Find a user by ID
 */
export async function findUserById(id: string) {
  const { db } = await connectToDatabase();
  
  try {
    const objectId = new ObjectId(id);
    const user = await db.collection(USERS_COLLECTION).findOne({ _id: objectId });
    
    if (!user) return null;
    
    return {
      _id: user._id?.toString() || '',
      email: user.email,
      password: user.password,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
}) {
  const { db } = await connectToDatabase();
  
  const newUser = {
    email: data.email,
    password: data.password,
    name: data.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await db.collection(USERS_COLLECTION).insertOne(newUser);
  
  return {
    _id: result.insertedId.toString(),
    email: data.email,
    password: data.password,
    name: data.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Update user password
 */
export async function updateUserPassword(id: string, newPassword: string): Promise<boolean> {
  const { db } = await connectToDatabase();
  
  try {
    const objectId = new ObjectId(id);
    const result = await db.collection(USERS_COLLECTION).updateOne(
      { _id: objectId },
      { 
        $set: { 
          password: newPassword,
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
    return 0;
  }

  const demoUsers = [
    { email: "syah@example.com", password: "123456", name: "Syah" },
    { email: "admin@example.com", password: "admin123", name: "Admin" },
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
