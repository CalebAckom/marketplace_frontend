import axios from "axios";
// import instance from "./api";
class AuthService {
  async SignUpUser(inputData) {
    try {
      const { data, status } = await axios({
        url: "https://community.amalitech-dev.net/api/auth/registration/",
        method: "post",
        data: inputData,        
      });
      console.log("data", status, data);
      if (status === 201) {
        return { status, message: data };
      }
    } catch (error) {
      console.log(error)
      if (typeof error.response === "undefined") {
        return {
          status: 500,
          message: error["message"],
        };
      } else {
        if (error.response.status === 400) {
          return {
            status: error["response"]["status"],
            message: error["response"]["data"]["error"],
          };
        }
      }
    }
  }

  async ConfirmCode(code) {
    console.log(code);
    try {
      const { data, status } = await axios({
        url: "https://community.amalitech-dev.net/api/auth/keyinput/",
        method: "Post",
        data: { integer_key: code },
      });
      return { data, status };
    } catch ({ response }) {
      return response;
    }
  }

  async ResendVerification(email) {
    console.log(email);
    try {
      const { data, status } = await axios({
        url: "https://community.amalitech-dev.net/api/auth/create-key/",
        method: "post",
        data: { authentication_property: email, access_type: "a" },
      });
      console.log(`$status:${status}, data:${data}`);
      return { data, status };
    } catch (error) {
      console.dir(error);
      if (typeof error.response === "undefined") {
        return {
          status: 500,
          message: error["message"],
        };
      } else {
        if (error.response.status === 400) {
          return {
            status: error["response"]["status"],
            message: error["response"]["data"]["error"],
          };
        }
      }
    }
  }
}

export default new AuthService();
