import bcrypt from 'bcrypt';
import { db } from '../../db/drizzle';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

export async function createUserService(email : string, password : string, name: string, role : string){
       
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    
    if (existingUser.length > 0) {
        return null; 
    }

    const passwordHash = await bcrypt.hash(password, 10);
        
    const newUser = await db.insert(users).values({
      email,
      passwordHash,
      name,
      role: role as "customer" | "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt
    });

    return newUser[0];

}


export async function getUserByEmail(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user[0] || null;
}