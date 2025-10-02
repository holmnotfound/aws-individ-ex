import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

export const handler = async (event) => {
  const username = event.pathParameters?.username; // <-- HÄR!

  try {
    const command = new QueryCommand({
      TableName: "message-api",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "Message" },
      },
      FilterExpression: "username = :username", // Filter, om username inte är del av nyckel
      ExpressionAttributeValues: {
        ":pk": { S: "Message" },
        ":username": { S: username },
      },
    });

    const response = await client.send(command);
    const items = response.Items.map((item) => unmarshall(item));

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error("Fel vid hämtning av meddelanden:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Fel vid hämtning.", error: error.message }),
    };
  }
};