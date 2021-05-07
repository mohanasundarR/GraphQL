import UserModel from "../Models/UserDetails.model";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../Constants";
import bcrypt from "bcrypt";

export async function signup({ userDetails }) {
  userDetails.password = bcrypt.hashSync(userDetails?.password, 10);
  const user = new UserModel(userDetails);
  try {
    const validation = await UserModel.findOne({ mailId: userDetails?.mailId });
    if (validation === null) {
      const response = await user.save();
      if (response !== null) {
        return {
          message: "User Signup Successful",
          statusCode: 200,
        };
      } else {
        return {
          message: "Something Went Wrong",
          statusCode: 400,
        };
      }
    } else {
      return {
        message: "User Already Exist With Same MailId",
        statusCode: 400,
      };
    }
  } catch (error) {
    return {
      message: error,
      statusCode: 500,
    };
  }
}
export async function approveUser({ userDetails }) {
  try {
    const response = await UserModel.updateOne(
      { _id: userDetails?.userId },
      {
        $set: {
          isApproved: true,
          isActive: true,
          role: userDetails?.role,
        },
      }
    );
    if (response !== null) {
      return {
        message: "User Approves Successfully",
        statusCode: 200,
      };
    } else {
      return {
        message: "Something Went Wrong",
        statusCode: 400,
      };
    }
  } catch (error) {
    return {
      message: error,
      statusCode: 500,
    };
  }
}
export async function getUsers() {
  return UserModel.find();
}

export async function login({ loginDetails }) {
  const userDetails = await UserModel.findOne({
    mailId: loginDetails?.mailId,
    isActive: true,
  });
  if (userDetails !== null) {
    const verify = bcrypt.compareSync(
      loginDetails?.password,
      userDetails?.password
    );
    if (verify) {
      return {
        token: jwt.sign(
          {
            name: userDetails?.userName,
            role: userDetails?.role,
            id: userDetails?._id,
          },
          TOKEN_SECRET,
          {
            expiresIn: "1800s",
          }
        ),
        __typename: "LoginToken",
      };
    } else {
      return {
        message: "EmailId or Password Incorrect",
        statusCode: 400,
        __typename: "Message",
      };
    }
  } else {
    return {
      message: "Invalid User",
      statusCode: 400,
      __typename: "Message",
    };
  }
}

export default { signup, getUsers, approveUser, login };
