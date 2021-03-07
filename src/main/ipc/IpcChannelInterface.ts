import { IpcMainEvent } from 'electron';

import IpcRequest from 'shared/types/IpcRequest';

export default interface IpcChannelInterface {
  getName(): string;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}
