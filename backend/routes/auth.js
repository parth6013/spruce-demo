const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const uuid = require('uuid');
const DIDKit = require('@spruceid/didkit');



// register
router.post("/register", async (req, res) => {
    console.log(req.body);
  
    const emailExist = await User.findOne({ twitter_id: req.body.twitter_id });
    if (emailExist)
      return res
        .status(400)
        .send({ error: "twitter_id already exist" });
  
    //hash
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      twitter_id: req.body.twitter_id,
      password: hashPass,
    });
    try {
      const savedUser = await user.save();
      
  
      return res
        .status(200)
        
        .send({ user, error: null});
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ error: "Not available at the moment", success: "false" });
    }
  });



  router.post("/try2", async (req, res) => {
    console.log(req.body);
  
  
    const user = await User.findOne({ twitter_id: req.body.twitter_id });
    user.verification="1";
    const user2= await user.save();
  
    
  
 
  
  
    return res
      .status(200)
      
      .send({ user2,error: null,});
  });


  router.post("/login", async (req, res) => {
    console.log(req.body);
  
  
    const user = await User.findOne({ twitter_id: req.body.twitter_id });
    if (!user)
      return res
        .status(400)
        .send({ error: "Username or Password is incorrect." });
  
    //hash
    const ValidPass = await bcrypt.compare(req.body.password, user.password);
    if (!ValidPass)
      return res
        .status(400)
        .send({ error: "Username or Password is incorrect." });
  
 
  
  
    return res
      .status(200)
      
      .send({ user,error: null,});
  });



  router.post('/getVc', async (req, res) => {


    const key = DIDKit.generateEd25519Key();

    const did = DIDKit.keyToDID('key', key);

    const verificationMethod = DIDKit.keyToVerificationMethod('key', key);

    credential=
    {
        "@context": "https://www.w3.org/2018/credentials/v1",
        "id": "urn:uuid:eb383404-6b39-4424-b894-e6a6e7a7d13c",
        "type": ["VerifiableCredential"],
        "issuer": did,
        "issuanceDate": "2022-03-24T13:32:17Z",
        "credentialSubject": {
            "id": "did:example:d23dd687a7dc6787646f2eb98d0"
        }
    }


didkit_options = {
    "proofPurpose": "assertionMethod",
    "verificationMethod": verificationMethod
}


p_crdential=DIDKit.issueCredential(credential,didkit_options,key);

console.log(p_crdential);

verification1 = DIDKit.verifyCredential(p_crdential,didkit_options);

console.log(verification1);


    try {
      const user = await User.find({ twitter_id: req.body.twitter_id })
      

      //user1.verification=0;
      
    //const savedUser = await user1.save();
    //user1.verification="1";
    //console.log(user1);
    //await user1.save();

    //await User.updateOne({twitter_id: req.body.twitter_id}, { verification: "1" });

      

  
    
      
   
    
      res.send({ user})
    } catch (e) {
      res.status(400).send()
      console.log(e);
    }
  })


  router.post("try", async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ twitter_id: req.body.twitter_id });
    if (!user)
      return res
        .status(400)
        .send({ error: "Phn no is incorrect." });
    try {
      user.verification="1"
      const new_user = await user.save(); res.status(201).send({ user })
      return response.status(201)
    } catch (error) {
      console.log(error);
    }
  });






module.exports = router;



