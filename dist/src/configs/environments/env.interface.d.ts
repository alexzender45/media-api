export interface EnvironmentVariables {
    db_host?: string;
    db_port: number;
    db_name: string;
    db_user: string;
    db_password: string;
    jwt_secret: string;
    jwt_expires_in: string;
    port?: number;
    node_env?: string;
    client_id: string;
    client_secret: string;
    musixmatch_api_key: string;
    youtube_api_key: string;
}
