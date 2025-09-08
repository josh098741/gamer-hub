const notFound = (req,res,next) => {
    res.status(404).json({message: "Router not found"})
};

module.exports = notFound