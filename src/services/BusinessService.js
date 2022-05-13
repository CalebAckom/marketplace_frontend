import { LOCALHOST_AUTH_TOKENS } from "../utils/config";
import instance from "./api";

class BusinessPageService {
	getLocalStorageAsJson(key) {
		return JSON.parse(localStorage.getItem(key));
	}
	async getBusinessDetails() {
		try {
			const { data, status } = await instance({
				method: "GET",
				url: "/accounts/self_bus_details/",
			});
			return { data, status };
		} catch (error) {
			return error;
		}
		// this.refreshToken().then(async (res) => {

		// });
	}
	async updateBusinessDetails(body) {
		try {
			const { data, status } = await instance({
				method: "PUT",
				url: "/accounts/self_bus_update/",
				headers: {
					Authorization:
						"Bearer " +
						this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)["access"],
				},
				data: body,
			});
			return { data, status };
		} catch (error) {
			console.dir(error);
			if (typeof error.response === "undefined") {
				return {
					status: 500,
					message: error["message"],
				};
			} else {
				if (error.response.status === 401) {
					this.refreshToken().then(() => {
						this.updateBusinessDetails(body);
					});
				}
				if (error.response.status === 400 || error.response.status === 401) {
					
					return {
						status: error["response"]["status"],
						message: error["response"]["data"]["detail"],
					};
				}
			}
		}
	}

	async upload_Business_Logo(img_item, onUploadProgress) {
		const formData_ = new FormData();
		formData_.append("image", img_item);
		try {
			return await instance({
				method: "put",
				headers: {
					"content-type":
						"multipart/form-data; boundary=<calculated when request is sent>",
				},
				url: "accounts/self_bus_image_upload/",
				data: formData_,
			});
		} catch (error) {
			console.dir(error);
			if (typeof error.response === "undefined") {
				return {
					status: 500,
					message: error["message"],
				};
			} else {
				if (error.response.status === 400 || error.response.status === 401) {
					return {
						status: error["response"]["status"],
						message: error["response"]["data"]["detail"],
					};
				}
			}
		}
	}

  async getPlacedOrders(url) {
    try {
		return await instance({
        method: "get",
        url,
      });
    } catch (error) {
      console.log("err", error);
      if (typeof error.response === "undefined") {
        return {
          status: 500,
          message: error["message"],
        };
      } else {
        if (error.response.status === 400 || error.response.status === 401) {
          return {
            status: error["response"]["status"],
            message: error["response"]["data"]["detail"],
          };
        }
      }
    }
  }

  async checkOrderStats() {
    try {
      return await instance({
        method: "get",
        url:"/marketplace/order/check-business-orders-status",
      });
    } catch (error) {
      console.log("err", error);
      if (typeof error.response === "undefined") {
        return {
          status: 500,
          message: error["message"],
        };
      } else {
        if (error.response.status === 400 || error.response.status === 401) {
          return {
            status: error["response"]["status"],
            message: error["response"]["data"]["detail"],
          };
        }
      }
    }
  }

  async changeOrderStatus({ status, uid }) {
    console.log("ss",status,uid)
    try {
      const response = await instance({
        method: "PUT",
        url: `/marketplace/order_status/${uid}`,
        data: { status },
      });
      return {status:response.status};
    } catch (error) {
      console.log("err", error);
      if (typeof error.response === "undefined") {
        return {
          status: 500,
          message: error["message"],
        };
      } else {
        if (error.response.status === 400 || error.response.status === 401) {
          return {
            status: error["response"]["status"],
            message: error["response"]["data"]["detail"],
          };
        }
      }
    }
  }

  async loadAllOrders() {
    return instance.get('/marketplace/order/download_bus_orders')
}}

export default new BusinessPageService();
