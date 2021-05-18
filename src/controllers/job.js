const controller = {}
const Job = require("../models/job")
const validator = require('../validators/job')

controller.saveJob = async(req, res) => {
    try {
        if (req.user.role === "company") {
            const valid = validatorJob.validate(req.body);
            if (!valid) {
                res.status(400).send();
                return;
            }
            const job = new Job({
                companyName: req.body.companyName,
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                type: req.body.type,
                photo: req.body.photo,
                companyWeb: req.body.companyWeb,
                publisher: req.user,
            });
            await job.save();
            res.status(204).send("Oferta guardada");
        }
        res.status(403).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
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
    try {
        if (req.user.role === "company") {
            const id = req.params.id;
            const job = await Job.findById(id);
            if (String(job.publisher) === String(req.user._id)) {
                const valid = validatorJob.validate(req.body);
                if (!valid) {
                    res.status(400).send();
                    return;
                }
                await Job.findByIdAndUpdate(id, {
                    companyName: req.body.companyName,
                    name: req.body.name,
                    description: req.body.description,
                    location: req.body.location,
                    type: req.body.type,
                    photo: req.body.photo,
                    companyWeb: req.body.companyWeb,
                    updatedAt: Date.now(),
                });
                res.status(204).send("Oferta actualizada");
            }
        }
        res.status(403).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};
controller.deleteJob = async(req, res) => {
    try {
        if (req.user.role === "company") {
            const id = req.params.id;
            const job = await Job.findById(id);
            if (String(job.publisher) === String(req.user._id)) {
                await Job.findByIdAndDelete(id);
                res.status(204).send("Oferta eliminada satisfactoriamente");
            }
        }
        res.status(403).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};
module.exports = controller