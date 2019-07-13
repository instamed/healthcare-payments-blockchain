import { Router, Request, Response } from 'express';
import { create, adjudicate, getAll } from '../services/claim.service';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const { user } = req.query;
        let results = await getAll(user);
        res.send(results);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const newClaim = req.body;
        await create(newClaim);
        res.send(201);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/adjudicate', async (req: Request, res: Response) => {
    try {
        const patient = req.body;
        await adjudicate(patient);
        res.send(200);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const ClaimCtrl: Router = router;