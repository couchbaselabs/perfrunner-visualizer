var seriesUrlBase = "http://172.23.97.100:3133/";

var detailStep = 1000 * 8;

function drawCharts(network, memory, latency, gateload) {
    d3.json(seriesUrlBase + "_all_dbs",
            function(data) {
                if (data) {
                    drawNetworkCharts(network, ["sync_gateway"/*,"sync_gateway2"*/]);
                    drawMemoryCharts(memory, ["sync_gateway"/*,"sync_gateway2"*/,"gateload_67"]);
                    drawGateloadCharts(gateload, ["gateload_67"/*,"gateload_67"*/]);
//                    drawNetworkCharts(network, ["sync_gateway","sync_gateway2"]);
//                    drawMemoryCharts(memory, ["sync_gateway","sync_gateway2"]);
//		    drawLatencyCharts(latency, ["sync_latency_100"]);
                }
            });
}

function drawNetworkCharts(here, nodes) {
    var things = [];
    var sets = [

        {p: "/cb/pools/172.23.96.64:11210/count", red: "c_avg", "lbl": "172.23.96.64:11210 pool count", cls: "count"},
        {p: "/cb/pools/172.23.96.64:11210/max", red: "avg", "lbl": "172.23.96.64:11210 pool max", cls: "max"},
        {p: "/cb/pools/172.23.96.64:11210/mean", red: "avg", "lbl": "172.23.96.64:11210 pool mean", cls: "mean"},
        {p: "/cb/pools/172.23.96.64:11210/p99", red: "avg", "lbl": "172.23.96.64:11210 pool p99", cls: "p99"},

        {p: "/cb/pools/172.23.96.65:11210/count", red: "c_avg", "lbl": "172.23.96.65:11210 pool count", cls: "count"},
        {p: "/cb/pools/172.23.96.65:11210/max", red: "avg", "lbl": "172.23.96.65:11210 pool max", cls: "max"},
        {p: "/cb/pools/172.23.96.65:11210/mean", red: "avg", "lbl": "172.23.96.65:11210 pool mean", cls: "mean"},
        {p: "/cb/pools/172.23.96.65:11210/p99", red: "avg", "lbl": "172.23.96.65:11210 pool p99", cls: "p99"},

        {p: "/cb/pools/172.23.96.66:11210/count", red: "c_avg", "lbl": "172.23.96.66:11210 pool count", cls: "count"},
        {p: "/cb/pools/172.23.96.66:11210/max", red: "avg", "lbl": "172.23.96.66:11210 pool max", cls: "max"},
        {p: "/cb/pools/172.23.96.66:11210/mean", red: "avg", "lbl": "172.23.96.66:11210 pool mean", cls: "mean"},
        {p: "/cb/pools/172.23.96.66:11210/p99", red: "avg", "lbl": "172.23.96.66:11210 pool p99", cls: "p99"},


        {p: "/mc/tap/bytes/total", red: "c_avg", "lbl": "tap total bytes", cls: "count"},
        {p: "/mc/recv/bytes/total", red: "c_avg", "lbl": "recv total bytes", cls: "count"},
        {p: "/mc/recv/bytes/GET", red: "c_avg", "lbl": "recv GET bytes", cls: "count"},
        {p: "/mc/xmit/bytes/total", red: "c_avg", "lbl": "xmit total bytes", cls: "count"},

        {p: "/syncGateway_httpListener/max_wait", red: "max", "lbl": "http listener max wait", cls: "count"},
        {p: "/syncGateway_httpListener/max_active", red: "max", "lbl": "http listener max active", cls: "count"},

        {p: "/syncGateway_changeCache/view_queries", red: "c_avg", "lbl": "change cache view queries", cls: "count"},
        {p: "/syncGateway_changeCache/outOfOrder", red: "c_avg", "lbl": "out of order sequences posted", cls: "count"},
        {p: "/syncGateway_changeCache/maxPending", red: "max", "lbl": "max number of sequences waiting on a missing earlier sequence number", cls: "count"},


        {p: "/syncGateway_db/channelChangesFeeds", red: "c_avg", "lbl": "channel change feed rate", cls: "count"},
/*
        {p: "/syncGateway_db/channelLogAdds", red: "c_avg", "lbl": "channel log add rate", cls: "count"},
        {p: "/syncGateway_db/channelLogAppends", red: "c_avg", "lbl": "channel log append rate", cls: "count"},
        {p: "/syncGateway_db/channelLogCacheHits", red: "c_avg", "lbl": "channel log cache hit rate", cls: "count"},
        {p: "/syncGateway_db/channelLogCacheMisses", red: "c_avg", "lbl": "channel log cache miss rate", cls: "count"},
        {p: "/syncGateway_db/channelLogRewrites", red: "c_avg", "lbl": "channel log rewrite rate", cls: "count"},
        {p: "/syncGateway_db/channelLogRewriteCollisions", red: "c_avg", "lbl": "channel log rewrite collision rate", cls: "count"},
*/
        {p: "/syncGateway_db/document_gets", red: "c_avg", "lbl": "document get rate", cls: "count"},


        {p: "/syncGateway_db/revisionCache_adds", red: "c_avg", "lbl": "revision cache add rate", cls: "count"},
        {p: "/syncGateway_db/revisionCache_hits", red: "c_avg", "lbl": "revision cache hit rate", cls: "count"},
        {p: "/syncGateway_db/revisionCache_misses", red: "c_avg", "lbl": "revision cache miss rate", cls: "count"},
        {p: "/syncGateway_db/revs_added", red: "c_avg", "lbl": "revs add rate", cls: "count"},
        {p: "/syncGateway_db/sequence_gets", red: "c_avg", "lbl": "sequence get rate", cls: "count"},
        {p: "/syncGateway_db/sequence_reserves", red: "c_avg", "lbl": "sequence reserve rate", cls: "count"},

        {p: "/syncGateway_rest/requests_total", red: "c_avg", "lbl": "request total rate", cls: "count"},
        {p: "/syncGateway_rest/requests_active", red: "avg", "lbl": "request active count", cls: "count"},
        {p: "/syncGateway_rest/changesFeeds_total", red: "c_avg", "lbl": "changes feeds total rate", cls: "count"},
        {p: "/syncGateway_rest/changesFeeds_active", red: "avg", "lbl": "changes feeds active count", cls: "count"},

        {p: "/cb/ops/Incr/count", red: "c_avg", "lbl": "172.23.96.64:11210 Incr count", cls: "count"},
        {p: "/cb/ops/Incr/max", red: "avg", "lbl": "172.23.96.64:11210 Incr max", cls: "max"},
        {p: "/cb/ops/Incr/mean", red: "avg", "lbl": "172.23.96.64:11210 Incr mean", cls: "mean"},
        {p: "/cb/ops/Incr/p99", red: "avg", "lbl": "172.23.96.64:11210 Incr p99", cls: "p99"},

        {p: "/cb/ops/GetsRaw/count", red: "c_avg", "lbl": "172.23.96.65:11210 GetsRaw count", cls: "count"},
        {p: "/cb/ops/GetsRaw/max", red: "avg", "lbl": "172.23.96.65:11210 GetsRaw max", cls: "max"},
        {p: "/cb/ops/GetsRaw/mean", red: "avg", "lbl": "172.23.96.65:11210 GetsRaw mean", cls: "mean"},
        {p: "/cb/ops/GetsRaw/p99", red: "avg", "lbl": "172.23.96.65:11210 GetsRaw p99", cls: "p99"},

        {p: "/cb/ops/casNext/count", red: "c_avg", "lbl": "172.23.96.66:11210 casNext count", cls: "count"},
        {p: "/cb/ops/casNext/max", red: "avg", "lbl": "172.23.96.66:11210 casNext max", cls: "max"},
        {p: "/cb/ops/casNext/mean", red: "avg", "lbl": "172.23.96.66:11210 casNext mean", cls: "mean"},
        {p: "/cb/ops/casNext/p99", red: "avg", "lbl": "172.23.96.66:11210 casNext p99", cls: "p99"},

/*
        {p: "/cb/ops/Write(raw)/count", red: "c_avg", "lbl": "172.23.96.66:11210 Write(raw) count", cls: "count"},
        {p: "/cb/ops/Write(raw)/max", red: "avg", "lbl": "172.23.96.66:11210 Write(raw) max", cls: "max"},
        {p: "/cb/ops/Write(raw)/mean", red: "avg", "lbl": "172.23.96.66:11210 Write(raw) mean", cls: "mean"},
        {p: "/cb/ops/Write(raw)/p99", red: "avg", "lbl": "172.23.96.66:11210 Write(raw) p99", cls: "p99"},

        {p: "/cb/ops/Write(0x0)/count", red: "c_avg", "lbl": "172.23.96.66:11210 Write(0x0) count", cls: "count"},
        {p: "/cb/ops/Write(0x0)/max", red: "avg", "lbl": "172.23.96.66:11210 Write(0x0) max", cls: "max"},
        {p: "/cb/ops/Write(0x0)/mean", red: "avg", "lbl": "172.23.96.66:11210 Write(0x0) mean", cls: "mean"},
        {p: "/cb/ops/Write(0x0)/p99", red: "avg", "lbl": "172.23.96.66:11210 Write(0x0) p99", cls: "p99"},

        {p: "/cb/ops/Write(0x11)/count", red: "c_avg", "lbl": "172.23.96.66:11210 Write(0x11) count", cls: "count"},
        {p: "/cb/ops/Write(0x11)/max", red: "avg", "lbl": "172.23.96.66:11210 Write(0x11) max", cls: "max"},
        {p: "/cb/ops/Write(0x11)/mean", red: "avg", "lbl": "172.23.96.66:11210 Write(0x11) mean", cls: "mean"},
        {p: "/cb/ops/Write(0x11)/p99", red: "avg", "lbl": "172.23.96.66:11210 Write(0x11) p99", cls: "p99"},

        {p: "/cb/ops/Write(0x3)/count", red: "c_avg", "lbl": "172.23.96.66:11210 Write(0x3) count", cls: "count"},
        {p: "/cb/ops/Write(0x3)/max", red: "avg", "lbl": "172.23.96.66:11210 Write(0x3) max", cls: "max"},
        {p: "/cb/ops/Write(0x3)/mean", red: "avg", "lbl": "172.23.96.66:11210 Write(0x3) mean", cls: "mean"},
        {p: "/cb/ops/Write(0x3)/p99", red: "avg", "lbl": "172.23.96.66:11210 Write(0x3) p99", cls: "p99"},
*/

        {p: "/memstats/Alloc", red: "max",
         lbl: "alloc", cls: "alloc"}
    ];
    for (var si = 0; si < sets.length; si++) {
        var s = sets[si];
        var someClass = " first";
        for (var i = 0; i < nodes.length; i++) {
            things.push({db: nodes[i], p: s.p, red: s.red,
                         cls: s.lbl + someClass,
                         lbl: nodes[i] + " " + s.lbl});
            someClass = "";
        }
        things[things.length-1].cls += " last";
    }

    var context = seriesly.context()
        .step(detailStep)
        .size(window.innerWidth);

    d3.select(here).selectAll(".axis")
        .data(['top'])
        .enter().append("div")
        .attr("class", function(d) { return d + " axis"; })
        .each(function(d) {
            d3.select(this).call(context.axis()
                                 .ticks(12)
                                 .focusFormat(d3.time.format("%m-%d %H:%M"))
                                 .orient(d));
        });

    d3.select(here).append("div")
        .attr("class", "rule")
        .call(context.rule());

    context.on("focus", function(i) {
        d3.selectAll(".value")
            .style("right", i == null ? null : context.size() - i + "px");
    });

    var sr = context.seriesly(seriesUrlBase);

    d3.select(here).selectAll(".horizon")
        .data(things.map(function(x) {
            return sr.metric(x.db, x.p, x.red, x.lbl);
        }))
      .enter().insert("div", ".bottom")
        .attr("class", function(d, i) { return "horizon " + things[i].cls; })
        .call(context.horizon().height(30).format(d3.format(".1s")));
}

function drawMemoryCharts(here, nodes) {
    var things = [];
    var sets = [
        {p: "/memstats/PauseTotalNs", red: "c_max",
         lbl: "", cls: "gcpause"}
    ];
    for (var si = 0; si < sets.length; si++) {
        var s = sets[si];
        var someClass = " first";
        for (var i = 0; i < nodes.length; i++) {
            things.push({db: nodes[i], p: s.p, red: s.red,
                         cls: s.lbl + someClass,
                         lbl: nodes[i] + " " + s.lbl});
            someClass = "";
        }
        things[things.length-1].cls += " last";
    }

    var context = seriesly.context()
        .step(detailStep)
        .size(window.innerWidth);

    d3.select(here).selectAll(".axis")
        .data(['top'])
        .enter().append("div")
        .attr("class", function(d) { return d + " axis"; })
        .each(function(d) {
            d3.select(this).call(context.axis()
                                 .ticks(12)
                                 .focusFormat(d3.time.format("%m-%d %H:%M"))
                                 .orient(d));
        });

    d3.select(here).append("div")
        .attr("class", "rule")
        .call(context.rule());

    context.on("focus", function(i) {
        d3.selectAll(".value")
            .style("right", i == null ? null : context.size() - i + "px");
    });

    var sr = context.seriesly(seriesUrlBase);

    d3.select(here).selectAll(".horizon")
        .data(things.map(function(x) {
            var rv = sr.metric(x.db, x.p, x.red, x.lbl).divide(1e9);
            rv.toString = function() {
                return x.lbl;
            };
            return rv;
        }))
      .enter().insert("div", ".bottom")
        .attr("class", function(d, i) { return "horizon " + things[i].cls; })
        .call(context.horizon()
            .height(30)
            .colors(['#fff', '#fff', '#fff', '#f99', '#fcc', '#f00'])
            .format(function(x) {
                return d3.format(".1s")(x) + "s";
            }));
}

function drawLatencyCharts(here, nodes) {
    var things = [];
    var sets = [
        {p: "/gateway_push", red: "avg",
         lbl: "push avg", cls: "push avg"},
        {p: "/gateway_push", red: "max",
         lbl: "push max", cls: "push max"},
        {p: "/gateway_pull", red: "avg",
         lbl: "pull avg", cls: "pull avg"},
        {p: "/gateway_pull", red: "max",
         lbl: "pull max", cls: "pull max"}
    ];
    for (var si = 0; si < sets.length; si++) {
        var s = sets[si];
        var someClass = " first";
        for (var i = 0; i < nodes.length; i++) {
            things.push({db: nodes[i], p: s.p, red: s.red,
                         cls: s.lbl + someClass,
                         lbl: nodes[i] + " " + s.lbl});
            someClass = "";
        }
        things[things.length-1].cls += " last";
    }

    var context = seriesly.context()
        .step(detailStep)
        .size(window.innerWidth);

    d3.select(here).selectAll(".axis")
        .data(['top'])
        .enter().append("div")
        .attr("class", function(d) { return d + " axis"; })
        .each(function(d) {
            d3.select(this).call(context.axis()
                                 .ticks(12)
                                 .focusFormat(d3.time.format("%m-%d %H:%M"))
                                 .orient(d));
        });

    d3.select(here).append("div")
        .attr("class", "rule")
        .call(context.rule());

    context.on("focus", function(i) {
        d3.selectAll(".value")
            .style("right", i == null ? null : context.size() - i + "px");
    });

    var sr = context.seriesly(seriesUrlBase);

    d3.select(here).selectAll(".horizon")
        .data(things.map(function(x) {
            var rv = sr.metric(x.db, x.p, x.red, x.lbl).divide(1e3);
            rv.toString = function() {
                return x.lbl;
            };
            return rv;
        }))
      .enter().insert("div", ".bottom")
        .attr("class", function(d, i) { return "horizon " + things[i].cls; })
        .call(context.horizon()
            .height(30)
            .colors(['#fff', '#fff', '#fff', '#f99', '#fcc', '#f00'])
            .format(function(x) {
                return d3.format(".1s")(x) + "s";
            }));
}

function drawGateloadCharts(here, nodes) {
    var things = [];
    var sets = [
        {p: "/gateload/user_active", red: "max",
         lbl: "users active", cls: "users active"},

        {p: "/gateload/user_awake", red: "max",
         lbl: "users awake", cls: "users awake"},

/*tmp location*/
{p: "/gateload/ops/GetSingle/max", red: "avg", "lbl": "GetSingle max", cls: "max"},
{p: "/gateload/ops/SaveCheckpoint/max", red: "avg", "lbl": "SaveCheckpoint max", cls: "max"},
{p: "/gateload/ops/PostRevsDiff/max", red: "avg", "lbl": "PostRevsDiff max", cls: "max"},
{p: "/gateload/ops/PostBulkDocs/max", red: "avg", "lbl": "PostBulkDocs max", cls: "max"},
{p: "/gateload/ops/GetBulkDocs/max", red: "avg", "lbl": "GetBulkDocs max", cls: "max"},

/*
        {p: "/gateload/ops/AddUser/count", red: "c_avg", "lbl": "AddUser count", cls: "count"},
        {p: "/gateload/ops/AddUser/max", red: "avg", "lbl": "AddUser max", cls: "max"},
        {p: "/gateload/ops/AddUser/mean", red: "avg", "lbl": "AddUser mean", cls: "mean"},
        {p: "/gateload/ops/AddUser/p99", red: "avg", "lbl": "AddUser p99", cls: "p99"},
*/
        {p: "/gateload/ops/GetLastSeq/count", red: "c_avg", "lbl": "GetLastSeq count", cls: "count"},
	{p: "/gateload/ops/GetLastSeqErrors/count", red: "max", "lbl": "GetLastSeq error count", cls: "count"},
        {p: "/gateload/ops/GetLastSeq/max", red: "avg", "lbl": "GetLastSeq max", cls: "max"},
        {p: "/gateload/ops/GetLastSeq/mean", red: "avg", "lbl": "GetLastSeq mean", cls: "mean"},
        {p: "/gateload/ops/GetLastSeq/p99", red: "avg", "lbl": "GetLastSeq p99", cls: "p99"},

        {p: "/gateload/ops/GetSingle/count", red: "c_avg", "lbl": "GetSingle count", cls: "count"},
        {p: "/gateload/ops/GetSingleErrors/count", red: "max", "lbl": "GetSingle error count", cls: "count"},
        {p: "/gateload/ops/GetSingle/max", red: "avg", "lbl": "GetSingle max", cls: "max"},
        {p: "/gateload/ops/GetSingle/mean", red: "avg", "lbl": "GetSingle mean", cls: "mean"},
        {p: "/gateload/ops/GetSingle/p99", red: "avg", "lbl": "GetSingle p99", cls: "p99"},

        {p: "/gateload/ops/SaveCheckpoint/count", red: "c_avg", "lbl": "SaveCheckpoint count", cls: "count"},
        {p: "/gateload/ops/SaveCheckpointErrors/count", red: "max", "lbl": "SaveCheckpoint error count", cls: "count"},
        {p: "/gateload/ops/SaveCheckpoint/max", red: "avg", "lbl": "SaveCheckpoint max", cls: "max"},
        {p: "/gateload/ops/SaveCheckpoint/mean", red: "avg", "lbl": "SaveCheckpoint mean", cls: "mean"},
        {p: "/gateload/ops/SaveCheckpoint/p99", red: "avg", "lbl": "SaveCheckpoint p99", cls: "p99"},
/*
        {p: "/gateload/ops/CreateSession/count", red: "c_avg", "lbl": "CreateSession count", cls: "count"},
        {p: "/gateload/ops/CreateSession/max", red: "avg", "lbl": "CreateSession max", cls: "max"},
        {p: "/gateload/ops/CreateSession/mean", red: "avg", "lbl": "CreateSession mean", cls: "mean"},
        {p: "/gateload/ops/CreateSession/p99", red: "avg", "lbl": "CreateSession p99", cls: "p99"},
*/

        {p: "/gateload/ops/PostRevsDiff/count", red: "c_avg", "lbl": "PostRevsDiff count", cls: "count"},
	{p: "/gateload/ops/PostRevsDiffErrors/count", red: "max", "lbl": "PostRevsDiff error count", cls: "count"},
        {p: "/gateload/ops/PostRevsDiff/max", red: "avg", "lbl": "PostRevsDiff max", cls: "max"},
        {p: "/gateload/ops/PostRevsDiff/mean", red: "avg", "lbl": "PostRevsDiff mean", cls: "mean"},
        {p: "/gateload/ops/PostRevsDiff/p99", red: "avg", "lbl": "PostRevsDiff p99", cls: "p99"},

        {p: "/gateload/ops/PostBulkDocs/count", red: "c_avg", "lbl": "PostBulkDocs count", cls: "count"},
        {p: "/gateload/ops/PostBulkDocsErrors/count", red: "max", "lbl": "PostBulkDocs error count", cls: "count"},
        {p: "/gateload/ops/PostBulkDocs/max", red: "avg", "lbl": "PostBulkDocs max", cls: "max"},
        {p: "/gateload/ops/PostBulkDocs/mean", red: "avg", "lbl": "PostBulkDocs mean", cls: "mean"},
        {p: "/gateload/ops/PostBulkDocs/p99", red: "avg", "lbl": "PostBulkDocs p99", cls: "p99"},

        {p: "/gateload/ops/PushToSubscriberBackfill/count", red: "c_avg", "lbl": "PushToSubscriberBackfill count", cls: "count"},
        {p: "/gateload/ops/PushToSubscriberBackfill/max", red: "avg", "lbl": "PushToSubscriberBackfill max", cls: "max"},
        {p: "/gateload/ops/PushToSubscriberBackfill/mean", red: "avg", "lbl": "PushToSubscriberBackfill mean", cls: "mean"},
        {p: "/gateload/ops/PushToSubscriberBackfill/p95", red: "avg", "lbl": "PushToSubscriberBackfill p95", cls: "p95"},

        {p: "/gateload/ops/PushToSubscriberInteractive/count", red: "c_avg", "lbl": "PushToSubscriberInteractive count", cls: "count"},
        {p: "/gateload/ops/PushToSubscriberInteractive/max", red: "avg", "lbl": "PushToSubscriberInteractive max", cls: "max"},
        {p: "/gateload/ops/PushToSubscriberInteractive/mean", red: "avg", "lbl": "PushToSubscriberInteractive mean", cls: "mean"},
        {p: "/gateload/ops/PushToSubscriberInteractive/p95", red: "avg", "lbl": "PushToSubscriberInteractive p95", cls: "p95"},

        {p: "/gateload/ops/GetBulkDocs/count", red: "c_avg", "lbl": "GetBulkDocs count", cls: "count"},
	{p: "/gateload/ops/GetBulkDocsErrors/count", red: "max", "lbl": "GetBulkDocs error count", cls: "count"},
        {p: "/gateload/ops/GetBulkDocs/max", red: "avg", "lbl": "GetBulkDocs max", cls: "max"},
        {p: "/gateload/ops/GetBulkDocs/mean", red: "avg", "lbl": "GetBulkDocs mean", cls: "mean"},
        {p: "/gateload/ops/GetBulkDocs/p99", red: "avg", "lbl": "GetBulkDocs p99", cls: "p99"},

        {p: "/memstats/Alloc", red: "max",
         lbl: "alloc", cls: "alloc"}
    ];
    for (var si = 0; si < sets.length; si++) {
        var s = sets[si];
        var someClass = " first";
        for (var i = 0; i < nodes.length; i++) {
            things.push({db: nodes[i], p: s.p, red: s.red,
                         cls: s.lbl + someClass,
                         lbl: nodes[i] + " " + s.lbl});
            someClass = "";
        }
        things[things.length-1].cls += " last";
    }

    var context = seriesly.context()
        .step(detailStep)
        .size(window.innerWidth);

    d3.select(here).selectAll(".axis")
        .data(['top'])
        .enter().append("div")
        .attr("class", function(d) { return d + " axis"; })
        .each(function(d) {
            d3.select(this).call(context.axis()
                                 .ticks(12)
                                 .focusFormat(d3.time.format("%m-%d %H:%M"))
                                 .orient(d));
        });

    d3.select(here).append("div")
        .attr("class", "rule")
        .call(context.rule());

    context.on("focus", function(i) {
        d3.selectAll(".value")
            .style("right", i == null ? null : context.size() - i + "px");
    });

    var sr = context.seriesly(seriesUrlBase);

    d3.select(here).selectAll(".horizon")
        .data(things.map(function(x) {
            return sr.metric(x.db, x.p, x.red, x.lbl);
        }))
      .enter().insert("div", ".bottom")
        .attr("class", function(d, i) { return "horizon " + things[i].cls; })
        .call(context.horizon().height(30).format(d3.format(".1s")));
}
