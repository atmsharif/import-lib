import { SystemError } from 'client-model';

export enum adminSpaErrorCode { "E1000", "E1001", "E1002" };
export enum adminSpaErrorType { "UserError", "ServerError"};
export const adminSpaErrors: Record<string, SystemError>  = {
    [adminSpaErrorCode.E1000]: new SystemError("Unauthorised", "Your login attempt has failed", [adminSpaErrorCode.E1000].toString(), [adminSpaErrorType.UserError].toString()),
    [adminSpaErrorCode.E1001]: new SystemError("Server Error", "The system is currently experiencing technical issues", [adminSpaErrorCode.E1001].toString(), [adminSpaErrorType.ServerError].toString()),
    [adminSpaErrorCode.E1002]: new SystemError("Error", "There has been an error", [adminSpaErrorCode.E1002].toString(), [adminSpaErrorType.UserError].toString())
}