-- ELE-1949 part 1. expense-receipts was a PUBLIC bucket: anyone with a link
-- could open a worker's or electrician's receipt (names, card fragments,
-- addresses). Every screen already opens receipts through a signed link
-- (expenseReceiptService.getSignedReceiptUrl / openReceipt, ExpenseEditSheet),
-- the accounting sync downloads with the service role, and the stored
-- receipt_url keeps its old shape as an identifier (readers parse the path out
-- of it). Read access stays: the uploader ("Manage own expense receipts") and
-- the worker's firm ("Firm reads its team's expense receipts").
update storage.buckets set public = false where id = 'expense-receipts';
