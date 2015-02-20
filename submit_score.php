<?php
    $score = $_POST["score"];
    $user = $_POST["user"];
    $scoreFile = file_get_contents("scores.txt");
    date_default_timezone_set("America/Denver");
    $time = date("g:i:s A e");
    $date = date("D, M j, Y");
    $scoreAddition = $score . "|" . $user . "|" . $time . "|" . $date . "\n\n" . $scoreFile;
    file_put_contents("scores.txt", $scoreAddition);
    echo "<script>window.location.assign('scores.txt');</script>";
?>
