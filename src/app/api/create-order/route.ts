import { NextRequest,NextResponse } from "next/server";
import Razorpay from 'razorpay'



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_ID!,
});

export const POST=async(request:NextRequest)=>{
try {
    const body=await request.json()
    const order=await razorpay.orders.create({
        amount:body.amount,
        currency:"INR"
    })
    return NextResponse.json({orderId:order.id},{status:200})
} catch (error) {
    console.error(error);
     return NextResponse.json({ error: "Error Creating order" }, { status: 500 });
}
}