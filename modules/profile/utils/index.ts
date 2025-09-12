import { db } from "@/lib/db";

export async function getAvailableUsernameSuggestion(base:string , count = 3 , maxTries=10){
    const suggestions:string[] = [];
}