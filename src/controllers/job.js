const controller = {}
const Job = require("../models/job")
const validator = require('../validators/job')

controller.saveJob = async(req, res) => {
    const valid = validator.validate(req.body)

    if (valid) {
        try {
            const job = new Job({ companyName: req.body.companyName, name: req.body.name, description: req.body.description, location: req.body.location, type: req.body.type, photo: req.body.photo, companyWeb: req.body.companyWeb })
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
    const valid = validator.validate(req.body)

    if (valid) {
        try {
            await Job.findByIdAndUpdate(id, { companyName: req.body.companyName, name: req.body.name, description: req.body.description, location: req.body.location, type: req.body.type, photo: req.body.photo, companyWeb: req.body.companyWeb, updatedAt: Date.now() })
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