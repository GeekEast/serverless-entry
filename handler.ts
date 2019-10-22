import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  //@ts-ignore
  const { first, second } = event;
  const added = first + second;
  return {
    statusCode: 200,
    body: JSON.stringify({
      event: added,
    }),
  };
}
