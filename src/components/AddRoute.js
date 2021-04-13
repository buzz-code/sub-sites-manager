import React, { useState } from "react";
import RouteDataService from "../services/RouteService";

const AddRoute = () => {
    const initialRouteState = {
        path: "",
        description: "",
        active: false
    };
    const [route, setRoute] = useState(initialRouteState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRoute({ ...route, [name]: value });
    };

    const saveRoute = () => {
        var data = {
            path: route.path,
            description: route.description,
            active: false
        };

        RouteDataService.create(data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newRoute = () => {
        setRoute(initialRouteState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newRoute}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="path">Path</label>
                        <input
                            type="text"
                            className="form-control"
                            id="path"
                            required
                            value={route.path}
                            onChange={handleInputChange}
                            name="path"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={route.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveRoute} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddRoute;
