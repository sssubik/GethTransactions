var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')

const web3 = new Web3("https://ropsten.infura.io/v3/05ac82a3f5f34072ad44566c73b2cc24")

const account1 = "0x06683f102Bf9A98235589dE43Cb30bEfaC8cfD57"
const account2 = "0x7fa726446A491a7CeeaC15C3F4E6722E7Cbad14b"

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex')

module.exports = sendTransaction


    async function sendTransaction(data){
    await web3.eth.getTransactionCount(account1).then( async (count,error) =>{
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
            if(!err){
                console.log('txHash: ',txHash)
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







  
    //Build the Transaction
 