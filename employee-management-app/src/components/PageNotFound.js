import React from "react";
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <div style={{"maxWidth": "600px"}} className="ms-auto me-auto">
            <h1 className="pt-4 pb-1">Error 404 - Page Not Found</h1>
            <p>Looks like the page you are looking for does not exist or was moved.</p>
            <Link className="btn btn-primary mt-2" to={"/"}>Browse Employee Directory</Link>
        </div>
    );
}

export default PageNotFound;