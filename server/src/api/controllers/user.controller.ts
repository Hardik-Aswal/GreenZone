import { Request } from "express";
import { error, success } from "../../utils/response";
import { createUserService, getUserByEmail } from "../services/user.service";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/authUtil";


export async function createUser(req: Request){
    const { email, password, name, role = "customer" } = req.body;
    if(!email || !password || !name){
        return error("Email, password, and name are required", 400);
    }

    const user = await createUserService(email, password, name, role);

    if(!user){
        return error("User already exists", 400);
    }

    return success({
        message : "User created",
        user : user
    })
} 


export async function loginUser(req: Request){
    const {email, password, role} = req.body;

    if(!email || !password){
        return error("Email and password are required", 400);
    }

    const user = await getUserByEmail(email)

    if(!user){
        return error("User not found", 404);
    }

    if(user.role  !== role){
        return error("Invalid role", 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if(!isPasswordValid){
        return error("Invalid password", 401);
    }

    const payload = {
        id: user.id,
        role: user.role,
        email: user.email
    }

    const token = generateToken(payload)

    return success({
        message: "Login successful",
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        },
        token
    })

}