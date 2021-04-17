import { http, dynamodb } from '@taimos/lambda-toolbox';
import { v4 as uuid } from 'uuid';
import { convert, TodoEntity } from './model';
import { operations } from './types.generated';

export const handler = http.createOpenApiHandlerWithRequestBody<operations['addTodo']>(async (ctx, data) => {
  console.log(ctx.event);
  console.log(data);

  const id = uuid();

  const todo = await dynamodb.putNewItem<TodoEntity>(`TODO#${id}` as const, 'TODO', {
    id,
    title: data.title,
    description: data.description,
    state: 'open',
    lastUpdate: new Date().toISOString(),
  });

  return convert(todo);
});