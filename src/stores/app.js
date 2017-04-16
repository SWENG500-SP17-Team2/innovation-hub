import {
    createStore
} from 'redux';

const initialState = {
    innovations: [{
        Name: "Loading...",
        Description: ""
    }]
};

const actions = {
    updateInnovations: innovations => {
        return {
            type: 'update_innovations',
            innovations
        };
    }
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'update_innovations':
            return {
                innovations: action.innovations
            }
        default:
            return state;
    }
};

const store = createStore(app);

export {
    store,
    actions
};
