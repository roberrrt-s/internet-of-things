<?php  
$light = $_GET['light'];
if($light == "on") {  
  $file = fopen("lampje.txt", "w") or die("can't open file");
  fwrite($file, 'on');
  fclose($file);
} 
else if ($light == "off") {  
  $file = fopen("lampje.txt", "w") or die("can't open file");
  fwrite($file, 'off');
  fclose($file);
}
?>

<html>
    <head>
        <style>
            body {
                background-color: #2c3e50;
                background-image: -webkit-linear-gradient(top left, #1abc9c, #3498db 100%);
                background-image: -o-linear-gradient(top left, #1abc9c, #3498db 100%);
                background-image: linear-gradient(to bottom right, #1abc9c, #3498db 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                padding: 10em 0;
            }
            h1 {
                font-family: "Lato";
                color: white;
                width: 100vw;
                text-align: center;
            }
            .off, .on {
                border: none;
                border-bottom: 5px solid #ecf0f1;
                width: 10em;
                font-family: "Lato";
                font-size: 2em;
                background-color: white;
                border-radius: 10px;
                padding: .5em;
            }
            
            .on, .aOn {
                color: #2ecc71;
            }
            .off, .aOff {
                color: #e74c3c;
            }
            
            .on:focus {
                border-bottom: none;
                transform: translateY(5px);
            }
            .off:focus {
                border-bottom: none;
                transform: translateY(5px);
            }
            a {
                text-decoration: none;
                margin: .5em;
            }
            .turn {
                font-family: 'Lato';
                color: white;
                width: 100%;
                text-align: center;
            }
            button {
                margin: .5em;
                cursor: pointer;
            }

        </style>
    </head>
    <body>

    <div class="turn">  
        <?php
            if($light=="on") {
                echo("Turn LED on.");
            }
            else if ($light=="off") {
                echo("Turn LED off.");
            }
            else {
                echo ("Do something.");
            }
        ?>
    </div> 

    <h1>Turn the lights</h1>
    <div class="buttons">
        <div>
            <button id="off-maaike" class="off">click off maaike</button>
            <button id="on-maaike" class="on">click on maaike</button>
        </div>
    
        <div>
            <button id="off-leander" class="off">click off leander</button>
            <button id="on-leander" class="on">click on leander</button>
        </div>
    
        <div>
            <button id="off-linda" class="off">click off linda</button>
            <button id="on-linda" class="on">click on linda</button>
        </div>
    
        <div>
            <button id="off-robert" class="off"><a href="?light=off" class="aOff">click off robert</a></button>
            <button id="on-robert" class="on"><a href="?light=on" class="aOn">click on robert</a></button>
        </div>
        <div>
            <button id="off-all" class="off"><a href="?light=off" class="aOff">click off for all</a></button>
            <button id="on-all" class="on"><a href="?light=on" class="aOn">click on for all</a></button>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script src="xhr.js"></script>
 
    </body>
</html>