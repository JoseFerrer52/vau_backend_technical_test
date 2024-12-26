import { DataInputForDeleteUser } from "../domain/model/user";
import bcrypt from "bcrypt";
import { validationErrorResponse } from "../../../utilities/errors/error-validation";

export async function checkPassword(
  data: DataInputForDeleteUser,
  password: string
): Promise<string | boolean> {
  const match = await new Promise((resolve, reject) => {
    bcrypt.compare(data.password, password, (err: any, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  if (match) {
    const response = true;
    return response;
  } else {
    const errorMessage = "Nombre de usurio o contraseña invalida.";
    validationErrorResponse(errorMessage);
    return errorMessage;
  }
}
