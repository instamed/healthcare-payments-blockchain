import { GovernanceCollections } from '../models/collections.model';
import { GovernanceController } from '../controllers/governance.controller';
import { FQDNObjects } from './enums';

/** Validate a collection combination exists */
export async function pickRightCollections(objects: string[][], orgs?: string[]) {
    let results = [];
    for (let object of objects) {
        let tempList = object.map(org =>
            extractOrganizationId(extractPatientOrganizationId(org)));
        tempList = tempList.sort();
        const col = tempList.join('-');

        // Use passed list of orgs if available in params
        // let cols = orgs ? _getCols(orgs) : await getCols();
        results.push(col);
        // if (cols.indexOf(col) !== -1) {
        // } else {
        //     throw new Error(`Queried collection [${col}] does not exist`);
        // }
    }
    return results;
}

/** Make sure to extract the patient organization part so the need appears */
function extractPatientOrganizationId(path: string) {
    path = path.toLowerCase();
    if (path.toLowerCase().indexOf(`${FQDNObjects.PATIENT}#com.`.toLowerCase()) !== -1) {
        let removedNS = path.replace(`${FQDNObjects.PATIENT}#com.`.toLowerCase(), '');
        return removedNS.slice(0, removedNS.indexOf('.')).toLowerCase();
    }
    return path;
}

/** Make sure to extract the organization part so the need appears */
function extractOrganizationId(path: string) {
    path = path.toLowerCase();
    if (path.toLowerCase().indexOf(`${FQDNObjects.ORGANIZATION}`.toLowerCase()) !== -1) {
        return path.replace(`${FQDNObjects.ORGANIZATION}#`.toLowerCase(), '').toLowerCase();
    }
    return path;
}

/** Build all possible permutations */
export async function getCols(): Promise<Array<string>> {
    let input = (await GovernanceCollections.getOne(GovernanceController.governanceCollectionKey)).organizations;

    return _getCols(input);
}

/** Build all possible permutations */
export async function _getCols(input: string[]): Promise<Array<string>> {
    // Need a deterministic order
    input = input.sort();
    let result: Array<string> = [];
    let f = function (prefix, input) {
        for (var i = 0; i < input.length; i++) {
            result.push((prefix ? `${prefix}-` : prefix) + input[i]);
            f((prefix ? `${prefix}-` : prefix) + input[i], input.slice(i + 1));
        }
    }
    f('', input);
    return result;
}