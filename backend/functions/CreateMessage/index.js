import {
  DynamoDBClient,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({ region: "eu-north-1" });

export const handler = async (event) => {
  try {
    const { username, text } = JSON.parse(event.body);

    if (!username || !text) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "username och text krävs",
        }),
      };
    }

    const messageId = `MESSAGE#${uuidv4().toUpperCase().slice(0, 5)}`;

    const newMessage = {
      pk: { S: "Message" },
      sk: { S: messageId },
      username: { S: username },
      text: { S: text },
      createdAt: { S: new Date().toISOString() },
    };

    const command = new PutItemCommand({
      TableName: "message-api",
      Item: newMessage,
    });

    await client.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({
        id: messageId,
        username,
        text,
        createdAt: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error("Ett fel uppstod vid skapandet av message", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ett fel uppstod vid skapandet av message.",
        error: error.message,
      }),
    };
  }
};
