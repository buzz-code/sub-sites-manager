import React, { useState } from "react";
import RouteDataService from "../services/RouteService";

const Route = (props) => {
    const initialRouteState = {
        key: null,
        path: "",
        description: "",
        active: false,
    };
    const [currentRoute, setCurrentRoute] = useState(initialRouteState);
    const [message, setMessage] = useState("");

    const { route } = props;
    if (currentRoute.key !== route.key) {
        setCurrentRoute(route);
        setMessage("");
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentRoute({ ...currentRoute, [name]: value });
    };

    const updateActive = (status) => {
        RouteDataService.update(currentRoute.key, { active: status })
            .then(() => {
                setCurrentRoute({ ...currentRoute, active: status });
                setMessage("The status was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateRoute = () => {
        const data = {
            path: currentRoute.path,
            description: currentRoute.description,
        };

        RouteDataService.update(currentRoute.key, data)
            .then(() => {
                setMessage("The route was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteRoute = () => {
        RouteDataService.remove(currentRoute.key)
            .then(() => {
                props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const navigateToApp = () => {
        window.open(currentRoute.path);
    };

    return (
        <div>
            {currentRoute ? (
                <div className="edit-form">
                    <h4>Route</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="path">Path</label>
                            <input
                                type="text"
                                className="form-control"
                                id="path"
                                name="path"
                                value={currentRoute.path}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentRoute.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {' '}
                            {currentRoute.active ? "Active" : "UnActive"}
                        </div>
                    </form>

                    {currentRoute.active ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateActive(false)}
                        >
                            UnActivate
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateActive(true)}
                        >
                            Activate
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteRoute}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success mr-2"
                        onClick={updateRoute}
                    >
                        Update
                    </button>
                    
                    <button className="badge badge-info" onClick={navigateToApp}>
                        Open App
                    </button>

                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Route...</p>
                </div>
            )}
        </div>
    );
};

export default Route;
