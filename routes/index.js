var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://nguyenvanbinh22:RVZ6O4jqdeXVUjbA@cluster0.fhwirq5.mongodb.net/baitap?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// create Collection
let monHocSchema = mongoose.Schema({
  maMonHoc: {
    type: String,
  },
  tenMonHoc: {
    type: String,
  },
  moTa: {
    type: String,
  },
});

let monHoc = mongoose.model("monHoc", monHocSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  monHoc.find({}, (err, data) => {
    res.render("index", { monhocs: data });
  });
});

router.get("/form-add", function (req, res, next) {
  res.render("form-add", {});
});

router.post("/add", function (req, res, next) {
  monHoc.create(req.body);
  res.redirect("/");
});

router.get("/form-update/:id", function (req, res, next) {
  monHoc.findById(req.params.id, (err, data) => {
    res.render("form-update", { monhoc: data });
  });
});

router.post("/update", function (req, res, next) {
  monHoc.findByIdAndUpdate(req.body.id, req.body, (error, data) => {
    res.redirect("/");
  });
});

router.get("/form-delete/:id", function (req, res, next) {
  monHoc.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/");
  });
});

module.exports = router;
