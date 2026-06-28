const express = require("express");
const cors = require("cors");
const path = require("path");
const twilio = require("twilio");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const accountSid ="AC81e5aca67c8cb92753cd5ffc37c76aa1";
const authToken ="f5899672c32c952150419d624ac701f4";
const twilioPhone ="9363930584";
const client = twilio(
    accountSid,
    authToken
);
app.post("/send-alert", async (req, res) => {
 try {
    const {
            phone,
            message
        } = req.body;

        const sms =
        await client.messages.create({

            body: message,

            from: twilioPhone,

            to: phone
        });

        res.json({

            success: true,
            sid: sms.sid
        });

    } catch (error) {

        console.log(error);

        res.json({

            success: false,
            error: error.message
        });
    }
});
const PORT = 5000;
app.listen(PORT, () => {

    console.log(
        `🚀 Server Running On Port ${PORT}`
    );
});