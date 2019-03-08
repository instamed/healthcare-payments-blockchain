import { Router, Request, Response } from 'express';
import { adjudicate as adjudicateClaim } from '../services/claim.service';
const router: Router = Router();

router.post('/claim/adjudicate', async (req: Request, res: Response) => {
    try {
        const patient = req.body.data;
        await adjudicateClaim(patient);
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

export const PayerCtrl: Router = router;