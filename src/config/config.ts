
export class Config {

    public environment: string;
    public url: string;
    public host: string;
    public port: number;

    constructor(env: string) {
        this.environment = env;

        this.host = process.env.NODE_ENV === "production" ? "playground15.herokuapp.com" : "localhost";
        this.port = process.env.PORT || 8080;

        this.url = `http://${this.host}:${this.port}`;
    }
};

export default new Config( process.env.NODE_ENV || 'default');