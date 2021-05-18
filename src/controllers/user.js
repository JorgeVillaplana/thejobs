const controller = {}
const User = require('../models/user')
const Offer = require('../models/offer')
const validatorSignUp = require('../validators/userSignup')
const validatorLogin = require('../validators/userLogin')
const authJWT = require("../auth/jwt")

controller.signup = async(req, res) => {
    const valid = validatorSignUp.validate(req.body)

    if (!valid) {
        res.status(400).send()
        return
    }

    try {
        const exist = await User.findOne({ email: req.body.email })
        if (exist) {
            console.log("El usuario ya existe")
            res.status(400).send("El usuario ya existe")
            return
        }
        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            role: req.body.role,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        const data = await User.findOne({ email: req.body.email })
        res.send({ status: "ok", data: data })
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }
}

controller.login = async(req, res) => {

    const valid = validatorLogin.validate(req.body)

    if (!valid) {
        console.log("Datos obligatorios")
        res.status(401).send("Credenciales incorrectas")
        return
    }
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            console.log("usuario no existe")
            res.status(401).send("Credenciales incorrectas")
            return
        }

        const validate = await user.isValidPassword(req.body.password)
        if (!validate) {
            console.log("contraseña incorrecta")
            res.status(401).send("Credenciales incorrectas")
            return
        }

        const dataToken = authJWT.createToken(user);
        return res.send({
            access_token: dataToken[0],
            expires_in: dataToken[1]
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }

}

controller.updateUser = async(req, res) => {
    const id = req.user._id
    const valid = validatorSignUp.validate(req.body)

    if (!valid) {
        res.status(400)
    }

    try {
        await User.findByIdAndUpdate(id, { name: req.body.name, surname: req.body.surname, phone: req.body.phone, email: req.body.email, updatedAt: Date.now() })
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }
}

/**
controller.deleteUser = async(req, res) => {
    const id = req.user._id

    try {
        await User.findByIdAndDelete(id)
        res.send()
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }
}
*/

controller.myOffers = async(req, res) => {
    const id = req.user._id
    const query = { candidate: id }
    try {
        const myOffers = await Offer.find(query).populate("job")
        res.json(myOffers)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

controller.getUsersByOffer = async(req, res) => {
    const user = req.user
    const jobid = req.params.id

    try {
        if (user.role == "company") {
            const job = await Job.findById(jobid)
            const query = { job: job }
            const offer = await Offer.find(query).populate("user")
            res.json(offer)
        }
        res.status(400).send("Error de autenticación.")
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = controller