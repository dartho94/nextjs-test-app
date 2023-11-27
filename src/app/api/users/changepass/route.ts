import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token, password, cpassword, _id} = reqBody;

        const user = await User.findOne({_id: _id, forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword
        
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({
            message: "Password has been reset",
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}