import { ApolloServer } from "apollo-server-express";
import helmet from "helmet";
import express, { urlencoded, json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import schema from "./Schemas/index";
import rootValue from "./Resolvers/index";
import Middleware from "./Middleware/Middleware";
const app = express();
const port = 4000;
connect("mongodb://localhost:27017/revstone", {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log(`Can not connect to the database ${err}`);
  }
);
app.use(Middleware);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(urlencoded({ extended: true }));
app.use(json());
app.set("view engine", "ejs");
const server = new ApolloServer({
  schema,
  rootValue,
  playground: true,
});
server.applyMiddleware({ app, path: "/graphQL" });
app.listen(port, function () {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
