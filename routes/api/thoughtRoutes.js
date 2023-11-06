const router = require("express").Router();
const {
    createThought,
    getThoughtbyId,
    getThoughts,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
}  = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getThoughtbyId).put(updateThought).delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction).delete(removeReaction)


module.exports = router;