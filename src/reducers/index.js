const initialState = {
    missions: [],
    isolatedCountries: []
};

const missionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_MISSIONS_SUCCEED':
            const { missions, isolatedCountries } = action.payload;

            return {
                missions,
                isolatedCountries
            };
    }

    return state;
};

export default missionsReducer;
