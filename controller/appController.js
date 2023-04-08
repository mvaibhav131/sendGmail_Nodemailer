const nodemailer = require('nodemailer'); // for email
const Mailgen=require('mailgen'); // for gmail
require('dotenv').config();

const signup=async(req,res)=> {
    /** send mail from ethereal email account & nodemailer */
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      let message ={
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully registered with account", // plain text body
        html: "<b>Succesfully done!</b>", // html body
      };

      transporter.sendMail(message).then((data)=>{
        res.status(201).json({
            message:"You should receive the email !",
            data: data.messageId,
            preview:nodemailer.getTestMessageUrl(data)
        })
      }).catch(error=>{
        res.status(500).json({message:error})
      })
    // res.status(201).json("Signup Successfully.... ! ")
};



const getbill=(req,res)=>{
    /**Send real Gmail using nodemailer & mailgen */

    const {userEmail}= req.body; // here you need to enter the email for receiver


    let config={
        service:"gmail",
        auth:{
            user:process.env.GMAIL,
            pass:process.env.PASSWORD
        }
    }

    let transporter=nodemailer.createTransport(config)

    let mailGenerator = new Mailgen({
        theme:"default",
        product:{
            name:"Mailgen",
            link:"https://mailgen.js/"
        }
    });
     
    let response={
        body:{
            name:"vaibhav",
            intro:"Your email through mailgen",
            table:{
                data:[
                   {
                     item:"NOdemailer through gmail",
                    description:"A gmail application",
                    price:"555Rupees"
                }
                ]
            },
            outro:"Looking the forword !"
        }
    }

    let mail= mailGenerator.generate(response)
    let message= {
        from:process.env.GMAIL,
        to:userEmail,
        subject:"Your mail through mailgen",
        html:mail
    }

    transporter.sendMail(message).then((data)=>{
       return res.status(201).json({
            message:"You should receive the email !"
        })
      }).catch(error=>{
        res.status(500).json({message:error})
      })

    // res.status(201).json("Getbill Successfully.... ! ")
}

module.exports={signup,getbill}