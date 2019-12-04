import { Router, Request, Response } from "express";
import { createConfig, updateConfig } from '../services/feeExtensions.service';

const router: Router = Router();

router.post('/', async (req, res) => {
  const { orgId, config } = req.body;
  const { user } = req.query;

  if(!Object.keys(config).length) {
    res.status(404).send(`Object of type "FeeExtensionsConfig" is missing from body`);
    return;
  }

  if(!user) {
    res.status(404).send(`User param is missing from query url`);
    return;
  }

  try {
    await createConfig(user, orgId, config);
    res.send('Created')
  } catch(e) {
    res.status(500).send(e)
  }
})

router.put('/', async (req, res) => {
  const { orgId, fee, value } = req.body;
  const { user } = req.query;

  if(!orgId || !fee || !value) {
    res.status(404).send(`Fields are missing from body`);
    return;
  }

  if(!user) {
    res.status(404).send(`User param is missing from query url`);
    return;
  }

  try {
    await updateConfig(user, orgId, fee, value);
    res.send('Updated')
  } catch(e) {
    res.status(500).send(e)
  }
})

export const FeeExtensionsCtrl: Router = router;
