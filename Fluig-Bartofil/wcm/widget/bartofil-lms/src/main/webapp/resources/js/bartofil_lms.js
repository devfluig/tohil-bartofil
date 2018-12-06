var lms = SuperWidget.extend({
	loading: FLUIGC.loading(window),
	instanceId: null,
	context: "/bartofil_lms",
	init : function() {
		$(".pageTitle").parent().remove();
	},

	bindings : {
		local : {},
		global : {
			'save-preferences-parceiro': ['click_savePreferences'],
		}
	},
	
	savePreferences: function(el, ev) {
		var args = {
			"grouprca": $('input[id="grouprca"]', this.DOM).val()
		};
		console.log(args);
		
		WCMSpaceAPI.PageService.UPDATEPREFERENCES({
		    async: true,
		    success: function (data) {
				WCMC.messageInfo('Preferencias salvas com sucesso!');	    			
		    },
		    fail: function (xhr, message, errorData) {
		    	console.log("UPDATEPREFERENCES fail", xhr, message, errorData);
		    }
		}, this.instanceId, args );
	},
	
	openTrainning: function() {
		window.open("http://192.168.0.65:8080/portal/p/1/pagelearningtrainingtrack/47/training");
	},
	
	getTraining: function() {
		var url = "http://192.168.0.65:8080/lms/api/rest/trainingTrackRest/getEvolutionTrainingByUser";
		var track = "http://192.168.0.65:8080/lms/api/rest/trainingTrackRest/getEvolutionTrackByUser";
		var image = "http://192.168.0.65:8080/lms/FileServlet?area=CATALOG_IMAGE&file=c2tpbnMucG5n&domain=1&subarea=NDQ=&size=100";
		var t = "http://192.168.0.65:8080/lms/api/rest/trainingTrackRest/getTracksTrainingsByUser";
		var all = "http://192.168.0.65:8080/lms/api/rest/catalogTrainingTrackRest/getCatalogItems/25?offset=0&limit=31&orderby=&_=1544015221156";
		var root = "http://192.168.0.65:8080/lms/api/rest/catalogTrainingTrackRest/getRoots?offset=0&limit=11&orderby=&_=1544015221152";
			
	},
	
	postTraining: function() {
		var url = "http://192.168.0.65:8080/lms/api/v1/enrollments/requests/";
		var body = {
				  "parties": [
					    {
					      "id": 19,
					      "name": "Rodrigo  Sombrio",
					      "type": "User"
					    }
					  ],
					  "items": [
					    {
					      "id": 44,
					      "type": "TRACK_TRAINING"
					    }
					  ]
					}
	},
	
	getCost: function() {
		var url = "http://192.168.0.65:8080/lms/api/v1/managerenrollment/costs?&party=19&item=44";
	}
	
});
