export class Helper {
  /** Ref to the chaincode name */
  public static get chaincode(): string { return process.env.CHAINCODE; }
  /** Ref to the preferred channel name.
   * In real life application this may be dynamic.
   */
  public static get channel(): string { return process.env.CHANNEL; }
}
