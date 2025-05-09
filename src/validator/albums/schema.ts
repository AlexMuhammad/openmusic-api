import Joi from "joi";

export const AlbumPayloadScheme = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});
