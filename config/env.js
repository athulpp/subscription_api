import {config} from 'dotenv';
//this will extrat the all the env varaibles from .env file
//handle multiple env files
config({path: `.env.${process.env.NODE_ENV||'development'}.local`});

export const {PORT,NODE_ENV,DB_URI}=process.env;