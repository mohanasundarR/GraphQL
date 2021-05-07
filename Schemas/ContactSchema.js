export const contactDetailsType = `
  type UserContactDetails {
    userId: Users!
    contacts: [ContactDetails]
  }
  type ContactDetails {
    name: String!
    mailId: String!
    mobileNumber: String!
    createdOn: Date!
  }
  input CreateContact {
    userId: String!
    name: String!
    mailId: String!
    mobileNumber: String!
  }
  input UpdateContact {
    userId: String!
    contactId: String!
    name: String
    mailId: String
    mobileNumber: String
  }
  type Message {
    message: String!
    statusCode: Int!
  }
`;
export const contactDetailsRootQuery = `
getUserContactDetails(userId: String!): UserContactDetails!
`;
export const contactDetailsRootMutation = `
createContact(contactDetails: CreateContact!): Message!
updateContact(contactDetails: UpdateContact!): Message!
`;
