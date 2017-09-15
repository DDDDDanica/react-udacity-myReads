import React from 'react';

export default class Loader extends React.Component {
    render () {
        return (
            <div className="RPM-Loader">
                <div className="RPM-Loader-inner">
                    <label className="loader-label"> ●</label>
                    <label className="loader-label"> ●</label>
                    <label className="loader-label"> ●</label>
                    <label className="loader-label"> ●</label>
                    <label className="loader-label"> ●</label>
                    <label className="loader-label"> ●</label>
                </div>
            </div>
        );
    }
}
