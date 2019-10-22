import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const name = event.pathParameters.name;
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: name,
    }),
  };
}
