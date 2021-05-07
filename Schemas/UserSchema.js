export const usersType = `
  scalar Date
  input UserDetails {
   
    userName: String!
    mailId: String!
    mobileNumber: String!
    password: String!
  }
  input ApproveUser {
    userId: String!
    role: String!
  }
  type Users {
    _id: String!
    userName: String!
    mailId: String!
    mobileNumber: String!
    isActive: Boolean!
  }
  input Login {
    mailId: String!
    password: String!
  }
  type LoginToken {
    token: String!
  }
  union LoginResponse = LoginToken | Message
`;
export const usersRootQuery = `
getUsers: [Users!]
`;
export const usersRootMutation = `
signup(userDetails: UserDetails!): Message!
approveUser(userDetails: ApproveUser!): Message!
login(loginDetails:Login): LoginResponse!
`;
