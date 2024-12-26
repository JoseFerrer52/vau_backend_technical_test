// Interface para la entrada de datos
export interface UserInput {
  userId: number;
}

// Interface para la salida de datos o representación de los datos de transacciones
interface users {
  userId: number;
  userName: string;
  email: string;
  confirmEmail: boolean;
}

interface ListUser {
  listUser: users[];
}

export interface AllUser {
  users: ListUser;
}
