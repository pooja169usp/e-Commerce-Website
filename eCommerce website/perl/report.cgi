#!/usr/bin/perl
#Guggari, Pooja Maheshwar. 
#Class Account# jadrn017 
#Fall 2017
use DBI;



print <<END_HTML;
Content-type: text/html

<!DOCTYPE html>
<html>
<head>

 
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="footer, address, phone, icons" />
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">

    <title>Sales Report</title>
    <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn000/modal_dialog/ui/css/trontastic/jquery-ui-1.10.4.custom.css">
    <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn017/proj4/mycss.css" />
    <link rel="shortcut icon" href="choco.png" />
    <script src="http://jadran.sdsu.edu/~jadrn000/modal_dialog/ui/js/jquery-1.10.2.js"></script>
    <script src="http://jadran.sdsu.edu/~jadrn000/modal_dialog/ui/js/jquery-ui-1.10.4.custom.js"></script>
</head>

<body id="salesrep">
		<div>
    <ul>
      <li>
      <h3 id="sales"> SALES REPORT </h3>
      <table class ="displaysales">
        <tr>
          <th>SKU</th>
          <th>Total Sales</th>
          <th>Retail Price</th>
          <th>Total Retail</th>
          <th>Total Profit</th>
        </tr>
END_HTML


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn017";
my $username = "jadrn017";
my $password = "leaf";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

my $sth = $dbh->prepare('SELECT s.sku, SUM(s.quantity), p.cost, p.retail, ROUND(SUM(s.quantity)*p.retail, 2), ROUND((SUM(s.quantity)*p.retail - SUM(s.quantity)*p.cost), 2) FROM jadrn017.sales s, proj4.products p WHERE s.sku = p.sku GROUP BY s.sku ORDER BY s.sku;');
$sth->execute();

my $sales = 0;
my $cost = 0;
my $retail = 0;
my $profit = 0;

while(my @row=$sth->fetchrow_array()) {
    print "<tr>";
    print "<td>".$row[0]."</td>";
    print "<td>".$row[1]."</td>";
    print "<td>&dollar;".$row[3]."</td>";
    print "<td>&dollar;".$row[4]."</td>";
    print "<td>&dollar;".$row[5]."</td>";
    print "</tr>";
    $sales += $row[1];
    $retail += $row[4];
    $profit += $row[5];
}
$sth->finish();
$dbh->disconnect();

print "</li>";
print "</table>";
print "<li><table class='overall'><tr><td><p class='salesdisplay'>Overall Sales: ".$sales."</p></td></tr><br/><tr><td><p class='salesdisplay'>Overall Profit: &dollar;".$profit."</p></td></tr></li>";
print "</ul></div>";
print "</body>";
print "</html>";