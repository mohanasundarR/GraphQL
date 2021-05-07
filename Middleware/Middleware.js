import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../Constants";
export default function authenticateToken(req, res, next) {
  if (req.url.search("/graphQL") > -1) return next();
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
