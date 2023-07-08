interface Environment {
    production: boolean;
    endPoint: string;
}

export const environment: Environment = {
    production: false,
    endPoint:"https://localhost:7228/api/"
};
