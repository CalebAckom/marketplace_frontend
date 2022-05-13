import { LOCALHOST_AUTH_TOKENS } from '../utils/config';
import instance from './api';
import axios from "axios";

class ProfilePageService {
  getLocalStorageAsJson(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  async getProfileDetails() {
    try {
      const { data, status } = await instance({
        method: 'GET',
        url: 'accounts/signed_in_user/',
      });
      console.log('My Profile data -> ', data);
      return { data, status };
    } catch (error) {
      console.log('fetch error => ');
      console.dir(error);
      return error;
    }
    // this.refreshToken().then(async (res) => {

    // });
  }
  async updateProfileDetails(body) {
    // console.log("incoming ", body);
    try {
      const { data, status } = await instance({
        method: 'PUT',
        url: 'accounts/update',
        headers: {
          Authorization:
            'Bearer ' +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)['access'],
        },
        data: body,
      });
      // console.log(data, status);
      return { data, status };
    } catch (error) {
      console.dir(error);
      if (typeof error.response === 'undefined') {
        return {
          status: 500,
          message: error['message'],
        };
      } else {
        if (error.response.status === 401) {
          this.refreshToken().then(() => {
            this.updateProfileDetails(body);
          });
        }
        if (error.response.status === 400 || error.response.status === 401) {
          // updateBusinessDetails(body);
          return {
            status: error['response']['status'],
            message: error['response']['data']['detail'],
          };
        }
      }
    }
  }

  async activateDeactivateUser(useraccount) {
    try {
      const data_s = await instance({
        method: 'PUT',
        url: `/auth/activate_deactivate/`,
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)['access'],
        },
        data: useraccount,
      });
      return data_s;
    } catch (error) {
      console.dir(error);
    }
  }

  async getUserlist(activatedUser, currentPage, searchuser = '') {
    try {
      const data = await instance({
        method: 'GET',
        url: `/accounts/business-infolist/${activatedUser}/?page=${currentPage}&search=${searchuser}`,
        headers: {
          Authorization:
            'Bearer ' +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)['access'],
        },
      });
      console.log('BBusy', data);
      return data;
    } catch (error) {
      console.dir(error);
    }
  }

  async deActivatedBusinessUser(
    deactivatedUser,
    currentPage,
    searchinput = ''
  ) {
    try {
      const data = await instance({
        method: 'GET',
        url: `/accounts/business-infolist/${deactivatedUser}/?page=${currentPage}&search=${searchinput}`,
        headers: {
          Authorization:
            'Bearer ' +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)['access'],
        },
      });
      console.log('BusDec', data);
      return data;
    } catch (error) {
      console.dir(error);
    }
  }

  async activatedUserList(activatedUser, currentPage, searchUser = '') {
    try {
      return await instance({
        method: 'GET',
        url: `/accounts/profile-list/${activatedUser}/?page=${currentPage}&search=${searchUser}`,
        headers: {
          Authorization:
            'Bearer ' +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)['access'],
        },
      });
    } catch (error) {
      console.dir(error);
    }
  }

  async deActivatedUserList(deactivatedUser, currentPage, searchInput = '') {
    try {
      const data = await instance({
        method: 'GET',
        url: `/accounts/profile-list/${deactivatedUser}/?page=${currentPage}&search=${searchInput}`,
        headers: {
          Authorization:
            'Bearer ' +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)['access'],
        },
      });
      return data;
    } catch (error) {
      console.dir(error);
    }
  }


  async getBussinessPageProduct(pageproduct) {
    try {
      const datas = await axios.get(`https://community.amalitech-dev.net/api/marketplace.com/business_web/product/${pageproduct}`);
      return datas;
    } catch (error) {
      console.dir(error);
    }
  }

  async getSingleBusinessPage(pagedetail) {
    try {
      const response = await axios.get(`https://community.amalitech-dev.net/api/marketplace.com/business_web/bus_detail/${pagedetail}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }




  // async upload_Business_Logo(img_item, onUploadProgress) {
  //   let formData = new FormData();
  //   formData.append("image", img_item);
  //   try {
  //     const { data, status } = await instance({
  //       method: "put",
  //       url: "accounts/image_upload/",
  //       body: formData,
  //       onUploadProgress,
  //     });
  //     return { data, status };
  //   } catch (error) {
  //     console.dir(error);
  //     if (typeof error.response === "undefined") {
  //       return {
  //         status: 500,
  //         message: error["message"],
  //       };
  //     } else {
  //       if (error.response.status === 400 || error.response.status === 401) {
  //         // updateBusinessDetails(body);
  //         return {
  //           status: error["response"]["status"],
  //           message: error["response"]["data"]["detail"],
  //         };
  //       }
  //     }
  //   }
  // }
}

export default new ProfilePageService();
