const corsOptions = {
    origin: 'http://localhost:5173', //URL to allow access
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //methdos to use
    credentials: true, // Allow credentials (cookies) to be sent
};


export default corsOptions;