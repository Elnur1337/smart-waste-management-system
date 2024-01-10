import { useContext } from "react";

//Context
import { directionsContext } from "../pages/HomePage";

const Alerts = () => {

    const contextVars = useContext(directionsContext);
    const trashBins = contextVars[4];
    return (
        <section className="alerts">
            {// eslint-disable-next-line
            trashBins.map((trashBin) => {
                const currDate = new Date();
                const date = new Date(trashBin.lastUpdate);
                const dateDiff = currDate.getTime() - date.getTime();
                const dateDiffDays = Math.round(dateDiff / (1000 * 3600 * 24));
                if (dateDiffDays > 2) {
                    return (
                        <article className="alert" key={trashBin.id}>
                            <h3>Possible sensor malfunction</h3>
                            <span>{`Address: ${trashBin.address}`}</span>
                        </article>
                    );
                }
            })}
        </section>
    );
}

export default Alerts;