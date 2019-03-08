import { Router, Request, Response } from 'express';
import { create as createOrganization } from '../services/organization.service';
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const payment = req.body.data;
        await createOrganization(payment);
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});