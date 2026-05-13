
import Dashboardcontent from "../components/Dashboardcontent/Dashboardcontent";


const Dashboard = () => {
    return (
        <div className="dashboard-shell min-h-screen text-white">
            <section className="dashboard-hero mx-auto w-full max-w-[1720px] px-4 pt-24 sm:px-6 lg:px-8">
                <div>
                    <p className="dashboard-kicker">CryptoWave Terminal</p>
                    <h1 className="dashboard-title">Spot Market Command Center</h1>
                    <p className="dashboard-subtitle">
                        Track live liquidity, momentum, and capital rotation across leading digital assets.
                    </p>
                </div>
                <div className="market-status">
                    <span className="status-pulse" />
                    <span>Markets live</span>
                </div>
            </section>
            <Dashboardcontent/>
        </div>
    )
}

export default Dashboard;
