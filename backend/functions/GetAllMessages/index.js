import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1"});

export const handler = async (event) =>{
    try{
        const command = new QueryCommand({
            TableName: "message-api",
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": {S: "Message"}
            }
        });

        const response = await client.send(command)
        const items = response.Items.map((item) => unmarshall(item));

        return{
            statusCode: 200,
            body: JSON.stringify(items)
        }

    } catch (error) {
    console.error("Ett fel uppstod vid hämtning av messages", error);

      return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ett fel uppstod vid hämtning av messages.",
        error: error.message,
      }),
    };
    }


}