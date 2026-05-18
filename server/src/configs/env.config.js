import 'dotenv/config';

const requiredEnv = [
    'MONGO_URI',
    'JWT_SECRET',
    'SERVER_PORT',
    'SERVER_HOST'
];

requiredEnv.forEach((key)=>{
    if(!process.env[key]){
        console.log(`REQUIRED ENV IS MISSING: ${key}`);
    }
});

export const CONFIG = {
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_HOST: process.env.SERVER_HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI
};
