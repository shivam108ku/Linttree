"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async()=>{
    try {
        const user = await currentUser()

        if(!user){
            return{
                success: false, error: "No authenticated User found"
            }
        }

        const { id , firstName , lastName , emailAddresses , imageUrl } = user;

        const newUser = await db.user.upsert({
            where:{
                clerkId:id
            },
            update:{
                firstName:firstName || null,
                lastName:lastName || null,
                imageUrl:imageUrl || null,
                email:emailAddresses[0]?.emailAddress || "",
            },
            create:{
                clerkId:id,
                firstName:firstName || null,
                lastName:lastName || null,
                imageUrl:imageUrl || null,
                email:emailAddresses[0]?.emailAddress || "",
            }
        })

        return {
            success:true,
            user:newUser,
            message:"User onBoarded sucessfully"
        }

    } catch (error) {
        console.error("Error onBoarding user");
        return {
            success:false,
            error: "Failed to onboard user"
        };
    }
}