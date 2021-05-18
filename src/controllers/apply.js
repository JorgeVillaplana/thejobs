const controller = {}
const Job = require("../models/job")
const Offer = require("../models/offer")

controller.deleteOffer = async(req, res) => {
    //Get the user that requested the removal of one of his offers
    const offerId = req.params.id;
    try {
        if (req.user.role === "user") {
            //after identifying the user then start checking if the offer requested is valid
            const offer = await Offer.findById(offerId);
            if (String(offer.candidate) === String(req.user._id)) {
                await offer.findByIdAndDelete(offerId);
                res.status(204).send("Oferta eliminada satisfactoriamente");
            }
            res.status(403).send()
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
}

controller.registerOffer = async(req, res) => {
    const jobId = req.params.id;
    try {
        if (req.user.role === "user") {
            //check the existence of the related job offer
            const job = await Job.findById(jobId);
            if (job !== null) {
                const offer = new Offer({
                    job: job,
                    candidate: req.user,
                    cvlink: req.body.curriculum,
                });
                await offer.save();
                res.status(204).send("Oferta guardada");
            }
            res.status(403).send()
        }
        // If code didnt work return an 400 error
        res.status(400).send();
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};

module.exports = controller