import { Blockchain } from './Blockchain'

const bc = new Blockchain();

bc.generateBlock('1');
bc.generateBlock('2');
console.log(bc.blockchain);
