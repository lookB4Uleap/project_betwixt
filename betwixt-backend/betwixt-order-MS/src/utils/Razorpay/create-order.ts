import Razorpay from "razorpay"

export const createRazorpayOrder = async (totalCostInPaisa: number) => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_ID) {
        console.log('[Order-MS] Razorpay Keys Missing!');
        throw "Unable to process order";
    }

    const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_ID });

    try {
        const order = await instance.orders.create({
            amount: totalCostInPaisa,
            currency: "INR",
        });
        return order;
    }
    catch(err: any) {
        console.log('[Order-MS] Error while creating razorpay order', err);
        throw err;
    }
}
