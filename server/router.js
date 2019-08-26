const BL = require('../BL')

async function rest() { }

const Router = app => {

    app.get('/leads/333', async (req, res) => {
        res.redirect("/index.html?id=333")
    })

    app.get('/login/:id?', async (req, res) => {
        const { id } = req.params
        let result = await BL.general.full_login(id)
        console.log("result:")
        console.log(result)
        res.send(JSON.stringify(result))

    })

    app.put('/status', async (req, res) => {

        const body = req.body

        // console.log(req.body)
        res = await BL.general.update_status(body.person_id, body.status_id)
        return res
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