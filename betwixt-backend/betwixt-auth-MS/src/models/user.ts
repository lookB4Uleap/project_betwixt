import { model } from "mongoose";
import { Schema } from "mongoose";


interface UserProps {
    uid: string;
    name: string;
    email: string;
    password?: string;
    address?: string;
    city?: string;
    pincode?: string;
    phone?: string;
    photoUrl?: string;
}

let userSchema = new Schema<UserProps>({
    name: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    photoUrl: String
}, {
    timestamps: true,
    collection: 'users'
})

const User = model<UserProps>('User', userSchema);
export default User;