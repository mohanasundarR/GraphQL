import { buildSchema } from "graphql";
import {
  contactDetailsRootMutation,
  contactDetailsRootQuery,
  contactDetailsType,
} from "./ContactSchema";
import { mailRootMutation, mailType } from "./MailSchema";
import { usersRootMutation, usersRootQuery, usersType } from "./UserSchema";

const RootQuery = `type RootQuery {
    ${contactDetailsRootQuery}
    ${usersRootQuery}
}`;

const RootMutation = `type RootMutation {
    ${contactDetailsRootMutation}
    ${mailRootMutation}
    ${usersRootMutation}
}`;
const schema = `schema {
    query: RootQuery
    mutation: RootMutation
  }`;

const finalSchema = usersType.concat(
  RootQuery,
  RootMutation,
  schema,
  contactDetailsType,
  mailType
);

export default buildSchema(finalSchema);
