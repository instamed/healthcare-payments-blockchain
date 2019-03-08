import { Router, Request, Response } from 'express';
import { getAll } from '../services/chargeItem.service';
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        let results = await getAll();
        res.send(results);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const ChargeItemCtrl: Router = router;