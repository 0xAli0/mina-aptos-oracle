import { Field, SmartContract, state, State, method } from 'o1js';

class OracleAPI {
  static async sendToOracle(data: any): Promise<void> {
    const ORACLE_ENDPOINT = 'http://localhost:3001/submit';

    try {
      const response = await fetch(ORACLE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Oracle request failed');
      }
    } catch (error) {
    }
  }
}



export class Add extends SmartContract {
  @state(Field) num = State<Field>();

  init() {
    super.init();
    this.num.set(Field(1));
  }

  @method update() {
    const currentState = this.num.getAndAssertEquals();
    const newState = currentState.add(8);
    this.num.set(newState);
  
    // Oracle'a veriyi gönder
    OracleAPI.sendToOracle({ number: newState });
  }
  
}
