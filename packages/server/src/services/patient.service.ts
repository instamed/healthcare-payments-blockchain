import { Init, Patient } from '../convectorUtils';

export async function create(patient: Patient) {
    const ctrls = await Init();
    await ctrls.patient.create(patient);
}