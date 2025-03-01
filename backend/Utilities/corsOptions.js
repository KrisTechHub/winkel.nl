const corsOptions = {
    origin: process.env.CLIENT_URL, //URL to allow access
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //methdos to use
    credentials: true, // Allow credentials (cookies) to be sent
};


export default corsOptions;