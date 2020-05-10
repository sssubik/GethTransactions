const fs = require('fs');
const path = require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );

  const getTransactionsFromFile = cb =>{
      fs.readFile(p, (err, fileContent) =>{
          if(err){
              cb([]);
          }
          else{
              cb([JSON.parse(fileContent)])
          }
      })
  }
const sendSignedTransaction = (privateKey, fromAccount, cb) => {
    web3.eth.getTransactionCount(account1).then( async (count,error) =>{
       const txObject = { 
           nonce: web3.utils.toHex(count),
           to: account2,
           gasLimit: web3.utils.toHex(23000),
           gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
           data: web3.utils.toHex("data")
       }
   
       
      //Sign the transaction
       const tx = new Tx(txObject,{"chain":"ropsten"})
       tx.sign(privateKey1)
   
       const serializedTransaction = tx.serialize()
       const raw = '0x' + serializedTransaction.toString('hex')
       //Broadcast the transaction
       
        await web3.eth.sendSignedTransaction(raw, (err,txHash) =>{
           try{
               var transaction = {
                   "txHash": txHash
               }
               if(!err){
                   cb(JSON.parse(transaction))
               }
               else{
                   throw "noTransaction";
               } 
           }catch(error){
                       if(error="noTransaction"){
                           console.log(err)
                       }
   
           }
           
          
       })
       
   }
   
   )
}
module.exports = class Transaction{
      
    static sendTransaction(privateKey, fromAccount){
        sendSignedTransaction((privateKey, fromAccount, txHash) =>{
            fs.writeFile(p, JSON.stringify(txHash),err =>{
                console.log(err);
            })
        })
    }
    static getTransactions(cb){
        getTransactionsFromFile(cb);
    }
}