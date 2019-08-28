const BL = require('../BL')
const path = require('path')
async function rest() { }

const Router = app => {

    app.get('/leads/:id?', async (req, res) => {
        const { id } = req.params
        var options = {
            headers: {
                'id': id
            }
        };
        res.sendFile(path.join(__dirname + '../../UI/cyber.html'), options = options);
        // res.redirect("/cyber.html?id=333")
    })

    app.get('/login/:id?', async (req, res) => {
        const { id } = req.params
        let result = await BL.general.full_login(id)
        console.log("result:")
        console.log(result)
        res.send(JSON.stringify(result))

    })

    app.put('/status', async (req, res) => {

        const { body } = req

        // console.log(req.body)
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

    // app.get('/tasks/:id?', async (req, res) => {

    //     const id = req.params.id

    //     if (id)
    //         res.send(await BL.tasks.readOne(id))
    //     else {
    //         const tasks = await BL.tasks.read()
    //         res.send(tasks)
    //     }
    // })

    // app.post('/tasks', async (req, res) => {
    //     const body = req.body
    //     await BL.tasks.create(body)
    //     res.send('success')
    // })

    // app.put('/tasks', async (req, res) => {
    //     const body = req.body
    //     await BL.tasks.update(body)
    //     res.send('success')
    // })

    // app.delete('/tasks/:id', async (req, res) => {

    //     const id = req.params

    //     await BL.tasks.del(id)

    //     res.send('success')

    // })


}

module.exports = Router