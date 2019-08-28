const BL = require('../BL')
const path = require('path')
async function rest() { }

const Router = app => {

    app.get('/leads/:id', async function (req, res) {
        const { id } = req.params
        let result = await BL.general.full_login(id)
        res.render('index', result)
    });

    // app.get('/login/:id?', async (req, res) => {
    //     const { id } = req.params
    //     let result = await BL.general.full_login(id)
    //     console.log("result:")
    //     console.log(result)
    //     res.send(JSON.stringify(result))
    // })

    app.put('/status', async (req, res) => {
        const { body } = req
        result = await BL.general.update_status(body.person_id, body.status_id)
        switch (body.status_id) {
            case "1":
                res.send("תודה רבה, ניצור איתך קשר תיק-תק :]")
                break
            case "2":
                res.send("אחלה, תודה רבה, נהיה בקשר בהמשך.")
                break
            case "3":
                res.send("אחלה, שמחנו להכיר, תמיד פה לכל שאלה :]")
                break
            default:
                res.send("תודה רבה, ניצור איתך קשר בקרוב.")
        }
    })


}

module.exports = Router