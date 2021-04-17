import { PrimaryEntity } from '@taimos/lambda-toolbox/lib/dynamodb';
import { components } from './types.generated';

export interface TodoEntity extends PrimaryEntity<`TODO#${string}`, 'TODO'> {
  id: string;
  title: string;
  description: string;
  state: string;
  lastUpdate: string;
}

export function convert(entity: TodoEntity): components['schemas']['Todo'] {
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    state: entity.state,
    lastUpdate: entity.lastUpdate,
  };
}