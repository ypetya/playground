
export class Config{

    public environment: string;
    public url: string;
    public host: string;
    public port: number;

    constructor(env: string) {
        this.environment = env;
        this.url = 'http://localhost:8080';
        this.host = 'localhost';
        this.port = 8080;
    }
};

export default new Config('default');