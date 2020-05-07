module.exports = getTransactionsByAccount
const Web3 = require('web3')

const web3 = new Web3("https://ropsten.infura.io/v3/05ac82a3f5f34072ad44566c73b2cc24")
async function getTransactionsByAccount (myaccount, startBlockNumber, endBlockNumber){
    
    if (endBlockNumber == null) {
      endBlockNumber = web3.eth.blockNumber;
      console.log("Using endBlockNumber: " + endBlockNumber);
    }
    if (startBlockNumber == null) {
      startBlockNumber = endBlockNumber - 1000;
      console.log("Using startBlockNumber: " + startBlockNumber);
    }
    console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
  
    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        
     web3.eth.getBlock(i, true, (error,block)=>{
        
        if (block != null && block.transactions != null) {
            block.transactions.forEach( function(e) {
              if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                console.log("  tx hash          : " + e.hash + "\n"
                  + "   nonce           : " + e.nonce + "\n"
                  + "   blockHash       : " + e.blockHash + "\n"
                  + "   blockNumber     : " + e.blockNumber + "\n"
                  + "   transactionIndex: " + e.transactionIndex + "\n"
                  + "   from            : " + e.from + "\n" 
                  + "   to              : " + e.to + "\n"
                  + "   value           : " + e.value + "\n"
                  + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
                  + "   gasPrice        : " + e.gasPrice + "\n"
                  + "   gas             : " + e.gas + "\n"
                  + "   input           : " + e.input);
              }
            })
          }
     }
     )
    
    }
  }
