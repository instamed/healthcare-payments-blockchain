import { Router, Request, Response } from 'express';
import { createPatient } from '../services/provider.service';
const router: Router = Router();

router.post('/patient/create', async (req: Request, res: Response) => {
    try {
        const patient = req.data;
        await createPatient(patient);
    } catch (ex) {
        console.log(ex);
        res.send();
    }
});

router.post('/claim/create', async (req: Request, res: Response) => {

});

export const ProviderCtrl: Router = router;