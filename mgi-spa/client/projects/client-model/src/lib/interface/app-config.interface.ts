export interface IAppConfig {
    useMock: boolean;
    serviceEndpoint: {
        managedServiceClients: string;
        managedServicelogin: string;
    };
}
