export class Env {
  /** Ref to the CC name */
  public static get drugCC(): string { return process.env.CHAINCODE; }
  /** Ref to the preferred channel name.
   * In real life application this may be dynamic.
   */
  public static get channel(): string { return process.env.CHANNEL; }
}
