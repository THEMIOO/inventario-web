export const validateBody = (schema) => (req, res, next) => {
  try {
    req.validatedBody = schema.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Validación fallida', errors: err.errors });
  }
};

export const validateQuery = (schema) => (req, res, next) => {
  try {
    req.validatedQuery = schema.parse(req.query);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Query inválido', errors: err.errors });
  }
};
