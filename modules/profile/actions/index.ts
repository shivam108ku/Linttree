"use server"

import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
 

export const checkProfileUsernameAvailability = async (username:string)=>{
    if(!username) return {available:false , suggestion:[]}

    const user = await db.user.findUnique({
        where:{
            username:username
        }
    })
    if(!user){
        return {available:true};
    }

    const suggestion = await getAvailableUsernameSuggestion(username , 3 , 10)
    
}

