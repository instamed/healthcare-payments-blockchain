import { Router, Request, Response } from 'express';
import { adjudicate as adjudicateClaim } from '../services/claim.service';
const router: Router = Router();

router.post('/claim/adjudicate', async (req: Request, res: Response) => {
    try {
        const patient = req.body;
        await adjudicateClaim(patient);
        res.send(200);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const PayerCtrl: Router = router;