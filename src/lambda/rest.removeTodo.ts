import { http, errors, dynamodb } from '@taimos/lambda-toolbox';
import { TodoEntity } from './model';
import { operations } from './types.generated';

export const handler = http.createOpenApiHandler<operations['removeTodo']>(async (ctx) => {
  console.log(ctx.event);

  const id = ctx.event.pathParameters?.id;
  if (!id) {
    throw new errors.BadRequestError('Missing id');
  }

  await dynamodb.deleteItem<TodoEntity>(`TODO#${id}` as const, 'TODO');
});