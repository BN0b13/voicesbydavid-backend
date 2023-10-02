export const HandleErrors = func => (req, res, next) => {
    func(req, res, next).catch(err => {
        next(err);
    });
}

export default (err, req, res, next) => {
    res.status(err.code ? err.code : 500).send({
        error: {
            message: err.message,
            data: err.data
        }
    });
}