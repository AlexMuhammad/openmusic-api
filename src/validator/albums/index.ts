import InvariantError from "../../exceptions/invariant-error";
import { AlbumRequest } from "../../plugins/albums/types";
import { AlbumPayloadScheme } from "./schema";

const AlbumValidator = {
  validateAlbumPayload: (payload: AlbumRequest) => {
    const validationResult = AlbumPayloadScheme.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AlbumValidator;
