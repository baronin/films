export default async (req, res, next) => {
  const db = req.app.get("db");
  // Pagination result
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  res.locals.startIndex = startIndex;
  res.locals.limit = limit;

  const pagination = {};

  await db.collection("films").estimatedDocumentCount({}, (err, total) => {
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }
    pagination.total = total;
    pagination.pages = Math.ceil(total / limit);

    if (endIndex < total) {
      pagination.next = page + 1;
    }
    if (startIndex > 0) {
      pagination.prev = page - 1;
    }
  });
  res.pagination = pagination;

  next();
};
