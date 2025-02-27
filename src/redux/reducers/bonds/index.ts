import { BONDS_ACTIONS } from "../../actionType/bonds";

const intialState = {
    bondsData: [],
    isBoandsLoader: false,
}
export const bondsReducer = (state = intialState, { type, payload, trigger }: any) => {
    switch (type) {
        case BONDS_ACTIONS.GET_BONDS:
            return { ...state, bondsData: payload, isBoandsLoader: false };
        case BONDS_ACTIONS.GET_BONDS_REQUEST:
            return { ...state, bondsData: payload, isBoandsLoader: true };
        case BONDS_ACTIONS.GET_BONDS_ERROR:
            return { ...state, bondsData: payload, isBoandsLoader: false };
        // In your bonds reducer
        case "SET_INITIAL_BONDS":
            return {
                ...state,
                bondsData: payload,
                isBoandsLoader: false
            };

        default:
            return state;
    }
};
