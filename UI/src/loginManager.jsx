export class LoginManager {

    static instance;
    loggedInUser;

    constructor() {

    }

    static getInstance = () => {
        if(this.instance === undefined ||this.instance === null) {
            this.instance = new LoginManager();
            this.instance.loggedInUser = {};
        }
        return this.instance;
    }

    getLoggedInUser = () =>{
        return this.loggedInUser;
    }

    setLoggedInUser = (user) => {
        this.loggedInUser = user;
    }

}