//for supporing require of serve we used below code
import {createRequire} from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";
const require = createRequire(import.meta.url);

const reminders=[7,5,3,1]
// this can't be imported qstash directly because it uses require
const {serve}=require("@upstash/workflow/express");

export const sendReminder=serve(async (context)=>{
    const {subscriptionId}=context.requestPayload;
    const subscription=await fetchSubscription(context,subscriptionId);
    if(subscription||subscription.status!=active)return;
    const renewalDate= dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal data has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return; 
    }
    for(const daysBefore of reminders){
        const reminderDate=renewalDate.subtract(daysBefore,'day');
        // renewal date = 22 feb, reminder date =15 feb ,17,20,21 ,current date = 16 feb
        if(reminderDate.isAfter(dayjs())){
await sleepUntilRemainder(context,`Reminders ${daysBefore} days before`,reminderDate);

        }
        await triggerReminder(context,`Reminder ${daysBefore} days before`);
    }
});


const fetchSubscription=async (context,subscriptionId)=>{
    return await context.run('get subscription',()=>{
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
}

const sleepUntilRemainder=async(context,label,date)=>{
console.log(`Sleeping until ${label} reminder at ${date}`);
await context.sleepUntil(label,date.toDate());
}

const triggerReminder=async(context,label)=>{
    return await context.run(label,()=>{
        console.log(`Triggering ${label} reminder`);
        //send email,SMS, Push notification...
    })

}