import { http, errors, dynamodb } from '@taimos/lambda-toolbox';
import { convert, TodoEntity } from './model';
import { operations } from './types.generated';

export const handler = http.createOpenApiHandler<operations['getTodoById']>(async (ctx) => {
  console.log(ctx.event);

  const id = ctx.event.pathParameters?.id;
  if (!id) {
    throw new errors.BadRequestError('Missing id');
  }

  const todo = await dynamodb.getItem<TodoEntity>(`TODO#${id}` as const, 'TODO');
  if (!todo) {
    throw new errors.NotFoundError();
  }

  return convert(todo);
});