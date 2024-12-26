import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userId?: number;
  password?: string;
}

function validateDeleteUser(
  createFormdeleteUserValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createFormdeleteUserValidation(req.body);

      req.body = validatedData;

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createFormdeleteUserValidation(data) {
  const schema = yup.object().shape({
    userId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Id invalido.")
      .required("El campo id de usuario no puede estar vacio."),
    password: yup
      .string()
      .min(8, "La contraseña debe contener minimo 8-20 caracteres")
      .max(20, "La contraseña debe contener minimo 8-20 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/,

        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial."
      )
      .required("El campo contraseña no puede estar vacio."),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

export { validateDeleteUser, createFormdeleteUserValidation };
