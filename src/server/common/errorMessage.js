export const internalErrorMessage = (err, res, message) => {
  console.error("500 internalError" || message, err);
  res.status(500).json({ error: err.message });
};

export const notFoundErrorMessage = (result, res, message) => {
  if (result.recordset.length === 0) {
    return res.status(404).json({ message: "404..." || message });
  }
};
