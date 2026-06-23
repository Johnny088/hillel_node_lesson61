export const updateContactPhoto = (req, res) => {
  console.log(req.file);

  res.json(req.file);
};
