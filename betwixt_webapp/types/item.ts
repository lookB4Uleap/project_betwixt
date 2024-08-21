type DishNameKeys = "dishName" | "dish_name"
type DishDetailsKeys = "dishDetails" | "dish_details"

export type DishDetailKeys = "ingredients"

export type DishDetails = {
    [key in DishDetailKeys]: string;
}

export type Item = {
    _id: string;
    dishName: string;
    description: string;
    dishDetails: DishDetails;
    price: number;
    types: string[];
    images: string[];
    [key: string]: any;
}