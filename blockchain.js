const Block = require('./block.js');

class BlockChain {

    // se inicializa el primer bloque genesis 
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
    }
    // se inicia el bloque genesis
    startGenesisBlock() {
        return new Block({});
    }
    // se obtiene el bloque reciente
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    // se agrega un nuevo bloque despues del reciente
    addNewBlock(newBlock) {
        newBlock.prevHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }
    // realiza un chequeo de la cadena y la validacion
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currBlock = this.blockchain[i];
            const prevBlock = this.blockchain[i - 1];

            if (currBlock.hash !== currBlock.computeHash()) {
                return false;
            }

            if (currBlock.prevHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
    

}

module.exports = BlockChain;