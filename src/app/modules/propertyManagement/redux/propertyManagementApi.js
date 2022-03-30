import axios from "axios";
import { PropertyManagementActions } from "./propertyManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";
import {enviornment} from "../../../../constants/constants"
import {ethers} from "ethers"

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllPropertyDetailsAsync = (
  searchBy,
  searchText,
  searchStatus,
  dir
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      
      let { _id } = getState().auth.user;
      let { skip, limit } = getState().propertyManagement;
      dispatch(PropertyManagementActions.getAllPropertyDetailsStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllProperties/${_id}?skip=${skip}&limit=${limit}&column=${searchBy}&dir=${dir}&search=${searchText || searchStatus}`,
        headers: {
          "Content-Type": "application/json",
        },
        //data: {minDate:1643009881, maxDate: 1645688281}
      });
      if (data.responseCode === 200) {
        return dispatch(
          PropertyManagementActions.getAllPropertyDetailsSuccess(data.responseData)
        );
      }
      dispatch(PropertyManagementActions.getAllPropertyDetailsError());
      return dispatch(
        showSuccessSnackbar("success", data.responseMessage, 3000)
      );
    } catch (error) {
      dispatch(PropertyManagementActions.getAllPropertyDetailsError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  }
}

export const createPropertyAsync = (propertyDetails, formData, resetForm, redirectBack) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      
      let { _id } = getState().auth.user;

      dispatch(PropertyManagementActions.addPropertyStart());

      
      //upload icon
      let propertyIcon;
      if (formData) {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_HOST}/DZI/v1/api/uploadImage`,
          data: formData,
        });
        propertyIcon = data.responseData;
      }
      //upload icon

      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/createProperty/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {...propertyDetails, propertyIcon},
      });
      if (data.responseCode === 200) {
       

        dispatch(
          PropertyManagementActions.addPropertySuccess(
            data.responseData
          )
        );

        await nftMint(propertyDetails)
        resetForm()
        redirectBack()

        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(PropertyManagementActions.addPropertyError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(PropertyManagementActions.addPropertyError(error));
      return dispatch(
        showSuccessSnackbar("error", "Error while fetching data", 3000)
      );
    }
  }
}

export const updatePropertyAsync = (propertyDetails, formData, resetForm, redirectBack, propertyID) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      
      let { _id } = getState().auth.user;

      dispatch(PropertyManagementActions.updatePropertyStart());

      
      //upload icon
      let propertyIcon;
      if (formData) {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_HOST}/DZI/v1/api/uploadImage`,
          data: formData,
        });
        propertyIcon = data.responseData;
      }
      //upload icon

      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateProperty/${_id}/${propertyID}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {...propertyDetails, propertyIcon},
      });
      if (data.responseCode === 200) {
        dispatch(
          PropertyManagementActions.updatePropertySuccess(
            data.responseData
          )
        );

        resetForm()
        redirectBack()

        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(PropertyManagementActions.updatePropertyError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(PropertyManagementActions.updatePropertyError(error));
      return dispatch(
        showSuccessSnackbar("error", "Error while fetching data", 3000)
      );
    }
  }
}

export const deletePropertyAsync = (propertyID) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(PropertyManagementActions.deletePropertyStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/deleteProperty/${_id}/${propertyID}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(PropertyManagementActions.deletePropertySuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(PropertyManagementActions.deletePropertyError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(PropertyManagementActions.deletePropertyError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while deleting property. Please try again later",
          3000
        )
      );
    }
  }
}

const nftMint = async(propertyDetails) => {
      if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );

        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const signature = await signer.signMessage("DZI Sign");
        const address = await signer.getAddress();

        let wallet = new ethers.Wallet(enviornment.privateKey, provider);
        const nftContract = new ethers.Contract(
          enviornment.ERC20Address,
          enviornment.ERC20ABI,
          wallet
        );

         const mintTx = await nftContract.mintToken(
            "0xD57b78693EbDcaE70D2d6BFff1E514D4E78710F1",
            propertyDetails.nftCode
          );
          console.log("Mint tx is: ", mintTx);


          const setOnSellTx = await nftContract.setOnSell(
            "0xD57b78693EbDcaE70D2d6BFff1E514D4E78710F1",
            propertyDetails.basePrice
          );
          console.log("setOnSell tx is: ", setOnSellTx);


          const setApprovalTx = await nftContract.setApprovalForAll(
            enviornment.ERC20Address,
            true
          );
          console.log("setApprovalTx tx is: ", setApprovalTx);

}


