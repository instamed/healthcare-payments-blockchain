import { Router, Request, Response } from 'express';
import { create as createPatient } from '../services/patient.service';
import { create as createClaim } from '../services/claim.service';

const router: Router = Router();

router.post('/patient/create', async (req: Request, res: Response) => {
    try {
        const patient = req.body.data;
        await createPatient(patient);
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

router.post('/claim/create', async (req: Request, res: Response) => {
    try {
        const newClaim = req.body.data;
        await createClaim(newClaim);
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

export const ProviderCtrl: Router = router;