import 'dotenv/config';
import { NextFunction, Response, Router } from 'express';
import Dish, { DishProps } from '../models/dish';
import { BetwixtRequest } from '../utils/betwixt-request';
import authorize from '../middlewares/authorize';

const router = Router();

const mapToObject = (map: Map<string, DishProps[]>) => Object.fromEntries(map.entries());

const segmentDishes = (dishes: DishProps[]) => {
    const sections = new Map<string, DishProps[]>();

    dishes.forEach((dish: DishProps) => {
        const section = dish.types[0];
        if (!sections.has(section)) {
            sections.set(section, [dish]);
            return;
        }

        sections.get(section)?.push(dish);
    });

    return mapToObject(sections);
}

router.get('/', async(req: BetwixtRequest, res: Response, next: NextFunction) => {
    try {
        const dishes = await Dish.find().lean();
        const sectionedDishes = segmentDishes(dishes);
        // console.log('[Dishes] ', sectionedDishes);
        res.status(200).json(sectionedDishes);
    }
    catch(err) {
        next(err);
    }
});

router.get('/:itemId', async (req: BetwixtRequest, res: Response, next: NextFunction) => {
    const itemId = req.params.itemId;
    if (!itemId) {
        const missingItemIdError = new Error("Missing Item Id");
        res.status(400);
        next(missingItemIdError);
    }

    try {
        const item = await Dish.findById(itemId).lean();
        res.status(200).json(item);
    } catch (err) {
        next(err);
    }
}); 

export default router;