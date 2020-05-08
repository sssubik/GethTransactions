var getTransactionsByAccount=require('./getByAccount.js',)

var sendTransaction = require('./sendTransaction.js')

const account1 = "0x06683f102Bf9A98235589dE43Cb30bEfaC8cfD57"

sendTransaction("Hello").then(() => getTransactionsByAccount(account1,7864155-100,7864155))
