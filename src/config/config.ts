
export class Config {
    public environment: string;
    public url: string;
    public host: string;
    public port: number;

    constructor(env: string) {
        this.environment = env;
        this.port = process && process.env.PORT || 8080;
    }
};

export default new Config(process.env.NODE_ENV || 'default');