import InvariantError from "../../exceptions/invariant-error";
import { CreateAlbumRequest } from "../../plugins/albums/types";
import { AlbumPayloadScheme } from "./schema";

const AlbumValidator = {
  validateAlbumPayload: (payload: CreateAlbumRequest) => {
    const validationResult = AlbumPayloadScheme.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default AlbumValidator;
