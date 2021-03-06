
const transactionTransformer = {
  transformToApi(transaction) {
    return {
      id: transaction.id,
      account_id: transaction.accountId,
      date: transaction.date,
      amount: transaction.amount,
      category_id: transaction.categoryId,
      subcategory_id: transaction.subcategoryId,
      notes: transaction.notes,
      memo: transaction.memo,
      transaction_type: transaction.transactionType,
      matching_transaction_id: transaction.matchingTransactionId,
    };
  },

  transformFromApi(transaction) {
    const transformedTransaction = {
      id: transaction.id,
      accountId: transaction.account_id,
      date: transaction.date,
      amount: transaction.amount,
      categoryId: transaction.category_id,
      subcategoryId: transaction.subcategory_id,
      notes: transaction.notes,
      memo: transaction.memo,
      balance: transaction.balance,
      transactionType: transaction.transaction_type,
    };

    if (transaction.matching_transaction) {
      transformedTransaction.matchingTransactionId = transaction.matching_transaction.id;
      transformedTransaction.matchingTransaction = {
        id: transaction.matching_transaction.id,
        accountId: transaction.matching_transaction.account_id,
        memo: transaction.matching_transaction.memo,
        notes: transaction.matching_transaction.notes,
      };
    }

    return transformedTransaction;
  },

  transformFromOfxApi(transaction) {
    return {
      accountId: transaction.account_id,
      date: transaction.date,
      memo: transaction.memo,
      amount: transaction.amount,
      categoryId: transaction.category_id,
      subcategoryId: transaction.subcategory_id,
      notes: transaction.notes,
      import: transaction.import,
      duplicate: transaction.duplicate,
    };
  },
};

export default transactionTransformer;
