// maaike

$("#on-maaike").click(function(){
    $.get("http://www.maaikehek.nl/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
    });
});
$("#off-maaike").click(function(){
    $.get("http://www.maaikehek.nl/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
    });
});

// leander

$("#on-robert").click(function(){
    $.get("http://robertspier.nl/hva/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
    });
});
$("#off-robert").click(function(){
    $.get("http://robertspier.nl/hva/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
    });
});

// linda

$("#on-linda").click(function(){
    $.get("http://lindavandijkdesign.nl/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
        console.log(data + status)
    });
});
$("#off-linda").click(function(){
    $.get("http://lindavandijkdesign.nl/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
        console.log(data + status)
    });
});

// all

$("#on-all").click(function(){
    $.get("http://lindavandijkdesign.nl/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
        console.log(data + status)
    });
    $.get("http://www.maaikehek.nl/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
    });
    $.get("http://caffeine-works.nl/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
    });
    $.get("http://robertspier.nl/hva/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
    });
    $.get("http://www.maaikehek.nl/iot/index.php",
    {
        light: "on"
    },
    function(data, status){
    });

});
$("#off-all").click(function(){
    $.get("http://lindavandijkdesign.nl/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
        console.log(data + status)
    });
    $.get("http://www.maaikehek.nl/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
    });
    $.get("http://caffeine-works.nl/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
    });
    $.get("http://robertspier.nl/hva/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
    });
    $.get("http://www.maaikehek.nl/iot/index.php",
    {
        light: "off"
    },
    function(data, status){
    });
});