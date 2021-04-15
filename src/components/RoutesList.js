import React, { useState } from "react";
import { useList } from "react-firebase-hooks/database";
import RouteDataService from "../services/RouteService";
import Route from "./Route";

const RoutesList = () => {
    const [currentRoute, setCurrentRoute] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    /* use react-firebase-hooks */
    const [routes, loading, error] = useList(RouteDataService.getAll());

    const refreshList = () => {
        setCurrentRoute(null);
        setCurrentIndex(-1);
    };

    const setActiveRoute = (route, index) => {
        const { path, description, active } = route.val();

        setCurrentRoute({
            key: route.key,
            path,
            description,
            active,
        });

        setCurrentIndex(index);
    };

    const removeAllRoutes = () => {
        RouteDataService.removeAll()
            .then(() => {
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Routes List</h4>

                {error && <strong>Error: {error}</strong>}
                {loading && <span>Loading...</span>}
                <ul className="list-group">
                    {!loading &&
                        routes &&
                        routes.map((route, index) => (
                            <li
                                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => setActiveRoute(route, index)}
                                key={index}
                            >
                                {route.val().path}
                            </li>
                        ))}
                </ul>

                {/* <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllRoutes}
                >
                    Remove All
                </button> */}
            </div>
            <div className="col-md-6">
                {currentRoute ? (
                    <Route route={currentRoute} refreshList={refreshList} />
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Route...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoutesList;
