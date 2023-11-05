import { SmartContract, State } from 'o1js';
export declare class Add extends SmartContract {
    num: State<import("o1js/dist/node/lib/field").Field>;
    init(): void;
    update(): void;
}
