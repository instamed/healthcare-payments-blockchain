import { Router, Request, Response } from 'express';
import { getAll } from '../services/account.service';
import { join } from 'path';
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const indexFile = join(__dirname, '../index.html');
        console.log(indexFile);
        res.sendFile(indexFile);
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});
router.get('/healthcheck', async (req: Request, res: Response) => {
    try {
        res.send('SUCCESS');
    } catch (ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export const DefaultCtrl: Router = router;
