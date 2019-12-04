import * as yup from 'yup';
import { ConvectorModel, Default, ReadOnly, 
    Required, Validate } from '@worldsibu/convector-core';
import { Extension } from './financial.model';
import { buildMoney } from '../utils/utils';
import { ResourceTypes } from '../utils/enums';

export class FeeExtensionsConfig extends ConvectorModel<FeeExtensionsConfig> {
    public static get ID() {
      return `${new FeeExtensionsConfig().type}#config`;
    }

    public static async getFeeExtension(resourceType: ResourceTypes, currency?: string): Promise<Extension[]> {
      const url = 'https://fhir-ehr.cerner.com/r4/StructureDefinition/';
      const feeExtensions = await FeeExtensionsConfig.getOne(FeeExtensionsConfig.ID)

      if(!feeExtensions || !feeExtensions.id)
        throw new Error(`FeeExtensionsConfig with id: "${FeeExtensionsConfig.ID}" not found`)

      const extension = (fee: string, value: number) => 
        new Extension({
          url: `${url}${fee}`,
          valueMoney: buildMoney(value, currency)
        })

      if (resourceType === ResourceTypes.CLAIM) {
        return [
          extension('provider-submission-fee', feeExtensions.providerSubmissionFee),
          extension('payer-receive-claim-fee', feeExtensions.payerReceiveClaimFee),
          extension('provider-member-consortium-fee', feeExtensions.providerMemberConsortiumFee),
          extension('payer-member-consortium-fee', feeExtensions.payerMemberConsortiumFee)]
      }

      if (resourceType === ResourceTypes.CLAIMRESPONSE) {
        return [
          extension('payer-claim-response-transmission-Ffe', feeExtensions.payerClaimResponseTransmissionFee),
          extension('provider-claim-response-transmission-fee', feeExtensions.providerClaimResponseTransmissionFee),
          extension('provider-member-consortium-fee', feeExtensions.providerMemberConsortiumFee),
          extension('payer-member-consortium-fee', feeExtensions.payerMemberConsortiumFee)]
      }

      if (resourceType === ResourceTypes.INVOICE) {
        return [
          extension('provider-statement-transmission-fee', feeExtensions.providerStatementTransmissionFee),
          extension('provider-member-statement-transmission-fee', feeExtensions.providerMemberStatementTransmissionFee),
          extension('providerMember-consortium-fee', feeExtensions.providerMemberConsortiumFee),
          extension('payer-member-consortium-fee', feeExtensions.payerMemberConsortiumFee)]
      }

      if (resourceType === ResourceTypes.BASIC) {
        return [
          extension('financial-transaction-allocationAmount', feeExtensions.financialTransactionAllocationAmount),
          extension('provider-posting-fee', feeExtensions.providerPostingFee),
          extension('provider-member-transmission-fee', feeExtensions.providerMemberTransmissionFee),
          extension('provider-member-consortium-fee', feeExtensions.providerMemberConsortiumFee),
          extension('payer-member-consortium-fee', feeExtensions.payerMemberConsortiumFee)]
      }
      
    }

    @ReadOnly()
    @Required()
    public readonly type = 'fhir.feeExtensions.config';

    @Required()
    @Validate(yup.number())
    public providerSubmissionFee: number;

    @Required()
    @Validate(yup.number())
    public payerReceiveClaimFee: number;

    @Required()
    @Validate(yup.number())
    public providerMemberConsortiumFee: number;

    @Required()
    @Validate(yup.number())
    public payerMemberConsortiumFee: number;

    @Required()
    @Validate(yup.number())
    public payerClaimResponseTransmissionFee: number;

    @Required()
    @Validate(yup.number())
    public providerClaimResponseTransmissionFee: number;

    @Required()
    @Validate(yup.number())
    public providerStatementTransmissionFee: number;

    @Required()
    @Validate(yup.number())
    public providerMemberStatementTransmissionFee: number;

    @Required()
    @Validate(yup.number())
    public financialTransactionAllocationAmount: number;

    @Required()
    @Validate(yup.number())
    public providerPostingFee: number;

    @Required()
    @Validate(yup.number())
    public providerMemberTransmissionFee: number;
}
