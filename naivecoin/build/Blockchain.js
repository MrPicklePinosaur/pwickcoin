"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
var Block_1 = require("./Block");
var sha256_1 = __importDefault(require("crypto-js/sha256"));
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.blockchain = [];
        this.generateBlock(''); //genesis block
    }
    Blockchain.prototype.generateBlock = function (blockData) {
        var prevBlock = this.getPreviousBlock();
        var nextInd = (prevBlock != null) ? prevBlock.index + 1 : 0; //if there is no previous, it's a genesis and set ind to 0
        var prevHash = (prevBlock != null) ? prevBlock.hash : '';
        var timeStamp = new Date().getTime() / 1000;
        var hash = Blockchain.calculateHash(nextInd, prevHash, timeStamp, blockData);
        var newBlock = new Block_1.Block(nextInd, hash, prevHash, timeStamp, blockData);
        this.blockchain.push(newBlock);
    };
    Blockchain.prototype.getPreviousBlock = function () {
        return this.blockchain[this.blockchain.length - 1];
    };
    Blockchain.calculateHash = function (index, previousHash, timeStamp, data) {
        return sha256_1.default(index + previousHash + timeStamp + data).toString();
    };
    // validating methods
    //validateBlock() - used to validate any given block
    /* For a block to be valid
    - It's index must be one higher than the prev block
    - The current block's previous hash should match the previous block's hash
    - the current block's hash has to be valid
    */
    Blockchain.validateBlock = function (block, prevBlock) {
        if (prevBlock.index + 1 !== block.index) {
            return false;
        }
        else if (prevBlock.hash !== block.previousHash) {
            return false;
        }
        else if (Blockchain.calculateHash(block.index, block.previousHash, block.timeStamp, block.data) !== block.hash) {
            return false;
        }
        return true;
    };
    Blockchain.prototype.validateBlockChain = function (newChain) {
        //TODO: validate types of data recieved
        //also make sure recieved blockchain isnt empty and stuff
        //check if the genesis matches
        //go through entire chain and validate all the blocks
        for (var i = 1; i < newChain.length; i++) {
            if (!Blockchain.validateBlock(newChain[i], newChain[i - 1])) {
                return false;
            }
        }
        return true;
    };
    //update chain if the new one is valid and it's longer than the current one
    Blockchain.prototype.updateChain = function (newChain) {
        if (this.validateBlockChain(newChain) && newChain.length > this.blockchain.length) {
            //use new chain 
            this.blockchain = newChain;
            //broadcast the message
            console.log('accepted new');
        }
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
