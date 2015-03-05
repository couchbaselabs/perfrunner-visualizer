<html>
  <head>
    <title>SyncGateway Perf</title>
    <meta http-equiv="refresh" content="21600">
    <link rel="stylesheet" href="style.css" type="text/css" />
  </head>
  <body>
    <h2>Couchbase</h2>
    <div id="cubin"></div>
    <h2>GC Pauses</h2>
    <div id="cubinmem"></div>
  </body>
  <script type="text/javascript" src="jquery.min.js"></script>
  <script type="text/javascript" src="d3.v2.min.js"></script>
  <script type="text/javascript" src="cubism.v1.min.js"></script>
  <script type="text/javascript" src="seriesism.js"></script>
  <script type="text/javascript" src="series-bwafter.js"></script>
  <script type="text/javascript" charset="utf-8">
$(function() {
  drawCharts("#cubin", "#cubinmem");
});
  </script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-679821-11']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type =
    'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' :
    'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
  })();

</script>

</html>

