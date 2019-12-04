import { Init, FeeExtensionsConfig, Organization } from '../convectorUtils';

export async function createConfig(user: string, orgId: string, config: FeeExtensionsConfig) {
  const ctrls = await Init(user);
  await ctrls.feeExtensions.initConfig(orgId, config)
} 

export async function updateConfig(user: string, orgId: string, fee: string, value: number) {
  const ctrls = await Init(user);
  await ctrls.feeExtensions.updateConfig(orgId, fee, value)
} 
