import { Router, Request, Response } from 'express';
import { create as createOrganization } from '../services/organization.service';
const router: Router = Router();

router.post('/organization', async (req: Request, res: Response) => {
    try {
        const organization = req.body;
        await createOrganization(organization);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});


export const AdminCtrl: Router = router;