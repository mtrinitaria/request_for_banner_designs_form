<?php

$hostname_db = "localhost";
$database_db = "mykhel_jotform";
$username_db = "mykhel_jotform";
$password_db = "h.RRzW]#@q@R";

$db = mysql_pconnect($hostname_db, $username_db, $password_db) or trigger_error(mysql_error(),E_USER_ERROR); 

$db_found = mysql_select_db($database_db, $db);
if ($db_found) {

//print "Database Found " . $db;

}
else {

print "Database NOT Found " . $db;

}
?>



