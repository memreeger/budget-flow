const storageKey = (userId = "guest") => `budgetflow:${userId}`;

export function loadTransactions(userId) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(userId))) ?? [];
  } catch {
    return [];
  }
}

export function saveTransactions(userId, transactions) {
  localStorage.setItem(storageKey(userId), JSON.stringify(transactions));
}