"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, timeStamp, data) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
        this.data = data;
    }
    return Block;
}());
exports.Block = Block;
