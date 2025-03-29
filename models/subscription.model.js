import mongoose from "mongoose";

const subscriptionSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Subscription name is required"],
        trim:true,
        minLength:2,
        maxLength:100
    },
    price:{
        type:Number,
        required:[true,"Subscription price is required"],
        min:[0,"Price must be greater than 0"]
    },
    currency:{
        type:String,
        enum:["USD","EUR","INR","GBP","AUD","CAD"],
        default:"INR"
    },
    freqency:{
        type:String,
        enum:["daily","weekly","monthly","yearly"],
    },
    category:{
        type:String,
        enum:['Sports','news','entertainment','education','lifestyle','technology','finance','health','food','travel','other'],
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validator:(value)=>value<=new Date(),
        message:"Start date must be in the past"
    },
    renewalDate:{
        type:Date,
        validator:function (value){
           return value>this.startDate;
        },    
        message:"renewal date must be after the start date"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }


},{timestamps:true});

//below code is used before saving the data to the database
//Auto-calculating the renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriod[this.frequency]
    );
  }
  // Auto - update the status if renewal data has passed

  if (this.renewalDate < new Date()) {
    this.status='expired';
  }
});