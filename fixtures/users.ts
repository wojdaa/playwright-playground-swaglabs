export const users = {
  standardUser: {
    username: "Katharina_Bernier",
    fistName: "Katharina",
    lastName: "Bernier",
    password: process.env.STANDARD_USER_PASSWORD as string,
    bankName: "Blue Whale Bank",
    bankRoutingNumber: "111555888",
    bankAccountNumber: "881000222212"
  }
} as const;
