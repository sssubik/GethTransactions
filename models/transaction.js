var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const account1 = "0x06683f102Bf9A98235589dE43Cb30bEfaC8cfD57"
const web3 = new Web3("https://ropsten.infura.io/v3/05ac82a3f5f34072ad44566c73b2cc24")
const fs = require('fs');
const path = require('path');
const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex')
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'transaction.json'
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
const sendSignedTransaction = (toAccount, cb) => {

    web3.eth.getTransactionCount(account1).then( async (count,error) =>{
       const txObject = { 
           nonce: web3.utils.toHex(count),
           to: toAccount,
           gasLimit: web3.utils.toHex(23000),
           gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
           data: web3.utils.toHex("data")
       }
   
       
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
                   try{
                   cb(transaction)
                   }catch(error){
                       console.log(error)
                   }
               }
               else{
                   throw "noTransaction";
               } 
           }catch(error){
                       if(error="noTransaction"){
                           console.log(error)
                       }
   
           }
           
          
       })
       
   }
   
   )
}
module.exports = class Transaction{
      
    static sendTransaction(toAccount){
        sendSignedTransaction(toAccount,txHash => {
            fs.appendFile(p, JSON.stringify(txHash)+",",err =>{
                console.log(txHash)
            })
        })
    }
    static getTransactions(cb){
        getTransactionsFromFile(cb);
    }
}