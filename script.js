
var xmlhttp = new XMLHttpRequest();
var url = "https://my.api.mockaroo.com/kino.json?key=40cbedd0";
var data = [];
var rawJSON = document.querySelector('#raw-json'); 



xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        rawJSON.innerHTML = this.responseText;
        displayData(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function displayData(arr) {
    data = arr;
    let columns = ["nr", "imie", "nazwisko", "wiek", "data", "zakupionych_biletow", "gatunek", "plec"];
    console.log(arr);
    let tableSource = "<tr>";
    columns.forEach(function(category){
        tableSource += "<th>" + category + "</th>";
    });
    tableSource += "</tr>";
    for (let x=0; x<100; x++) {
    tableSource += "<tr>"
        columns.forEach(function(category){
        tableSource += "<th>" + arr[x][category] + "</th>";
        });
    tableSource += "</tr>";
    }
    document.getElementById("json-table").innerHTML = tableSource;

    let dataArray = [];

    for (let x=0; x<100; x++) {
        dataArray.push(arr[x]);
    }

    var genreAnalisys = Object();
    let genresList = []
    
    dataArray.forEach(element => {
        let genre = element["gatunek"];
        if(!genresList.includes(genre)){
            genresList.push(genre);
        };

    genresList.forEach(
        searchedGenre => {
            let count = 0;
            dataArray.forEach(element => {
                if (element["gatunek"] == searchedGenre) {
                    count++;
                }
            });
            genreAnalisys[searchedGenre] = count;
        });
    });


    var genreSeriesList = []
    genresList.forEach(genre => {
        genreSeriesList.push(genreAnalisys[genre]);
    })

    var genreOptions = {
        series: genreSeriesList,
        chart: {
        type: 'donut',
        height: '400px',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 75
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
        labels: genresList
      };

    var gendersAnalisys = Object();
    let gendersList = []

    dataArray.forEach(element => {
        let gender = element["plec"];
        if(!gendersList.includes(gender)){
            gendersList.push(gender);
        };

        gendersList.forEach(
        searchedGender => {
            let count = 0;
            dataArray.forEach(element => {
                if (element["plec"] == searchedGender) {
                    count++;
                }
            });
            gendersAnalisys[searchedGender] = count;
        });
    });

    let gendersSeriesOptions = []
    gendersList.forEach((gender) => {
        gendersSeriesOptions.push({
            name: gender,
            data: [gendersAnalisys[gender]]
        });
    });

    
      
    var genderOptions = {
        series: gendersSeriesOptions,
        chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
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
        categories: ['Gender'],
      },
      yaxis: {
        title: {
          text: 'People count'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " person(s)"
          }
        }
      }
      };

      var genderChart = new ApexCharts(document.querySelector("#gender-chart"), genderOptions);
      var genreChart = new ApexCharts(document.querySelector("#genre-chart"), genreOptions);

      genderChart.render();
      genreChart.render();
    
    

}