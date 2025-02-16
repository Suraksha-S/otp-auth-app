 
import React from 'react';
import Chart from 'chart.js/auto';
import ApexCharts from 'react-apexcharts';

import { useEffect, useRef, useState } from 'react';
import '../dashboard.css';
import home from "../assets/home.png"
import settings from "../assets/settings.png"

const Dashboard = () => {
    const chartRef = useRef(null);
    const [apexData] = useState({
        series: [{ data: [40, 35, 80, 50, 95, 70] }],
        options: {
            chart: { type: 'line' },
            xaxis: { categories: ['12th Oct', '13th Oct', '14th Oct', '15th Oct', '16th Oct', '17th Oct'] }
        }
    });

    
    useEffect(() => {
        if (chartRef.current) {
            new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ['12th Oct', '13th Oct', '14th Oct', '15th Oct', '16th Oct', '17th Oct'],
                    datasets: [{
                        label: 'Inventory',
                        data: [93, 80, 65, 85, 90, 95],
                        borderColor: '#FFB200',
                        backgroundColor: 'transparent'
                    }]
                }
            });
        }
    }, []);

    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>Analytics Dashboard</h1>
                <div>
                <button className="logout-btn">Logout</button>
                </div>
                
            </div>

            <div className='chart'>
                <div className='grid1'>
                    <img className='home' src={home} alt="" />
                    <img className='setting' src={settings} alt="" />
                </div>

                <div className='grid2'>
                <div className="card1">
                    <h2>Inventory</h2>
                    <p>93%</p>
                    <canvas ref={chartRef}></canvas>
                </div>
                <div className="card1">
                    <h2>Orders</h2>
                    <p>65%</p>
                    <ApexCharts options={apexData.options} series={apexData.series} type="line" height={200} />
                </div>
                </div>

                <div className='grid3'>
                <div className="card2">
                    <h2>Battery</h2>
                    <ApexCharts options={{ labels: ['Remaining', 'Consumed'], colors: ['#2A52BE', '#FFB200'] }}
                        series={[65, 35]} type="donut" height={120} />
                    <p>65%</p>
                </div>
                </div>

                <div className='grid4'>
                <div className="card3">
                <h2>Margin %</h2>
                <ApexCharts options={apexData.options} series={apexData.series} type="line" height={200} />
            </div>

                </div>
           
            </div>
            
            <div className='login-Footer'>
        <p>&copy; 2025, Greendzine Technology Pvt Ltd. All Rights Reserved. </p>
      </div>
        </div>
    );
};

export default Dashboard;
