const express = require("express");
const router = express.Router();
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");
const db = require("../config");
const userData = require("../data/user");

router
    .route('/employer/:userId')
    .get(async (req, res) => {
        //code here for GET
        try {
            const employerInfo = await userData.getAllEmployer();
            let result = [];
            for (const employer of employerInfo) {
                result.push(employer)
            }
            res.status(200).json(result);
        } catch (e) {
            res.status(400).json({ error: e });
            return
        }
    })
    .post(async (req, res) => {
        const employerBody = req.body;
        try {
            // NEED TO VALIDATE SCHEMA AND BODY     
            //   helper.validatePayloadSchema(moviesBody);
            //   helper.checkFields(
            //     req.body.title,
            //     req.body.plot,
            //     req.body.genres,
            //     req.body.rating,
            //     req.body.studio,
            //     req.body.director,
            //     req.body.castMembers,
            //     req.body.dateReleased,
            //     req.body.runtime
            //   )
            //   helper.checkTitle(req.body.title);
            //   helper.checkStudio(req.body.studio);
            //   helper.checkDirector(req.body.director);
            //   helper.checkRating(req.body.rating);
            //   helper.checkGenres(req.body.genres);
            //   helper.checkCastMembers(req.body.castMembers);
            //   helper.checkDate(req.body.dateReleased);
            //   helper.checkRuntime(req.body.runtime);
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
        try {
            const { userName } = userBody
            const user = await userData.createEmployer(
                userName
            );
            res.status(200).json(user);
            return;
        } catch (e) {
            res.status(400).json({ error: e });
            return;
        }
    });

module.exports = router;