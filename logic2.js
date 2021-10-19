let url = 'fires_clean2.csv';
let paleoUrl = 'PALEO-texas.json';
let spiUrl = 'SPI-texas.json';
let usdmUrl = 'USDM-texas.json';

let selectM = d3.select('.mapContainer');

function optionChanged(sel) {
    $('#map').remove();
    selectM.append('div').attr('id', 'map');

    let myMap = L.map('map', {
        center: [31.53, -99.65],
        zoom: 6,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    let legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
        let div = L.DomUtil.create("div", "info legend");
        let legendInfo = "<p>Class</p>" +
            "<div class=\"labels\">" +
            "</div>";
        div.innerHTML = legendInfo;
        let categories = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        let colors = ['#a3f600', '#dcf400', '#f7db11', '#fdb72a', '#fca35d', '#ff5f65', '#ff020c'];
        let labels = [];
        categories.forEach((a, index) => {
            labels.push("<li><div style=\"background-color: " + colors[index] + "\"></div>&nbsp;&nbsp;" + categories[index] + "</li>");
        });
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };
    legend.addTo(myMap);


    d3.csv(url).then(data => {
        // console.log(data);

        for (let i = 0; i < data.length; i++) {
            let location = [data[i].LATITUDE, data[i].LONGITUDE];
            let year = data[i].FIRE_YEAR;
            let fireSize = data[i].FIRE_SIZE;
            let fireSizeClass = data[i].FIRE_SIZE_CLASS;
            let cause = data[i].STAT_CAUSE_DESCR;
            let color = '';
            if (fireSizeClass == 'A') {
                color = '#a3f600';
            } else if (fireSizeClass == 'B') {
                color = '#dcf400';
            } else if (fireSizeClass == 'C') {
                color = '#f7db11';
            } else if (fireSizeClass == 'D') {
                color = '#fdb72a';
            } else if (fireSizeClass == 'E') {
                color = '#fca35d';
            } else if (fireSizeClass == 'F') {
                color = '#ff5f65';
            } else {
                color = '#ff020c';
            }
            if (year == sel) {
                L.circle(location, {
                    fillOpacity: .5,
                    color: color,
                    fillColor: color,
                    radius: fireSize / 640
                }).bindPopup(`<h3>${cause}</h3><hr><p>
                <b>Fire Size Class:</b> ${fireSizeClass}<br/><b>Fire Size:</b> ${fireSize} (Estimate of acres)<br/><b>Location:</b> ${location}</p>`).addTo(myMap);
            }
            if (cause == sel) {
                L.circle(location, {
                    fillOpacity: .5,
                    color: color,
                    fillColor: color,
                    radius: fireSize / 640
                }).bindPopup(`<h3>${cause}</h3><hr><p>
                <b>Fire Size Class:</b> ${fireSizeClass}<br/><b>Fire Size:</b> ${fireSize} (Estimate of acres)<br/><b>Location:</b> ${location}</p> ${year}`).addTo(myMap);
            }
        }
    });

}
optionChanged();



// const labels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
// ];
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First dataset',
//     backgroundColor: 'rgb(255, 99, 132)',
//     borderColor: 'rgb(255, 99, 132)',
//     data: [0, 10, 5, 2, 20, 30, 45],
// }]
// };
// const config = {
//     type: 'line',
//     data: data,
//     options: {}
// };
// let myChart = new Chart(
//     document.getElementById('myChart'),
//     config
// );


// {"D0":7.8,"D1":0.4,"D2":0,"D3":0,"D4":0,"-9":0,"W0":62.3,"W1":38.5,"W2":11.1,"W3":0.8,"W4":0}

// d3.json(paleoUrl).then(data => {
//     console.log(data);
//     let newData = [];
//     let labels = [];
//     let d0 = [];
//     let d1 = [];
//     let d2 = [];
//     let d3 = [];
//     let d4 = [];
//     let w0 = [];
//     let w1 = [];
//     let w2 = [];
//     let w3 = [];
//     let w4 = [];
//     for (let a=1320;a<1452;a++) {
//         newData.push(data[a]);
//         labels.push(data[a].MapDate);
//         d0.push(data[a].D0);
//         d1.push(data[a].D1);
//         d2.push(data[a].D2);
//         d3.push(data[a].D3);
//         d4.push(data[a].D4);
//         w0.push(data[a].W0);
//         w1.push(data[a].W1);
//         w2.push(data[a].W2);
//         w3.push(data[a].W3);
//         w4.push(data[a].W4);
//     }
//     console.log(d0);

//     const mapData = {
//         labels: labels,
//         datasets: [{
//           label: 'Abnormally Dry',
//           backgroundColor: 'rgb(253, 255, 0)',
//           data: d0,
//     },
//     {
//         label: 'Moderate Drought',
//         backgroundColor: 'rgb(255, 204, 153)',
//         data: d1,
//     },
//     {
//         label: 'Severe Drought',
//         backgroundColor: 'rgb(255, 102, 0)',
//         data: d2,
//     },
//     {
//         label: 'Extreme Drought',
//         backgroundColor: 'rgb(255, 0, 0)',
//         data: d3,
//     },
//     {
//         label: 'Exceptional Drought',
//         backgroundColor: 'rgb(102, 0, 0)',
//         data: d4,
//     }
//     ]
//     };
//     const config = {
//         type: 'bar',
//         data: mapData,
//         options: {
//           plugins: {
//             title: {
//               display: true,
//               text: 'Drought in Texas from 2005-2015'
//             },
//           },
//           responsive: true,
//         }
//     };
//     let myChart = new Chart(
//           document.getElementById('myChart'),
//           config
//     );

//     const mapData2 = {
//         labels: labels,
//         datasets: [{
//           label: 'Abnormally Wet',
//           backgroundColor: 'rgb(170, 255, 85)',
//           data: w0,
//     },
//     {
//         label: 'Moderate Wet',
//         backgroundColor: 'rgb(1, 255, 255)',
//         data: w1,
//     },
//     {
//         label: 'Severe Wet',
//         backgroundColor: 'rgb(0, 170, 255)',
//         data: w2,
//     },
//     {
//         label: 'Extreme Wet',
//         backgroundColor: 'rgb(0, 0, 255)',
//         data: w3,
//     },
//     {
//         label: 'Exceptional Wet',
//         backgroundColor: 'rgb(0, 0, 170)',
//         data: w4,
//     }
//     ]
//       };
//     const config2 = {
//     type: 'bar',
//     data: mapData2,
//     options: {
//         plugins: {
//         title: {
//             display: true,
//             text: 'Moisture in Texas from 2005-2015'
//         },
//         },
//         responsive: true,
//     }
//     };
//     let myChart2 = new Chart(
//         document.getElementById('myChart2'),
//         config2
//     );
// });

d3.json(spiUrl).then(data => {
    console.log(data);
    let newData = [];
    let labels = [];
    let d0 = [];
    let d1 = [];
    let d2 = [];
    let d3 = [];
    let d4 = [];
    let w0 = [];
    let w1 = [];
    let w2 = [];
    let w3 = [];
    let w4 = [];
    for (let a = 1320; a < 1452; a++) {
        newData.push(data[a]);
        labels.push(data[a].DATE);
        d0.push(data[a].D0);
        d1.push(data[a].D1);
        d2.push(data[a].D2);
        d3.push(data[a].D3);
        d4.push(data[a].D4);
        w0.push(data[a].W0);
        w1.push(data[a].W1);
        w2.push(data[a].W2);
        w3.push(data[a].W3);
        w4.push(data[a].W4);
    }
    console.log(newData);

    const mapData = {
        labels: labels,
        datasets: [{
                label: 'Abnormally Dry',
                backgroundColor: 'rgb(253, 255, 0)',
                data: d0,
            },
            {
                label: 'Moderate Drought',
                backgroundColor: 'rgb(255, 204, 153)',
                data: d1,
            },
            {
                label: 'Severe Drought',
                backgroundColor: 'rgb(255, 102, 0)',
                data: d2,
            },
            {
                label: 'Extreme Drought',
                backgroundColor: 'rgb(255, 0, 0)',
                data: d3,
            },
            {
                label: 'Exceptional Drought',
                backgroundColor: 'rgb(102, 0, 0)',
                data: d4,
            }
        ]
    };
    const config = {
        type: 'bar',
        data: mapData,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Drought in Texas from 2005-2015'
                },
            },
            responsive: true,
        }
    };
    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    const mapData2 = {
        labels: labels,
        datasets: [{
                label: 'Abnormally Wet',
                backgroundColor: 'rgb(170, 255, 85)',
                data: w0,
            },
            {
                label: 'Moderate Wet',
                backgroundColor: 'rgb(1, 255, 255)',
                data: w1,
            },
            {
                label: 'Severe Wet',
                backgroundColor: 'rgb(0, 170, 255)',
                data: w2,
            },
            {
                label: 'Extreme Wet',
                backgroundColor: 'rgb(0, 0, 255)',
                data: w3,
            },
            {
                label: 'Exceptional Wet',
                backgroundColor: 'rgb(0, 0, 170)',
                data: w4,
            }
        ]
    };
    const config2 = {
        type: 'bar',
        data: mapData2,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Moisture in Texas from 2005-2015'
                },
            },
            responsive: true,
        }
    };
    let myChart2 = new Chart(
        document.getElementById('myChart2'),
        config2
    );
});

d3.json(usdmUrl).then(data => {
    // console.log(data);
    let newData = [];
    let labels = [];
    let d0 = [];
    let d1 = [];
    let d2 = [];
    let d3 = [];
    let d4 = [];
    let w0 = [];
    let w1 = [];
    let w2 = [];
    let w3 = [];
    let w4 = [];
    for (let a = 302; a < 876; a++) {
        newData.push(data[a]);
        labels.push(data[a].MapDate);
        d0.push(data[a].D0);
        d1.push(data[a].D1);
        d2.push(data[a].D2);
        d3.push(data[a].D3);
        d4.push(data[a].D4);
        w0.push(data[a].W0);
        w1.push(data[a].W1);
        w2.push(data[a].W2);
        w3.push(data[a].W3);
        w4.push(data[a].W4);
    }
    console.log(data[0]);

    const mapData3 = {
        labels: labels,
        datasets: [{
                label: 'Abnormally Dry',
                backgroundColor: 'rgb(253, 255, 0)',
                data: d0,
            },
            {
                label: 'Moderate Drought',
                backgroundColor: 'rgb(255, 204, 153)',
                data: d1,
            },
            {
                label: 'Severe Drought',
                backgroundColor: 'rgb(255, 102, 0)',
                data: d2,
            },
            {
                label: 'Extreme Drought',
                backgroundColor: 'rgb(255, 0, 0)',
                data: d3,
            },
            {
                label: 'Exceptional Drought',
                backgroundColor: 'rgb(102, 0, 0)',
                data: d4,
            }
        ]
    };
    const config = {
        type: 'bar',
        data: mapData3,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Drought in Texas from 2005-2015'
                },
            },
            responsive: true,
        }
    };
    let myChart3 = new Chart(
        document.getElementById('myChart3'),
        config
    );
});