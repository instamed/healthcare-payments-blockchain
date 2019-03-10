import * as yup from 'yup';

export interface x509Identities {
    status: boolean;
    fingerprint: string;
}

export const x509Identities = yup.object<x509Identities>().shape({
    status: yup.boolean().required(),
    fingerprint: yup.string().required()
});
