export const calculateProfit = (order) => {
    if (order?.orderItem?.buyPrice > 0 && order?.orderItem?.sellPrice) {
        const profit = ((order.orderItem.sellPrice - order.orderItem.buyPrice) / order.orderItem.buyPrice) * 100;
        return `${profit.toFixed(2)}%`; 
    }
    return "-";
};
