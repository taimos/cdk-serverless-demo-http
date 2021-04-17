// eslint-disable-next-line import/no-unresolved
import { CustomMessageTriggerEvent } from 'aws-lambda';

export async function handler(event: CustomMessageTriggerEvent): Promise<CustomMessageTriggerEvent> {
  console.log(event);

  if (event.triggerSource === 'CustomMessage_AdminCreateUser') {
    // event.response.emailSubject = '';
    // event.response.emailMessage = '';
  } else if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    // event.response.emailSubject = '';
    // event.response.emailMessage = '';
  } // ...

  return event;
}