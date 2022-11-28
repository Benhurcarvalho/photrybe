const SUCCESS_STATUS_CODE = 200;
const UNAUTHORIZED_STATUS_CODE = 401;
const WRONG_PASSWORD_MOCK = "11111111";

export const requestLogin = async (email, password) => {
  return {
    statusCode: password === WRONG_PASSWORD_MOCK ? UNAUTHORIZED_STATUS_CODE : SUCCESS_STATUS_CODE,
    json: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            email,
            isAdmin: email.includes(".admin")
          })
        }, 1000);
      });
    }
  }
}

// {
//   statusCode: 200
//   json: {
//     email: "",
//     isAdmin: false
//   }
// }