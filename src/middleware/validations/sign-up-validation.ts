import { Response, Request, NextFunction } from "express";
import * as yup from "yup";
import { ValidationError } from "../../utilities/class_error/class-validation-error";

interface ValidationSchema {
  userName?: string;
  password?: string;
  email?: string;
}

function signUpvalidate(
  createFormValidation: (data: unknown) => Promise<ValidationSchema>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    console.log(req.body);

    try {
      const validatedData = await createFormValidation(req.body);
      req.body = validatedData;

      next();
    } catch (error) {
      next(new ValidationError(error));
    }
  };
}

async function createSignUpValidation(
  data: unknown
): Promise<ValidationSchema> {
  const schema = yup.object().shape({
    userName: yup
      .string()
      .max(20, "El Nombre de usuario no puede contener más de 20 caracteres")
      .matches(/^[a-zA-Z0-9_]+$/, "Nombre de usario incorrecto")
      .required("El campo Nombre de usuario no puede estar vacio"),
    password: yup
      .string()
      .min(8, "La contraseña debe contener minimo 8-20 caracteres")
      .max(20, "La contraseña debe contener minimo 8-20 caracteres")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$/,

        "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial."
      )
      .required("El campo Contraseña no puede estar vacio"),
    email: yup.string().email("Correo electronico invalido").required(),
  });

  const validatedData = await schema.validate(data);
  return validatedData;
}

export { signUpvalidate, createSignUpValidation };
