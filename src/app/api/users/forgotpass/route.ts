import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await User.findOne({isVerified: true, email: email}).select("-password");
        if(!user){
            return NextResponse.json({error: "Invalid Email"}, {status: 400});
        } else {
            //Send Password Reset Email
            await sendEmail({email, emailType: "reset", userId: user._id});
            return NextResponse.json({
                message: "Password reset link has been sent to your e-mail",
                success: true,
                data: user
            });
        }
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({error: error.message}, {status: 500});
    }
}