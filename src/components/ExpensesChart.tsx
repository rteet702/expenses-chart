import styles from "../styles/ExpensesChart.module.css";
import data from "../assets/data.json";
import { useState } from "react";

interface IExpense {
    day: string;
    amount: number;
}

export function ExpensesChart() {
    const [dailyTotals, setDailyTotals] = useState<IExpense[]>([...data]);
    const [highest, setHighest] = useState<IExpense>();

    const totalExpenses = dailyTotals.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const maxExpense = Math.max.apply(
        Math,
        dailyTotals.map(function (o) {
            return o.amount;
        })
    );

    const maxBarHeightPixels = 140;

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.balanceContainer}>
                    <h2>My Balance</h2>
                    <p>$921.48</p>
                </div>
                <img
                    src="logo.svg"
                    alt="opaque circle and hollow circle partially overlapping"
                />
            </div>

            <div className={styles.body}>
                <h1>Spending - Last 7 days</h1>
                <div className={styles.barContainer}>
                    {dailyTotals.map((day: IExpense, idx) => (
                        <div key={idx}>
                            <div
                                className={
                                    day.amount === maxExpense
                                        ? styles.max
                                        : styles.other
                                }
                                style={{
                                    height:
                                        maxBarHeightPixels *
                                        (day.amount / maxExpense),
                                }}
                            />
                            <p>{day.day}</p>
                        </div>
                    ))}
                </div>
                <hr />
                <div className={styles.footerContainer}>
                    <div className={styles.monthlyContainer}>
                        <h2>Total this month</h2>
                        <p>${totalExpenses}</p>
                    </div>
                    <div className={styles.percentageContainer}>
                        <p>+2.4%</p>
                        <h2>From last month</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
