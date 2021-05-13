const controller = {}
const Job = require("../models/job")

controller.saveJob = async(req, res) => {
    const companyName = req.body.companyName
    const name = req.body.name
    const description = req.body.description
    const location = req.body.location
    const type = req.body.type
    const photo = req.body.photo
    const companyWeb = req.body.companyName
    const savedAt = req.body.savedAt
    if (companyName && name && description && location && type && photo && companyWeb && savedAt) {
        try {
            const job = new Job({ companyName: companyName, name: name, description: description, location: location, type: type, photo: photo, companyWeb: companyWeb, savedAt: Date.now() })
            await job.save()
            res.status(204).send("Oferta guardada")
        } catch (err) {
            console.log(err)
            res.status(500).send(err.message)
        }
    } else {
        res.status(400).send()
    }
}
controller.getJobs = async(req, res) => {
    try {
        const filter = req.query.filter
        const query = {
            $or: [{
                    name: new RegExp(filter, 'i')
                },
                {
                    type: new RegExp(filter, 'i')
                },
                {
                    location: new RegExp(filter, 'i')
                }
            ]
        }
        const jobs = await Job.find(query)
        res.json(jobs)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}
controller.getJob = async(req, res) => {
    const id = req.params.id
    try {
        const job = await Job.findById(id)
        res.json(job)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}
controller.updateJob = async(req, res) => {
    const companyName = req.body.companyName
    const name = req.body.name
    const description = req.body.description
    const location = req.body.location
    const type = req.body.type
    const photo = req.body.photo
    const companyWeb = req.body.companyName
    const id = req.params.id

    if (companyName && name && type && description && location && type && photo && companyWeb) {
        try {
            await Job.findByIdAndUpdate(id, { companyName: companyName, name: name, description: description, location: location, type: type, photo: photo, companyWeb: companyWeb, updatedAt: Date.now() })
            res.status(204).send("Oferta actualizada")
        } catch (err) {
            console.log(err)
            res.status(500).send(err.message)
        }
    } else {
        res.status(400).send()
    }
}
controller.deleteJob = async(req, res) => {
    const id = req.params.id
    try {
        await Job.findByIdAndDelete(id)
        res.status(204).send("Oferta eliminada satisfactoriamente")
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}
module.exports = controller