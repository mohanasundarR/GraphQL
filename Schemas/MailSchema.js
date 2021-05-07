export const mailType = `
  input sendmail {
    to: [String!]!
    message: String!
    subject: String!
    from: String
  }
  type mailResponse {
    message: String!
  }
`;
export const mailRootMutation = `
sendMail(mailDetails: sendmail!): mailResponse!
`;
