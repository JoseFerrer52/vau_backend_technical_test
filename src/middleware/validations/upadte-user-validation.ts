import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userId?: number;
  userName?: string;
  password?: string;
  email?: string;
}

function validateUpadteUser(
  createFormUpadteUserValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validatedData = await createFormUpadteUserValidation(req.body);

      req.body = validatedData;

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createFormUpadteUserValidation(data) {
  const schema = yup.object().shape({
    userId: yup
      .number()
      .transform((value) => {
        return parseInt(value);
      })
      .typeError("Id invalido.")
      .required("El campo id de usuario no puede estar vacio."),
    userName: yup
      .string()
      .max(20, "El Nombre de usuario no puede contener más de 20 caracteres")
      .matches(/^[a-zA-Z0-9_]+$/, "Nombre de usario incorrecto")
      .optional(),
    password: yup
      .string()
      .min(8, "La contraseña debe contener minimo 8-20 caracteres")
      .max(20, "La contraseña debe contener minimo 8-20 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/,

        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial."
      )
      .optional(),
    email: yup.string().email("Correo electronico invalido").optional(),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

export { validateUpadteUser, createFormUpadteUserValidation };
