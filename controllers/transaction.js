const Transaction = require('../models/transaction');

exports.sendTransaction = (req, res, next) =>{
    Transaction.sendTransaction()
}