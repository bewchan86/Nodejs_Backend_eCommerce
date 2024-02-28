const app = require("./src/app");

const PORT = process.env.PORT || 3056

const server = app.listen(PORT,() => {
    console.log(`WSV eCommerce strat with port ${PORT}`);
});

process.on('SIGINT', () =>{
    server.close( () => console.log(`Exit server express`));
    process.exit(0);
})