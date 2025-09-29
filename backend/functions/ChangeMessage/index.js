import { DynamoDBClient, UpdateItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({ region: "eu-north-1" });

export const handler = async (event) =>{
    try{
        const {id, newText} = JSON.parse(event.body)

        if (!id || !newText){
            return{
                statusCode: 400,
                body: JSON.stringify({
                    message: "id och ny text krävs"
                })
            }
        }

        const pk = "Message";
        const sk = id;

        const getMessage = new GetItemCommand({
            TableName: "message-api",
            Key: {
                pk: {S: pk},
                sk: {S: sk}
            }
        });

        const getResult = await client.send(getMessage);

        if(!getResult.Item){
            return{
                statusCode: 404,
                body: JSON.stringify({
                    message: "Meddelandet finns inte"
                })
            };
        }

        const updateMessage = new UpdateItemCommand({
            TableName: "message-api",
            Key: {
                pk: {S: pk},
                sk: {S: sk}
            },
            UpdateExpression: "SET #text = :newText",
            ExpressionAttributeNames:{
                "#text": "text"
            },
            ExpressionAttributeValues:{
                ":newText": {S: newText}
            },
            ReturnValues: "ALL_NEW"
        });

        const updatedResult = await client.send(updateMessage);

        return{
            statusCode: 200,
            body: JSON.stringify({
                message: "Meddelandet updaterades",
                updatedItem: unmarshall(updatedResult.Attributes)
            })
        };

    }catch(error){
        console.error("Fel vid uppdatering av meddelandet.", error);

        return{
            statusCode: 500,
            body: JSON.stringify({
                message: "Ett fel uppstod vid uppdatering",
                error: error.message
            })
        }
    }
}