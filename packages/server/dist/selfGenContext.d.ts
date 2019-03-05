import { IEnrollmentRequest, IRegisterRequest } from 'fabric-ca-client';
export declare type UserParams = IRegisterRequest;
export declare type AdminParams = IEnrollmentRequest;
export declare namespace SelfGenContext {
    function getClient(): Promise<void>;
}
