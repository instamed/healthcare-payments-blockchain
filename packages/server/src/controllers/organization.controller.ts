import { Router, Request, Response } from 'express';
import { create, getAll } from '../services/organization.service';

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

router.post('/', async (req: Request, res: Response) => {
    try {
        const { organization, fingerprint } = req.body;
        await create(organization, fingerprint);
        res.status(201).send();
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const OrganizationCtrl: Router = router;