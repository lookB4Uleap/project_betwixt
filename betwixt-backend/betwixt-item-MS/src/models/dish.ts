import { Schema, model } from "mongoose";

export interface DishProps {
    dish_name: string;
    price: number;
    description?: string;
    dish_details?: {
        ingredients?: string[];
    };
    highlight?: string[];
    images?: string[];
    types: string[];
}

const dishSchema = new Schema<DishProps>({
    dish_name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    dish_details: {
        ingredients: [String]
    },
    highlight: [String],
    images: [String],
    types: [String]
}, {
    timestamps: true,
    collection: 'Dishes'
});

const Dish = model<DishProps>('Dish', dishSchema);
export default Dish;