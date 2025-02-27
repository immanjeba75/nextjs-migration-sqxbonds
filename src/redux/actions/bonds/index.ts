import { api } from "../../../services/api";
import {
    BONDS_ACTIONS
} from "../../actionType/bonds";
import { bonds } from "../../../services/apiVariables";
export const getBonds =
    (body: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
        // console.log('body------------>', body?.params?.page_no)

        if (body?.params?.page_no !== 1) {
            dispatch({
                type: BONDS_ACTIONS.GET_BONDS_REQUEST,
                payload: { isBoandsLoader: true },
            });
        } else {
            dispatch({
                type: BONDS_ACTIONS.GET_BONDS_REQUEST,
                payload: { isBoandsLoader: true },
            });
        }

        return new Promise((resolve, reject) => {
            api({ ...bonds.get, body })
                .then((data: any) => {
                    if (Array.isArray(data) && data.length > 0) {
                        dispatch({ type: BONDS_ACTIONS.GET_BONDS, payload: data[0] });
                        resolve(data);
                    } else {

                        dispatch({ type: BONDS_ACTIONS.GET_BONDS, payload: data });
                        resolve(data);
                    }
                })
                .catch((error) => {
                    console.log("----error----->", error);
                    dispatch({ type: BONDS_ACTIONS.GET_BONDS_ERROR, payload: error });
                    reject(error);
                });
        });
    };

// Add this action to set initial bonds
export const setInitialBonds = (data: any) => ({
    type: "SET_INITIAL_BONDS",
    payload: data,
});