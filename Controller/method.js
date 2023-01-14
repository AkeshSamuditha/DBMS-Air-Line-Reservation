const {URL}= require('url');
const keys = ['SEngineering'];

const dotenv = require('dotenv');
dotenv.config();

class Method{ 
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.type = req.method;
        this.url = new URL("http://localhost"+":"+ process.env.port +req.url);
        this.seperator = req.url.split(/[/,?]/);
        this.user=null;
    }
    getPath(ind){
        return this.seperator[ind];
    }

    searchURL(query){
        return this.url.searchParams.get(query);
    }
    getToken() {
        var token = this.req.headers["authorization"];
        return token;
    }

    setUser(user){
        this.user=user;
    }

    getBody(){
        return(this.req.body)
    }

}



module.exports = Method;