/// <reference path="userDAO.ts" />

export class UserDB implements DAO.DAO<Model.User> {
    private id:number;
    private users:{ [id:number]:Model.User; };

    constructor() {
        this.id = 1;
        this.users = {
            0: {id: 0, firstname: 'first', lastname: 'last', age: 42}
        };
    }

    create(user:Model.User) {
        if(user.firstname == "" || !user.age){
            return null;
        }
        user.id = this.id;
        this.id++;
        this.users[user.id] = user;
        return user;
    }

    read(id:number) {
        if(!this.users[id]){
            return null;
        }
        return this.users[id];
    }

    update(user:Model.User) {
        if (!this.users[user.id]) {
            return false;
        }
        this.users[user.id] = user;
        return true;
    }

    delete(id:number) {
        if (!this.users[id]) {
            return false;
        }
        this.users[id] = null;
        return true;
    }
}