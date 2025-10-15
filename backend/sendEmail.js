import nodemailer from "nodemailer"

export const sendEmail = async(name,email,message)=>{
    const transporter  = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
            
        }
    })
    const mailOptions = {
        from:`"Contact Form"${process.env.EMAIL_USER}`,
        to:process.env.RECIEVER_EMAIL,
        subject: `have a new message from ${name}`,
        html:`
        <h2>This is new message</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>${message}</p>
        `
    }
    await transporter.sendMail(mailOptions)
}