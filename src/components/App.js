// External Imports
import React from 'react';
import {connect} from "react-redux";

// Eternal Imports
import initialize from "../callers";
import "./App.css";

class App extends React.Component {
    componentDidMount() {
        this.props.initialize();
    }

    renderAgentsList() {
        return this.props.missions.map(({agent, country, address, date}) => {
            return (
                <tr key={date}>
                    <td className="px-12 py-6">{agent}</td>

                    <td className="px-12 py-6">{country}</td>

                    <td className="px-12 py-6">{address}</td>

                    <td className="px-12 py-6">{date}</td>
                </tr>
            );
        });
    }

    render() {
        const { isolatedCountries = [], missions = [] } = this.props;

        if (!missions || !missions.length) {
            return (
                <div className="wrapper">
                    <div className="container pt-50">
                        Sorry we don't have any missions to display.
                    </div>
                </div>
            )
        }

        return (
            <div className="wrapper">
                <div className="container pt-50">
                    <table className="w-full table-auto table-border-collapse border-1 border-solid border-dark-grey mb-20">
                        <thead className="bg-grey">
                        <tr>
                            <th className="border-1 border-solid border-dark-grey px-12 py-6">Agent ID</th>

                            <th className="border-1 border-solid border-dark-grey px-12 py-6">Country</th>

                            <th className="border-1 border-solid border-dark-grey px-12 py-6">Address</th>

                            <th className="border-1 border-solid border-dark-grey px-12 py-6">Date</th>
                        </tr>
                        </thead>

                        <tbody className="bg-white">
                        {this.renderAgentsList()}
                        </tbody>

                        <tfoot className="bg-grey">
                            <tr>
                                <th colSpan="4" className="border-1 border-solid border-dark-grey px-12 py-6 text-align-right">
                                    {this.props.missions.length} missions
                                </th>
                            </tr>
                        </tfoot>
                    </table>

                    <header className="mb-20">Most Isolated Country: {isolatedCountries.join(',')}</header>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({missions, isolatedCountries}) => {
    return {
        missions,
        isolatedCountries
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initialize: () => initialize(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
