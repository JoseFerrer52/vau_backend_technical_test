export async function addTokenToUser(data: any, token: string) {
  try {
    const mergedData = data.map((record) => {
      return {
        userId: record.userId,
        userName: record.userName,
        email: record.userEmail,
        confirmEmail: record.confirmEmail,
        token: token,
      };
    });
    return mergedData;
  } catch (error) {
    console.log(error);
  }
}
