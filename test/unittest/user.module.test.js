const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');
const bluebird = require('bluebird');

const addUserMethod = require('../../lib/modules/user/methods/addUser');
const datacollectorHelper = require('../../lib/helpers/datacollector.helper');

chai.use(require('chai-as-promised'));


describe('user module test', () => {

    afterEach(function () {
        sinon.restore();
    });

    describe("add user", () => {

        // it('should return okay status ', function () {
        //     let req = {};
        //     let res = {
        //         json: sinon.spy()
        //     }
        //     addUserMethod.createUser(req, res);
        //     expect(res.json.calledOnce).to.be.true;
        // });



        it('should call userdata collector fake function', (done) => {

            let userData = {
                firstName: "lekh raj",
                lastName: "rokaya",
                email: "rokayalekhraj@gmail.com",
                password: "password",
                salutation: "Mr.",
                userRole: "user",
                agree_terms_condition: true
            }

            let req = {
                body: userData
            };



            let res = {
                json: sinon.spy(),
                status: sinon.spy()
            };

            let dataStubbed = sinon.stub(datacollectorHelper, "userDataCollector").withArgs(userData).callsFake(() => {
                console.log('callig fake function')
                return userData;
            });

            let emailExitsStub = sinon.stub(addUserMethod, "checkEmailExists").withArgs(userData).usingPromise(bluebird.Promise).resolves(userData);
            // dataStubbed.restore();
            console.log('fake email data', emailExitsStub)
            // sinon.spy(addUserMethod,"checkEmailExists");

            // db = global.db;



            addUserMethod.createUser(req, res);

            expect(dataStubbed.calledOnce).to.be.true;
           // sinon.assert.calledWith(emailExitsStub,'userdata');

            // return expect(emailExitsStub.calledOnce).to.eventually.be.true;

            done();
        });
    });


    // describe("save user function test", function () {
    //     it('should return object when object is fetched', function () {
    //         let body={
    //             firstName: "lekh raj",
    //             lastName: "rokaya",
    //             email:"rokayalekhraj@gmail.com",
    //             password:"password",
    //             salutation:"Mr.",
    //             userRole: "user",
    //             agree_terms_condition:true,
    //         }


    //        return expect(addUserMethod.saveUser(body)).to.eventually.be.true;
    //     });
    // });
})