export default function (req, res, next) {
    res.json = (body) => {
        if (!res.get('Content-Type')) {
            res.set('Content-Type', 'application/json');
        }
        res.send(JSON.stringify(body, null, 2));
        return res;
    };
    next();
}
//# sourceMappingURL=prettyPrintJson.js.map