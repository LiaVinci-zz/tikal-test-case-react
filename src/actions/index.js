const fetchMissionsSucceed = (payload) => {
    return {
        type: 'FETCH_MISSIONS_SUCCEED',
        payload
    }
};

export default fetchMissionsSucceed;
