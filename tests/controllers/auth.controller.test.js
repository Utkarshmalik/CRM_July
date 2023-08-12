const { register, login } = require("../../src/Controllers/authControllers")
const { mockRequest, mockResponse } = require("../interceptor")
const db = require("../db");
const bcrypt = require("bcrypt");
const userModel = require("../../src/Models/userModel");

const testPayload={
    name:"Utkarsh",
    userId:"utkarsh",
    email:"utkarsh.amazonreferals@gmail.com",
    password:"qwerty123",
    userType:"CUSTOMER",
    userStatus:"APPROVED"
}


beforeAll(async ()=> await db.connect());
afterEach(async ()=> await db.clearDatabase());
afterAll(async ()=> await db.closeDatabase());


describe("Registration" , ()=>{

    it("happy Case", async ()=>{

        const req=mockRequest();
        const res=mockResponse();
        req.body = testPayload;

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect (res.send).toHaveBeenCalledWith({
            message:"User Created successfully!"
        })

    })


})


describe("Login" , ()=>{

    it("Login happy Case", async ()=>{
        const userSpy = jest.spyOn(userModel, 'findOne').mockReturnValue(Promise.resolve(testPayload));
        const bcryptSpy =jest.spyOn(bcrypt,'compareSync').mockReturnValue(true);
        const req=mockRequest();
        const res=mockResponse();
        req.body = testPayload;

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                email:testPayload.email,
                name:testPayload.name,
                userId:testPayload.userId,
                userType:testPayload.userType,
                userStatus:testPayload.userStatus,
                accessToken:expect.anything()
            })
        )

    })



    it("User not approved", async ()=>{
        testPayload.userStatus="pending";
        const userSpy = jest.spyOn(userModel, 'findOne').mockReturnValue(Promise.resolve(testPayload));
        const bcryptSpy =jest.spyOn(bcrypt,'compareSync').mockReturnValue(true);
        const req=mockRequest();
        const res=mockResponse();
        req.body = testPayload;

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({message:"User status must be approved to login"})
    })


       it("Invalid User Id", async ()=>{
        const userSpy = jest.spyOn(userModel, 'findOne').mockReturnValue(Promise.resolve(null));
        const bcryptSpy =jest.spyOn(bcrypt,'compareSync').mockReturnValue(true);
        const req=mockRequest();
        const res=mockResponse();
        req.body = testPayload;

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({message:`UserId : utkarsh is invalid`})
    })

       it("Invalid password", async ()=>{
        const userSpy = jest.spyOn(userModel, 'findOne').mockReturnValue(Promise.resolve(testPayload));
        const bcryptSpy =jest.spyOn(bcrypt,'compareSync').mockReturnValue(false);
        const req=mockRequest();
        const res=mockResponse();
        req.body = testPayload;

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith({message: "Invalid Password"})
    })

          it("DB is down", async ()=>{
        const userSpy = jest.spyOn(userModel, 'findOne').mockReturnValue(Promise.reject(new Error("DB is down")));
        const bcryptSpy =jest.spyOn(bcrypt,'compareSync').mockReturnValue(false);
        const req=mockRequest();
        const res=mockResponse();
        req.body = testPayload;

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({message: "DB is down"})
    })

})