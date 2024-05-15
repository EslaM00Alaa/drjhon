const Joi = require("joi");

function validatePatient(obj) {
  const schema = Joi.object({
    id: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
    phone: Joi.string().max(255),
    whatsapp: Joi.string().max(255),
    job: Joi.string().max(255),
    mail: Joi.string().email().max(255),
    questionans: Joi.string().max(1000),
  });
  return schema.validate(obj);
}


function networkPatient(obj) {
  const schema = Joi.object({
    parent_id: Joi.string().max(255).required(),
    son_id: Joi.string().max(255).required()
  });
  return schema.validate(obj);
}



module.exports = {validatePatient , networkPatient};
