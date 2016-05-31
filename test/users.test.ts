/// <reference path="../node/users.ts" />
/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
/// <reference path="../node/typings/index.d.ts" />

import userData = require('../node/users');
import chai = require('chai');

const expect = chai.expect;
const userInfo:userData.UserDB = new userData.UserDB();

describe("Get existing user", () => {
    it("should return user", () => {
        const user = userInfo.read(0);
        console.log(user);
        expect(user).to.eql({id: 0, firstname: 'first', lastname: 'last', age: 42});
    });
});

describe("Get non-existing user", () => {
    it("should return null", () => {
        const user = userInfo.read(5);
        console.log(user);
        expect(user).to.eql(null);
    });
});

describe("Create user", () => {
    it("should return user", () => {
        const user = userInfo.create({firstname: 'Sachin', lastname: 'Aggarwal', age: 21});
        console.log(user);
        expect(user).to.eql({id: 1, firstname: 'Sachin', lastname: 'Aggarwal', age: 21});
    });
});

describe("Create user without name", () => {
    it("should return null", () => {
        const user = userInfo.create({firstname: '', lastname: 'Aggarwal', age: 21});
        console.log(user);
        expect(user).to.eql(null);
    });
});

describe("Create user without age", () => {
    it("should return null", () => {
        const user = userInfo.create({firstname: 'Sachin', lastname: 'Aggarwal', age: null});
        console.log(user);
        expect(user).to.eql(null);
    });
});

describe("Update existing user", () => {
    it("should return true", () => {
        const user = userInfo.update({id: 1, firstname: 'Sachin', lastname: 'Aggarwal', age: 21});
        console.log(user);
        expect(user).to.eql(true);
    });
});

describe("Update non-existing user", () => {
    it("should return false", () => {
        const user = userInfo.update({id: 10, firstname: 'Sachin', lastname: 'Aggarwal', age: 21});
        console.log(user);
        expect(user).to.eql(false);
    });
});

describe("Delete existing user", () => {
    it("should return true", () => {
        const user = userInfo.delete(1);
        console.log(user);
        expect(user).to.eql(true);
    });
});

describe("Update non-existing user", () => {
    it("should return false", () => {
        const user = userInfo.delete(10);
        console.log(user);
        expect(user).to.eql(false);
    });
});