import React, {useEffect,useState} from 'react'
import { Row,Col,Dropdown,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';


import {bindActionCreators} from "redux"
//circular
import Circularprogressbar from '../../components/circularprogressbar.js'

// AOS
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos'
import '../../../node_modules/aos/dist/aos.css'
//apexcharts
import Chart from "react-apexcharts";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.scss';

//progressbar
import Progress from '../../components/progress.js'
//img
import shapes1 from '../../assets/images/shapes/01.png'
import shapes2 from '../../assets/images/shapes/02.png'
import shapes3 from '../../assets/images/shapes/03.png'
import shapes4 from '../../assets/images/shapes/04.png'
import shapes5 from '../../assets/images/shapes/05.png'

//Count-up
import CountUp from 'react-countup';
// store
import {NavbarstyleAction, getDirMode, getcustomizerMode, getcustomizerprimaryMode,  getcustomizerinfoMode,  SchemeDirAction, ColorCustomizerAction,  getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction,  SidebarColorAction, getSidebarColorMode, getSidebarTypeMode} from '../../store/setting/setting'
import {connect} from "react-redux"

  
// install Swiper modules
SwiperCore.use([Navigation]);

const mapStateToProps = (state) => {
   
    return {
        darkMode: getDarkMode(state),
        customizerMode: getcustomizerMode(state),
        cololrinfomode: getcustomizerinfoMode(state),
        colorprimarymode: getcustomizerprimaryMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
            ColorCustomizerAction,
        },
        dispatch
    )
})



const Index = (props) => {
    const [salesData, setSalesData] = useState(null);

    const [productNames, setProductNames] = useState([]);
    const [totalQuantities, setTotalQuantities] = useState([]);
    const [productSummary, setProductSummary] = useState([]);
    const [totalSales, setTotalSales]=useState('');

    const maxAmount = Math.max(...productSummary.map(product => product.totalAmount));


    const [totalSalesAmount, setTotalSalesAmount] = useState(0);
    const [totalSalesMonthlyAmount, setTotalSalesMonthlyAmount] = useState([]);
    const [totalMonthlySales, setTotalMonthlySales]=useState('');
    const [todaySales, setTodaySales]=useState('');
    const [weeklySales, setWeeklySales]=useState('');
    const [numberOfProducts, setNumberOfProducts]=useState('');
    const [numberOfShops, setNumberOfShops]=useState('');
    const [numberOfOrders,setNumberOfOrders ]=useState('');

    const [sales, setSales] = useState([]);
    const [shops, setShops] = useState([]);


useEffect(() => {
    const fetchShopData = async () => {
        try {
            const response = await fetch('http://128.140.42.236:4023/api/shop/getAll');
            const data = await response.json();
            if (data && data.status === 'success') {
                // Assuming 'shops' is the array containing shop data
                const sortedShops = data.shops.sort((a, b) => {
                    // Assuming 'createdAt' is a timestamp or date field in shop data
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }).slice(0, 6); // Get the first six records after sorting

                setShops(sortedShops);
            }
        } catch (error) {
            console.error('Error fetching shop data:', error);
        }
    };

    fetchShopData();
}, []);
    useEffect(() => {
      const fetchSales = async () => {
        try {
          const response = await fetch('http://128.140.42.236:4023/api/sale/getAllSales');
          if (response.ok) {
            const data = await response.json();
            // Assuming data is an array of sales objects with relevant fields
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Get the last six sales
            const lastSixSales = data.slice(0, 5);
            setSales(lastSixSales);
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle errors or set an appropriate state to indicate the error
        }
      };
  
      fetchSales();
    }, []);
    useEffect(() => {
        axios.get('http://128.140.42.236:4023/api/sale/getAllSales')
          .then((response) => {
            setNumberOfOrders(response.data.length);
            //console.log('Shop',response.data.length); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
    useEffect(() => {
        axios.get('http://128.140.42.236:4023/api/shop/getAll')
          .then((response) => {
            setNumberOfShops(response.data.shops.length);
            console.log('Shop',response.data.shops.length); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);

    useEffect(() => {
        axios.get('https://nodewithsql.onrender.com/products')
          .then((response) => {
            setNumberOfProducts(response.data.length);
            console.log(response.data.length); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
   
    useEffect(() => {
        axios.get('http://128.140.42.236:4023/api/sale/getWeeklySales')
          .then((response) => {
            setWeeklySales(response.data.weeklySales);
            console.log(response.data.weeklySales); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
    useEffect(() => {
        axios.get('http://128.140.42.236:4023/api/sale/getTodaySales')
          .then((response) => {
            setTodaySales(response.data.todaySales);
            console.log(response.data.todaySales); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);

    useEffect(() => {
        axios.get('http://128.140.42.236:4023/api/sale/getCurrentMonthTotalSales')
          .then((response) => {
            setTotalMonthlySales(response.data.currentMonthTotalSales);
            console.log(response.data.currentMonthTotalSales); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);

    useEffect(() => {
        axios.get('http://128.140.42.236:4023/api/sale/getMonthlySales')
          .then((response) => {
            setTotalSalesMonthlyAmount(response.data.monthlySales);
            console.log(response.data.monthlySales); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
  


    useEffect(() => {
        axios.get('http://128.140.42.236:4023/api/sale/getTotalSales')
          .then((response) => {
            setTotalSales(response.data.totalSales);
            console.log(response.data.totalSales); // Log the fetched totalSales value
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
  

    useEffect(() => {
      // Fetch data from the API endpoint
      axios.get('https://nodewithsql.onrender.com/productSummaryQ')
        .then((response) => {
          // Set the fetched data to the productSummary state variable
          setProductSummary(response.data);
          
          // Calculate total sales amount
          const calculatedTotalSalesAmount = response.data.reduce((total, product) => total + product.totalAmount, 0);
          setTotalSalesAmount(calculatedTotalSalesAmount);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://nodewithsql.onrender.com/productTotalQuantities'); // Assuming your API endpoint is at '/productTotalQuantities'
          const { ProductName, TotalQuantityOrdered } = response.data;
  
          setProductNames(ProductName);
          setTotalQuantities(TotalQuantityOrdered);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error if needed
        }
      };
  
      fetchData();
    }, []); // Empty array as a dependency to run the effect only once
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://nodewithsql.onrender.com/monthlySales');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    useEffect(() => {
    AOS.init({
        startEvent: 'DOMContentLoaded',
        disable:  function() {
          var maxWidth = 996;
          return window.innerWidth < maxWidth;
        },
        throttleDelay: 10,
        once: true,
        duration: 700,
        offset: 10
      });
    //   customizer
    const colorcustomizerMode = sessionStorage.getItem('color-customizer-mode');
    const colorcustomizerinfoMode = sessionStorage.getItem('colorcustominfo-mode');
    const colorcustomizerprimaryMode = sessionStorage.getItem('colorcustomprimary-mode');
    if(colorcustomizerMode===null){
        props.ColorCustomizerAction(props.customizerMode, props.cololrinfomode, props.colorprimarymode);
        document.documentElement.style.setProperty('--bs-info', props.cololrinfomode );
       
    }
    else{
        props.ColorCustomizerAction(colorcustomizerMode, colorcustomizerinfoMode, colorcustomizerprimaryMode);
        document.documentElement.style.setProperty('--bs-info', colorcustomizerinfoMode);
            
    }
    
      
    })

    const chart1 = {
        options: {
            chart: {
                fontFamily: '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                toolbar: {
                    show: false
                },
                sparkline: {
                    enabled: false,
                }
            },
            colors: [props.colorprimarymode, props.cololrinfomode],
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%', // Adjust as needed
                    endingShape: 'flat',
                }
            },
            yaxis: {
                show: true,
                labels: {
                    show: true,
                    minWidth: 19,
                    maxWidth: 19,
                    style: {
                        colors: "#8A92A6",
                    },
                    offsetX: -5,
                },
            },
            legend: {
                show: false,
            },
            xaxis: {
                labels: {
                    minHeight: 22,
                    maxHeight: 22,
                    show: true,
                    style: {
                        colors: "#8A92A6",
                    },
                },
                categories: ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            grid: {
                show: false,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: "vertical",
                    shadeIntensity: 0,
                    gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
                    inverseColors: true,
                    opacityFrom: .4,
                    opacityTo: .1,
                    stops: [0, 50, 80],
                    colors: [props.colorprimarymode, props.cololrinfomode]
                }
            },
            tooltip: {
                enabled: true,
            },
        },
        // series: [{
        //     name: 'total',
        //     data: totalSalesMonthlyAmount // Replace this with your data array for 'total' series
        // }],
        series: [ {
            name: 'Sales',
            data: totalSalesMonthlyAmount
        }]
    
    }
    
    
    
  //chart2
    const chart2 ={
        options : {
        colors: [props.colorprimarymode, props.cololrinfomode],
        plotOptions: {
            radialBar: {
            hollow: {
                margin: 10,
                size: "50%",
            },
            track: {
                margin: 10,
                strokeWidth: '50%',
            },
            dataLabels: {
                show: false,
            }
            }
        },
        labels: productNames,
        },
        series: totalQuantities,
    }
    const chart3={
        options : {
            chart: {
            stacked: true,
            toolbar: {
                show:false
                }
            },
            colors: [props.colorprimarymode, props.cololrinfomode],
            plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '28%',
                endingShape: 'rounded',
                borderRadius: 5,
            },
            },
            legend: {
            show: false
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
            },
            xaxis: {
            categories: productNames,
            labels: {
                minHeight:20,
                maxHeight:20,
                style: {
                colors: "#8A92A6",
                },
            }
            },
            yaxis: {
            title: {
                text: ''
            },
            labels: {
                minWidth: 19,
                maxWidth: 19,
                style: {
                    colors: "#8A92A6",
                },
            }
            },
            fill: {
            opacity: 1
            },
            tooltip: {
            y: {
                formatter: function (val) {
                return "$ " + val + ""
                }
            }
            }
        },
        series: [{
            name: 'Successful deals',
            // data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55],
            data:[2,58,35,3,10,5,15,16,0,0]
        }
      
    ]
    }
        return (
            <>
                <Row>
                    <Col md="12" lg="12">
                        <Row className="row-cols-1">
                            <div className="overflow-hidden d-slider1 ">
                                <Swiper className="p-0 m-0 mb-2 list-inline "
                                    slidesPerView={5}
                                    spaceBetween={32}
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev'
                                    }}
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        550: { slidesPerView: 2 },
                                        991: { slidesPerView: 3 },
                                        1400: { slidesPerView: 4 },
                                        1500: { slidesPerView: 5 },
                                        1920: { slidesPerView: 6 },
                                        2040: { slidesPerView: 7 },
                                        2440: { slidesPerView: 8 }
                                    }} data-aos="fade-up" data-aos-delay="700"
                                >
                                    <SwiperSlide className="card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget" >
                                                <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" Linecap='rounded' trailstroke='#ddd' strokewidth="4px" style={{width:60, height:60,}} value={90} id="circle-progress-01" >
                                                    <svg className="" width="24" height="24px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">Total Sales</p>
                                                    <h4 className="counter">ETB:{totalSales}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <Circularprogressbar stroke={props.cololrinfomode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px"  Linecap='rounded' style={{width:60, height:60,}} value={60} id="circle-progress-02" >
                                                    <svg className="" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                <p  className="mb-2">Total Shop</p>
                                                <h4 className="counter">{numberOfShops}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{width:60, height:60,}} value={70} id="circle-progress-03" >
                                                    <svg className="" width="24" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">Today Sales</p>
                                                    <h4 className="counter">ETB: {todaySales}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <Circularprogressbar stroke={props.cololrinfomode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{width:60, height:60,}} value={60} id="circle-progress-04" >
                                                    <svg className="" width="24px" height="24px" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">This Week</p>
                                                    <h4 className="counter">ETB: {weeklySales}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <Circularprogressbar stroke={props.colorprimarymode} width="60px" height="60px" trailstroke='#ddd' strokewidth="4px" Linecap='rounded' style={{width:60, height:60,}} value={50} id="circle-progress-05" >
                                                <svg className="" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">This Month</p>
                                                    <h4 className="counter">ETB: {totalMonthlySales}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide" >
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                    <Circularprogressbar stroke={props.cololrinfomode} width="60px" height="60px" trailstroke='#ddd' Linecap='rounded' strokewidth="4px" value={40}  style={{width:60, height:60,}} id="circle-progress-06">
                                                    <svg className="" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">Users</p>
                                                    <h4 className="counter">$<CountUp  start={652} end={4600} duration={3}/></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=" card card-slide">
                                        <div className="card-body">
                                            <div className="progress-widget">
                                                <Circularprogressbar stroke={props.colorprimarymode}  Linecap='rounded' trailstroke='#ddd' strokewidth="4px" width="60px" height="60px" value={30} style={{width:60, height:60,}} id="circle-progress-07" >
                                                    <svg className="" width="24px" height="24px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z" />
                                                    </svg>
                                                </Circularprogressbar>
                                                <div className="progress-detail">
                                                    <p  className="mb-2">Products</p>
                                                    <h4 className="counter">{numberOfProducts} Items</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <div className="swiper-button swiper-button-next"></div>
                                    <div className="swiper-button swiper-button-prev"></div>
                                </Swiper>
                            </div>
                        </Row>
                    </Col>
                    <Col md="12" lg="8">
                        <Row>
                            <Col md="12">
                                <div className="card" data-aos="fade-up" data-aos-delay="800">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                        <h4 className="card-title">${totalSales}</h4>

                                            <p className="mb-0">Gross Sales</p>          
                                        </div>
                                        <div className="d-flex align-items-center align-self-center">
                                            <div className="d-flex align-items-center text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-2">
                                                <span className="text-secondary">This Year Sales</span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center ms-3 text-info">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 24 24" fill="currentColor">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-2">
                                                    <span className="text-secondary">Previous Year Sales</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    </div>
                                    <div className="card-body">
                                        <Chart 
                                         options={chart1.options} 
                                         series={chart1.series} 
                                         type="area"  
                                         height="245"  />
                                    </div>
                                </div>
                            </Col>
                            {/* <Col md="12" xl="6">
                                <div className="card" data-aos="fade-up" data-aos-delay="900">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Earnings</h4>            
                                        </div>   
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton1" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className=" dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex-wrap d-flex align-items-center justify-content-between">
                                            <Chart className="col-md-8 col-lg-8" options={chart2.options} series={chart2.series} type="radialBar"   height="250"  />
                                            <div className="d-grid gap col-md-4 col-lg-4">
                                                <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#3a57e8">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#3a57e8"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Fashion</span>
                                                    <h6>251K</h6>
                                                </div>
                                                </div>
                                                <div className="d-flex align-items-start">
                                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#4bc7d2">
                                                    <g>
                                                        <circle cx="12" cy="12" r="8" fill="#4bc7d2"></circle>
                                                    </g>
                                                </svg>
                                                <div className="ms-3">
                                                    <span className="text-secondary">Accessories</span>
                                                    <h6>176K</h6>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
                            <Col md="12" xl="12">
                                <div className="card" data-aos="fade-up" data-aos-delay="1000">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title">Sales By Products</h4>            
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle as={Button} href="#" variant=" text-secondary" id="dropdownMenuButton3" aria-expanded="false">
                                                This Week
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton3">
                                                <li><Dropdown.Item href="#">This Week</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Month</Dropdown.Item></li>
                                                <li><Dropdown.Item href="#">This Year</Dropdown.Item></li>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="card-body">
                                        <Chart className="d-activity" options={chart3.options} series={chart3.series} type="bar"   height="230"  />
                                    </div>
                                </div>
                            </Col>         
                            <Col md="12" lg="12">
                                <div className="overflow-hidden card" data-aos="fade-up" data-aos-delay="600">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="mb-2 card-title">Elilta Sales Trading Sc</h4>
                                            <p className="mb-0">
                                                <svg className ="me-2" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#3a57e8" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                                                </svg>
                                                15 new acquired this month
                                            </p>            
                                        </div>
                                    </div>
                                    <div className="p-0 card-body">
                                        <div className="mt-4 table-responsive">
                                            <table id="basic-table" className="table mb-0 table-striped" role="grid">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        {/* <th>productCode</th> */}
                                                        <th>Total Amount Of Sales In Quantity</th>
                                                        <th>Total Amount of Sales in ETB</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
  {productSummary.map((product, index) => (
    <tr key={index}>
      <td>
        <div className="d-flex align-items-center">
          {/* Replace this with your image source */}
          {/* <img className="rounded bg-soft-primary img-fluid avatar-40 me-3" src={} alt="profile"/> */}
          <h6>{product.productName}</h6>
        </div>
      </td>
      {/* Additional columns based on your data */}
      <td>${product.totalQuantity}</td>
      <td>
        <div className="mb-2 d-flex align-items-center">
          <h6>${product.totalAmount}</h6> {/* Calculate the percentage based on your requirement */}
        </div>
        {/* Replace this with your progress component */}
        <Progress softcolors="primary" color="primary" className="shadow-none w-100" value={(product.totalAmount / maxAmount) * 100} minvalue={0} maxvalue={100} style={{ height: "4px" }} />
      </td>
    </tr>
  ))}
</tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="12" lg="4">
                        <Row>
                      
                         <Col md="12">
                                <div className="card" data-aos="fade-up" data-aos-delay="600">
                                    <div className="flex-wrap card-header d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="mb-2 card-title">Sales</h4>
                                            <p className="mb-0">
                                                
                                                Latest Sales
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                            {sales.map((sale, index) => (
                                                <div key={index} className="mb-2 d-flex profile-media align-items-top">
                                                <div className="mt-1 profile-dots-pills border-primary"></div>
                                                <div className="ms-4">
                                                    <h6 className="mb-1">${sale.totalPrice}, {sale.shopInfo.shopName}</h6>
                                                    <span className="mb-0">{sale.saleCode}</span>
                                                </div>
                                                </div>
                                            ))}
                                            </div>

                                       
                                </div>
                            </Col>
                            <Col md="12">
            <div className="card" data-aos="fade-up" data-aos-delay="600">
                <div className="flex-wrap card-header d-flex justify-content-between">
                    <div className="header-title">
                        <h4 className="mb-2 card-title">Shops</h4>
                        <p className="mb-0">Latest Shops</p>
                    </div>
                </div>
                <div className="card-body">
                    {shops.map((shop, index) => (
                        <div key={index} className="mb-2 d-flex profile-media align-items-top">
                            <div className="mt-1 profile-dots-pills border-primary"></div>
                            <div className="ms-4">
                                <h6 className="mb-1">{shop.shopName}</h6>
                                <span className="mb-0">{shop.shopCode}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Col>
                            <Col md="12" lg="12">
                                <div className="card credit-card-widget" data-aos="fade-up" data-aos-delay="900">
                                    <div className="pb-4 border-0 card-header">
                                        <div className="p-4 border border-white rounded primary-gradient-card">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                <h5 className="font-weight-bold">Elilta Trading </h5>
                                                <p className="mb-0">Contact Us</p>  
                                                </div>
                                                <div className="master-card-content">
                                                <svg className="master-card-1" width="60" height="60" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                                </svg>
                                                <svg className="master-card-2" width="60" height="60" viewBox="0 0 24 24">
                                                    <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                                </svg>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <div className="card-number">
                                                <span className="fs-5 me-2">***</span>
                                                <span className="fs-5 me-2">****</span>
                                                <span className="fs-5 me-2">****</span>
                                                <span className="fs-5">***</span>
                                                </div>
                                            </div>
                                            {/* <div className="mb-2 d-flex align-items-center justify-content-between">
                                                <p className="mb-0">Card holder</p>
                                                <p className="mb-0">Expire Date</p>
                                            </div> */}
                                            {/* <div className="d-flex align-items-center justify-content-between">
                                                <h6>Mike Smith</h6>
                                                <h6 className="ms-5">06/11</h6>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex-wrap mb-4 d-flex align-itmes-center">
                                            <div className="d-flex align-itmes-center me-0 me-md-4">
                                                <div>
                                                <div className="p-3 mb-2 rounded bg-soft-primary">
                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.9303 7C16.9621 6.92913 16.977 6.85189 16.9739 6.77432H17C16.8882 4.10591 14.6849 2 12.0049 2C9.325 2 7.12172 4.10591 7.00989 6.77432C6.9967 6.84898 6.9967 6.92535 7.00989 7H6.93171C5.65022 7 4.28034 7.84597 3.88264 10.1201L3.1049 16.3147C2.46858 20.8629 4.81062 22 7.86853 22H16.1585C19.2075 22 21.4789 20.3535 20.9133 16.3147L20.1444 10.1201C19.676 7.90964 18.3503 7 17.0865 7H16.9303ZM15.4932 7C15.4654 6.92794 15.4506 6.85153 15.4497 6.77432C15.4497 4.85682 13.8899 3.30238 11.9657 3.30238C10.0416 3.30238 8.48184 4.85682 8.48184 6.77432C8.49502 6.84898 8.49502 6.92535 8.48184 7H15.4932ZM9.097 12.1486C8.60889 12.1486 8.21321 11.7413 8.21321 11.2389C8.21321 10.7366 8.60889 10.3293 9.097 10.3293C9.5851 10.3293 9.98079 10.7366 9.98079 11.2389C9.98079 11.7413 9.5851 12.1486 9.097 12.1486ZM14.002 11.2389C14.002 11.7413 14.3977 12.1486 14.8858 12.1486C15.3739 12.1486 15.7696 11.7413 15.7696 11.2389C15.7696 10.7366 15.3739 10.3293 14.8858 10.3293C14.3977 10.3293 14.002 10.7366 14.002 11.2389Z" fill="currentColor"></path>                                            
                                                    </svg>
                                                </div>
                                                </div>
                                                <div className="ms-3">
                                                <h5>{numberOfProducts}</h5>
                                                <small className="mb-0">Products</small>
                                                </div>
                                            </div>
                                            <div className="d-flex align-itmes-center">
                                                <div>
                                                <div className="p-3 mb-2 rounded bg-soft-info">
                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z" fill="currentColor"></path>                                            
                                                    </svg>                                        
                                                </div>
                                                </div>
                                                <div className="ms-3">
                                                <h5>{numberOfOrders}</h5>
                                                <small className="mb-0">Order Served</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex-wrap d-flex justify-content-between">
                                                <h2 className="mb-2">ETB : {totalSales}</h2>
                                                <div>
                                                <span className="badge bg-success rounded-pill">2023</span>
                                                </div>
                                            </div>
                                            <p className="text-info">Life time sales</p>
                                        </div>
                                        {/* <div className="grid-cols-2 d-grid gap">
                                            <button className="btn btn-primary text-uppercase">SUMMARY</button>
                                            <button className="btn btn-info text-uppercase">ANALYTICS</button>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <div className="card" data-aos="fade-up" data-aos-delay="500">
                                    <div className="text-center card-body d-flex justify-content-around">
                                        <div>
                                            <h2 className="mb-2">750<small>K</small></h2>
                                            <p className="mb-0 text-secondary">Website Visitors</p>
                                        </div>
                                        <hr className="hr-vertial"/>
                                        <div>
                                            <h2 className="mb-2">7,500</h2>
                                            <p className="mb-0 text-secondary">New Customers</p>
                                        </div>
                                    </div>
                                </div>  */}
                            </Col>
                           
                        </Row>
                    </Col> 
                </Row>
            </>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(Index)
