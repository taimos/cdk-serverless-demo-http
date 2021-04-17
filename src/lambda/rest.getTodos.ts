import { http, dynamodb } from '@taimos/lambda-toolbox';
import { ReverseIndexName, ReverseIndex_PK } from 'cdk-serverless/lib/types/table';
import { convert, TodoEntity } from './model';
import { operations } from './types.generated';

export const handler = http.createOpenApiHandler<operations['getTodos']>(async (ctx) => {
  console.log(ctx.event);

  const list = await dynamodb.pagedQuery<TodoEntity>({
    IndexName: ReverseIndexName,
    KeyConditionExpression: '#pk = :pk',
    ExpressionAttributeNames: {
      '#pk': ReverseIndex_PK,
    },
    ExpressionAttributeValues: {
      ':pk': 'TODO',
    },
  });

  return list.map(convert);
});