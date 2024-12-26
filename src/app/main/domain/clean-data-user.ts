export async function cleanDataUser(data: any) {
  const cleanData = data.map((record) => {
    return {
      userId: record.user_id,
      userName: record.user_name,
      email: record.user_email,
      confirmEmail: record.confirm_email,
    };
  });
  return cleanData;
}
