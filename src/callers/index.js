// Eternal Imports
import fetchMissionsSucceed from '../actions/index'
import missions from '../data/missions.json'

export const initialize = async (dispatch) => {
    if (!missions || !missions.length) return null;

    let isolatedAgents = {};
    let notIsolatedAgents = {};

    for (const { agent, country } of missions) {
        if (isolatedAgents[agent]) {
            delete isolatedAgents[agent];
            notIsolatedAgents[agent] = country;
        } else if (!isolatedAgents[agent] && !notIsolatedAgents[agent]) {
            isolatedAgents[agent] = country;
        }
    }

    let countryIsolatedAgents = {
        mostIsolatedAgents: {
            isolatedAgents: 0,
            countries: []
        }
    };

    for (let agent in isolatedAgents) {
        const country = isolatedAgents[agent];

        countryIsolatedAgents[country] = countryIsolatedAgents[country] + 1 || 1;

        if (countryIsolatedAgents.mostIsolatedAgents.isolatedAgents < countryIsolatedAgents[country]) {
            countryIsolatedAgents.mostIsolatedAgents.isolatedAgents = countryIsolatedAgents[country];
            countryIsolatedAgents.mostIsolatedAgents.countries = [country];
        } else if (countryIsolatedAgents.mostIsolatedAgents.isolatedAgents === countryIsolatedAgents[country]) {
            countryIsolatedAgents.mostIsolatedAgents.countries.push(country);
        }
    }

    return dispatch(fetchMissionsSucceed({
        missions,
        isolatedCountries:  countryIsolatedAgents.mostIsolatedAgents.countries
    }))
};

export default initialize;
