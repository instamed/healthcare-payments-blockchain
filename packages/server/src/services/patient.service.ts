import { Init, Patient, couchQueryAll } from '../convectorUtils';

export async function create(patient: Patient) {
    const ctrls = await Init();
    await ctrls.patient.create(patient);
}
export async function getAll(){
    return await couchQueryAll('patients_all', Patient);
}