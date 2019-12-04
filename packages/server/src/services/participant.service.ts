import { Init, couchQueryAll } from '../convectorUtils';
import { ConsumerParticipant, PayerParticipant, ProviderParticipant, ConsortiumAdminParticipant } from 'financial-cc';

export async function createConsumer(participant: ConsumerParticipant, fingerprint: string) {
    const ctrls = await Init();
    await ctrls.participant.createConsumer(participant, fingerprint);
}
export async function createProvider(participant: ProviderParticipant) {
    const ctrls = await Init();
    await ctrls.participant.createProvider(participant);
}
export async function createPayer(participant: PayerParticipant) {
    const ctrls = await Init();
    await ctrls.participant.createPayer(participant);
}

export async function createConsortiumAdmin(participant: ConsortiumAdminParticipant) {
    const ctrls = await Init();
    await ctrls.participant.createConsortiumAdmin(participant);
}


export async function getAllConsumer() {
    return await couchQueryAll('participantConsumers_all', ConsumerParticipant);
}
export async function getAllProvider() {
    return await couchQueryAll('participantProviders_all', ProviderParticipant);
}
export async function getAllPayer() {
    return await couchQueryAll('participantPayers_all', PayerParticipant);
}
