
import Dashboardcontent from "../components/Dashboardcontent/Dashboardcontent";


const Dashboard = () => {
    return (
        <div className="bg-black min-h-screen">


            <div className="mt-30 ml-30">
                <h1 className="text-2xl font-bold text-green-400">
                     Top Tokens by Market Capitalization
                </h1>
                <h5 className="text-white mt-2 w-1/2">
            Get a comprehensive snapshot of all cryptocurrencies available on Binance. This page displays the latest prices, 24-hour trading volume, price changes, and market capitalizations for all coins.
         </h5>
            </div>
            <Dashboardcontent/>

           

        </div>
    )
}

export default Dashboard;