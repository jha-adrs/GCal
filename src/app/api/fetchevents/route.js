import { google } from 'googleapis';
import { NextResponse } from "next/server";
import {headers} from 'next/headers'
import { cookies } from 'next/headers'
import config from '../../../config/config';
import axios from 'axios';

// TODO: Refresh Token and sync with cookies

export async function GET(req, res){
    console.log("GET request google calendar");
    let response;
    try{
        
        const headersList = headers();
        
        const providertoken = headersList.get('providertoken');
        const refreshtoken = headersList.get('refreshtoken');
        const user_id = headersList.get('user_id');
         if(!providertoken){
                console.log("No provider token");
                return NextResponse.json({success:0, error_message: "TOKEN_EXPIRED", data: []});
         }
        response = await listCalendarEvents(providertoken);

        console.log("GET request google calendar2 |");
        if(response.error?.code ===403 && response.error.status === "PERMISSION_DENIED"){
            console.log("403 error");
            return NextResponse.json({success:0, error_code: 403, error_message: "PERMISSION_DENIED", data: []});
            //refreshToken(providertoken, refreshtoken);
        }

    }catch(error){
        console.log("Error in GET request google calendar |", error);
    }
    return NextResponse.json({data: response.items});
}

const refreshToken = async (authtoken, refresh_token) => {
    console.log("refreshToken |", refresh_token);
    try{
        const {data, error} = await supabase.auth.refreshSession({refreshToken});
        if(error){
            throw error;
        }
        listCalendarEvents(data.access_token, refresh_token);
    }
    catch(error){
        console.log("refreshToken error |", error.code, error.message);
    }
}

const listCalendarEvents = async (auth_token, refresh_token) => {
    
    try{
        const response = await fetch(config.GOOGLE_PRIMARY_CALENDAR_URI, {
            method: 'GET',
            headers:{
                Authorization: `Bearer ${auth_token}`
            }
        });
        return await response.json();
    }
    catch(error){
        console.log('listCalendarEvents2 error |', error.code, error.message);
        if(error.code === 401){
            console.log("401 error");
            //refreshToken(auth_token,refresh_token);
        }
        return {success:0,items: []}
    }
    


};

export const dynamic = 'force-dynamic'