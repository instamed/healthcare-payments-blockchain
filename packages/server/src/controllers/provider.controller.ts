import { Router, Request, Response } from 'express';
import { create as createPatient } from '../services/patient.service';
import { create as createClaim } from '../services/claim.service';

const router: Router = Router();

router.post('/patient/create', async (req: Request, res: Response) => {
    try {
        const patient = req.body;
        await createPatient(patient);
        res.send(201);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.post('/claim/create', async (req: Request, res: Response) => {
    try {
        const newClaim = req.body;
        await createClaim(newClaim);
        res.send(201);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const ProviderCtrl: Router = router;