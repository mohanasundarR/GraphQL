import UserResolver from "./UserResolver";
import MailResolver from "./MailResolver";
import ContactResolver from "./ContactResolver";

export default { ...UserResolver, ...MailResolver, ...ContactResolver };
