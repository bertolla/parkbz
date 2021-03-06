'use strict';

/* Controllers */

function MobilityCtrl($scope,$location) {
	var self = $scope;
	self.getMap= function(){
		var map = new OpenLayers.Map('testmap');
		var geoServerUrl="http://192.168.174.99:8080";
		var extent = new OpenLayers.Bounds(11.272473793029,46.447363967896, 11.426969032287, 46.516028518678);
		var wmscURL = [
		      geoServerUrl+"/geoserver/wms"
		];
		var center=  new OpenLayers.Geometry.Point(46.481696243287,11.349721412658);
		var filter_format = new OpenLayers.Format.Filter({version: "1.1.0"});
		var xmlFormatter = new OpenLayers.Format.XML();
		var filter= new OpenLayers.Filter.Spatial({
			type: OpenLayers.Filter.Spatial.DWITHIN,
			property:'the_geom',
			value:center,
			distance:5000
		});
		var options={
				minResolution: 0.00000291534423828125,
				maxResolution: 0.00200291534423828125,
				buffer: 0, 
		        opacity: 1, 
		        isBaseLayer: true, 
		        visibility: true, 
		        singleTile: true 
			};
		var traffic = new OpenLayers.Layer.WMS( 'Südtirol',wmscURL, {
			layers: ['elgis:trafficstation','elgis:parkingarea'], 
			format: 'image/png',
			exceptions:'application-vnd.ogc.se_inimage'	
		},options);
		
		var st = new OpenLayers.Layer.WMS( 'Südtirol',wmscURL, {
			layers: ['elgis:l09'],
			//filter:xmlFormatter.write(filter_format.write(filter)), TODO fix this filter so that it works
			format: 'image/png',
			exceptions:'application-vnd.ogc.se_inimage'	
		},{
			minResolution: 0.00000291534423828125,
			maxResolution: 0.00200291534423828125,
			buffer: 0, 
	        opacity:0.2, 
	        isBaseLayer: false, 
	        visibility: true, 
	        singleTile: true 
		});
		
		map.addLayer(st);
		map.addLayer(traffic);
		map.zoomToExtent(extent);
		st.events.on({
			 moveend: function(e) {
               if (e.zoomChanged) {
       			   self.box=map.getExtent();
                   OpenLayers.Event.stop(e);
               }
            }
			
        });
	};

};

