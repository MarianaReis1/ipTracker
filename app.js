const ip = document.getElementById('ipAdress');
const loc = document.getElementById('location');
const timeZone = document.getElementById('timeZone');
const isp = document.getElementById('isp');


//------------------Getting Info from Ipa------------------------------------

function filterInputStr () {
    const str = document.getElementById('inputStr').value;
    const urlIdentifiers = str.includes("www") || str.includes(".co") || str.includes(".io");
    
    if(urlIdentifiers){
        let newDomain = "domain=" + str;
        console.log(newDomain);
        return newDomain;
    } else {
        let newIp = "ipAddress=" + str;
        console.log(newIp);
        return newIp;
    }
}

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET", 
        "https://geo.ipify.org/api/v1?apiKey=at_NcwstU2bpupbUw3lHHIUPNFu17i6H&" 
            + 
        filterInputStr(), 
        true,
        );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText);
            displayData(obj);
            newMap(obj);
        };
    }
};


//------------------Displaying Data on Content-Box and on Map------------------------------------


function displayData(obj) {
    ip.innerText = obj.ip;
    loc.innerHTML = "<p>" + obj.location.city + ", " + obj.location.region + "<br>" + obj.location.postalCode + ", " + obj.location.country;
    timeZone.innerText = "UTC " + obj.location.timezone;
    isp.innerText = obj.isp;  

    return obj;
};


//----------------------Displaying MAP------------------------------------

//---------first latlng displayed----------
let mymap = new L.map('mapid').setView([51, 9], 13);
let marker = L.marker([51,9]).addTo(mymap);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: '<div class="attribution">Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a><a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a></div>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFyaWFuYXJlaXMiLCJhIjoiY2tlazl5azJtMjE1MTJ6b3lqOXl2NjlsYSJ9.09WY7yDqG2Q--Zi-v_xzJg'
}).addTo(mymap);


function newMap(obj) {
    
    const lat = obj.location.lat;
    const lng = obj.location.lng;
    
    mymap.setView([lat, lng], 13);
    marker.remove(mymap);
    let newMarker = L.marker([lat, lng]).addTo(mymap);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFyaWFuYXJlaXMiLCJhIjoiY2tlazl5azJtMjE1MTJ6b3lqOXl2NjlsYSJ9.09WY7yDqG2Q--Zi-v_xzJg'
    }).addTo(mymap);

};