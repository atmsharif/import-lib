export abstract class ILoginService {
    abstract updateSession(rawSession: string): boolean;
    abstract isAuthenticated(): boolean;
    abstract getTargetUrl();
    abstract setTargetUrl(url: string);
    abstract getSessionError(): string;
    abstract setSessionError(error: string);
    abstract clearSessionError();
    abstract logout();
    abstract goTo500Page();
    abstract resetLogoutTimer();
    abstract deleteSession();
}