import ContactModel from "../Models/ContactDetails.model";

export async function getUserContactDetails({ userId }) {
  return await ContactModel.findOne({ userId }).populate("userId");
}
export async function createContact({ contactDetails }) {
  contactDetails.contacts = [
    {
      name: contactDetails?.name,
      mailId: contactDetails?.mailId,
      mobileNumber: contactDetails?.mobileNumber,
    },
  ];
  const contactDetail = new ContactModel(contactDetails);
  try {
    const validation = await ContactModel.findOne({
      userId: contactDetails?.userId,
    });
    if (validation === null) {
      const saveResponse = await contactDetail.save();
      if (saveResponse !== null) {
        return {
          message: "Contact Created Successful",
          statusCode: 200,
        };
      } else {
        return {
          message: "Something Went Wrong",
          statusCode: 400,
        };
      }
    } else {
      const createContactResponse = await ContactModel.updateOne(
        {
          userId: contactDetails?.userId,
        },
        {
          $addToSet: {
            contacts: {
              name: contactDetails?.name,
              mailId: contactDetails?.mailId,
              mobileNumber: contactDetails?.mobileNumber,
            },
          },
        }
      );
      if (createContactResponse !== null) {
        return {
          message: "Contact Created Successful",
          statusCode: 200,
        };
      } else {
        return {
          message: "Something Went Wrong",
          statusCode: 400,
        };
      }
    }
  } catch (error) {
    return {
      message: error,
      statusCode: 500,
    };
  }
}
export async function updateContact({ contactDetails }) {
  try {
    const updateContact = await ContactModel.updateOne(
      { userId: contactDetails?.userId },
      {
        $set: JSON.parse(
          JSON.stringify({
            "contacts.$[contact].name": contactDetails?.name,
            "contacts.$[contact].mailId": contactDetails?.mailId,
            "contacts.$[contact].mobileNumber": contactDetails?.mobileNumber,
          })
        ),
      },
      {
        arrayFilters: [
          {
            "contact._id": contactDetails?.contactId,
          },
        ],
      }
    );
    if (updateContact !== null) {
      return {
        message: "Contact Updated Successfully",
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

export default { getUserContactDetails, createContact, updateContact };
