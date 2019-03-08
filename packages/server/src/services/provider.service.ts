import { Init, Patient } from '../convectorUtils';

export async function createPatient(patient: Patient) {
    const ctrls = await Init();
    await ctrls.patient.create(patient);
}