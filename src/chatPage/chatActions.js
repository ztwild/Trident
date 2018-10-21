export const SEND_MESSAGE_START = 'SEND_MESSAGE_START';

export function sendMessageStart(message){
  return {
    type: SEND_MESSAGE_START,
    payload: message,
  }
}