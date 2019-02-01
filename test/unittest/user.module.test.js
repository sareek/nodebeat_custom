const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');

const addUserMethod = require('../../lib/modules/user/methods/addUser');
const dataCollHelper=require('../../lib/helpers/datacollector.helper');

chai.use(require('chai-as-promised'));

describe("add user", function () {
    it('should return okay status ', function () {
        let req = {};
        let res = {
            json: sinon.spy()
        }
        addUserMethod.createUser(req, res);
        expect(res.json.calledOnce).to.be.true;
    });



    it('should pass the request', function (done) {

        let userData= {
            firstName: "lekh raj",
            lastName: "rokaya",
            email: "rokayalekhraj@gmail.com",
            password: "password",
            salutation: "Mr.",
            userRole: "user",
            agree_terms_condition: true
        }

        let req = {
            body:userData
        };

       

        let res = {
            json: sinon.spy(),
            status: sinon.spy()
        };

       let dataStubbed=sinon.stub(dataCollHelper,"userDataCollector").callsFake(function (data) {
           console.log('flow in test folder');
        return data;
      })

        
        // db = global.db;

       

        addUserMethod.createUser(req, res);

        expect(dataStubbed.calledOnce).to.be.true;

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