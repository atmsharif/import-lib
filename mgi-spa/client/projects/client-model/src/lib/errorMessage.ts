export class SystemError {
  constructor(title: string, description: string, code: string, type: string) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.type = type;
  }

  public title: string;
  public description: string;
  public code: string;
  public type: string;
  private _originalError:string;
    get originalError():string {
        return this._originalError;
    }
    set originalError(originalError:string) {
        this._originalError = originalError;
    }
}