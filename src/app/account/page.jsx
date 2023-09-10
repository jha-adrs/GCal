import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'
import axios from 'axios'
import config from '../../config/config'
import { da } from 'date-fns/locale'

 
export default async function Account() {
  const supabase = createServerComponentClient({ cookies })
  let fetchedData = [];
  let calendar_status_response;
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const calendar_status_handler = async (status) =>{
    const {error} = await supabase.from('profiles').update({calendar_status:status}).eq('id',session.user.id);
  }
  try {
    let reqConfig={
      headers:{
        'accesstoken':session.access_token,
        'refreshtoken':session.refresh_token,
        'providertoken':session.provider_token,
        'providerrefreshtoken':session.provider_refresh_token,
        'provider':session.provider,
        'user_id':session.user.id,
      }
    }
    const response = await axios.get(config.HOST_URI + config.FETCH_EVENTS_URI,reqConfig);
    fetchedData = response.data.data;
   
    //Fetch calendar_status from db
    if(response.data.success == 0 && response.data.error_message == "PERMISSION_DENIED"){
        calendar_status_handler(0);
    }
    else if(response.data.success ==0 && response.data.error_message=="TOKEN_EXPIRED"){
      // Logout user
      const { error } = await supabase.auth.signOut()
      
      console.log("TOKEN EXPIRED", error);
    }
    const {data,error} = await supabase.from('profiles').select('calendar_status').eq('id',session.user.id);
    calendar_status_response = data
    if(error){
      console.error(error);
    }
    calendar_status_response = data[0].calendar_status;
    calendar_status_handler(1);
  } 
  catch (err) {
    console.error('Error fetching data:', err.code);
  }
  console.log(await JSON.stringify(fetchedData));
  return <>
  <AccountForm data={fetchedData} calendar_status={calendar_status_response} />
  </>
}