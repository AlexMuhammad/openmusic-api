import InvariantError from "../../exceptions/invariant-error";
import { SongRequest } from "../../plugins/songs/types";
import { SongPayloadSchema } from "./schema";

const SongValidator = {
  validateSongPayload: (payload: SongRequest) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default SongValidator;
