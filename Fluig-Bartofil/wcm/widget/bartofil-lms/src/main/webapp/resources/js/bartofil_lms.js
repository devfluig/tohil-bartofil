var lms = SuperWidget.extend({
	loading: FLUIGC.loading(window),
	instanceId: null,
	context: "/bartofil_lms",
	enroll: null,
	training: [],
	trainingUser: [],
	trainingToLoad: [],
	categoriesToLoad: [],
	init : function() {
		
		lms.loading.show();
		lms.getCategories();
		
		$("#search").keyup(function() {
			lms.showTraining();
		});
		
	},

	bindings : {
		local : {},
		global : {
			'save-preferences-parceiro': ['click_savePreferences'],
			'click-category': ['click_clickCategory'],
			'click-iniciar': ['click_clickStartTraining'],
			'click-matricular': ['click_clickEnroll'],
		}
	},
	
	clickEnroll: function(el, ev) {
		lms.loading.show();
		lms.enroll = $(el).data("id");
		var c1 = DatasetFactory.createConstraint("mail", WCMAPI["userEmail"], WCMAPI["userEmail"], ConstraintType.MUST, false);
		DatasetFactory.getDataset("ds_usuario_lms", null, [c1], null, {"success": lms.onReadyUserLms} );
		
	},
	onReadyUserLms: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			WCMC.messageError('Usuário não cadastrado no LMS!');
			return;
		}
		var values = rows["values"];
		var id = values[0].id;
		
		if (!id) {
			WCMC.messageError('Usuário não cadastrado no LMS!');
			return;
		}
		
		var data = { "parties": [{
				"id": id,
				"name": WCMAPI["user"],
				"type": "User"
			}],
			"items": [{
				"id": lms.enroll,
				"type": "TRACK_TRAINING"
			}]
		};
		$.ajax({
			method: "POST",
			url: "/lms/api/v1/enrollments/requests",
			data: JSON.stringify(data),
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
		}).done(function(result) {
			var success = result["successItems"];
			if (success.length > 0) {
				var item = success[0];
				var btn = '<a class="waves-effect waves-light btn" data-click-iniciar data-id="' + (+(item["enrollmentRequestId"])+1) + '">Iniciar</a>';
				$(".btn-training-" + lms.enroll).html(btn);
				WCMC.messageInfo('Usuário matriculado com sucesso!');
			}
			lms.loading.hide();
		});
		
	},
	clickStartTraining: function(el, ev) {
		window.open("/portal/p/1/pagelearningtrainingtrack/" + $(el).data("id") + "/training");
	},
	
	clickCategory: function(el, ev) {
		$(".course").hide();
		if ($(el).data("id") == "all") {
			$(".course").show();
		} else {
			$(".training-parent-" + $(el).data("id")).show(); 
		}
	},
	
	getCategories: function() {
		$.ajax({
			method: "GET",
			url: "/lms/api/rest/catalogTrainingTrackRest/getRoots?offset=0&limit=100"
		}).done(function(result) {
			var content = result["content"];
			var id = content[0].id;
			console.log("result", id, content);
			lms.getItems(id);
		});		
	},
	
	getItems: function(id) {
		$.ajax({
			method: "GET",
			url: "/lms/api/rest/catalogTrainingTrackRest/getCatalogItems/" + id + "?offset=0&limit=999"
		}).done(function(result) {
			var content = result["content"];
			for (var i=0; i<content.length; i++) {
				var it = content[i];
				if (it["type"] == "Folder") {
					var tpl = $('.tpl-categories').html();
					var data = { "id": it["id"], "label": it["name"]};
					var html = Mustache.render(tpl, data);
					$('#list-categories').append(html);
					lms.categoriesToLoad.push(it);
				} else if (it["type"] == "Training") {
					lms.trainingToLoad.push(it);
				}
			}
			lms.loadCaterories();
		});
	},
	
	loadCaterories: function() {
		var index = 0;
		var load = function (i) {
			console.log("item", i, lms.categoriesToLoad.length)
			if (i < lms.categoriesToLoad.length) { 
				var item = lms.categoriesToLoad[i];
				console.log("item", item)
				$.ajax({
					method: "GET",
					url: "/lms/api/rest/catalogTrainingTrackRest/getCatalogItems/" + item["id"]+ "?offset=0&limit=999"
				}).done(function(result) {
					console.log("loadcate", index, item)
					var content = result["content"];
					for (var x=0; x<content.length; x++) {
						var it = content[x];
						if (it["type"] == "Folder") {
							var tpl = $('.tpl-categories').html();
							var data = { "id": it["id"], "label": it["name"]};
							var html = Mustache.render(tpl, data);
							$('#list-categories').append(html);
							lms.categoriesToLoad.push(it);
						} else if (it["type"] == "Training") {
							lms.trainingToLoad.push(it);
						}
					}
					index++;
					if (index < lms.categoriesToLoad.length) {
						load(index);
					} else {
						lms.categoriesToLoad = [];
						lms.loadTraining();
					}
					
				});
			}
		}
		
		console.log("load", index, lms.categoriesToLoad);
		load(index);
		
	},
	
	loadTraining: function() {
		console.log("loadTraining")
		var index = 0;
		var load = function (i) {
			console.log("item", i, lms.trainingToLoad.length)
			if (i < lms.trainingToLoad.length) { 
				var item = lms.trainingToLoad[i];
				console.log("item", item)
				$.ajax({
					method: "GET",
					url: "/lms/api/rest/catalogTrainingTrackRest/getCatalogItem/" + item["id"]
				}).done(function(result) {
					console.log("loadTraining", index, result)
					var content = result["content"];
					console.log("loadTraining", content)
					lms.training.push(content);
					index++;
					if (index < lms.trainingToLoad.length) {
						load(index);
					} else {
						lms.tracksByUser();
					}
					
				});
			}
		}
		load(index);
	},
	
	tracksByUser: function() {
		$.ajax({
			method: "GET",
			url: "/lms/api/rest/trainingTrackRest/getTracksTrainingsByUser/100/0"
		}).done(function(result) {
			console.log("tracksByUser", result)
			lms.trainingUser = result["content"];
			lms.showTraining();
		});
	},
	
	showTraining: function() {
		console.log(lms.training)
		
		$('#course-list').html("");

		var filter = lms.training;
		var search = $("#search").val(); 
		if (search && search != "") {
			filter = lms.training.filter(function(item) {
				return item["name"].toLowerCase().indexOf(search) != -1 || item["objectiveNoHtml"].toLowerCase().indexOf(search.toLowerCase()) != -1;
			})
		}
		
		for (var i=0; i<filter.length; i++) {
			var t = filter[i];
			var btn = '<a class="waves-effect waves-light btn" data-click-matricular data-id="' + t["id"] + '">Matricular-se</a>';
			for (var x=0; x<lms.trainingUser.length; x++) {
				var u = lms.trainingUser[x];
				if (u["id"] == t["id"]) {
					btn = '<a class="waves-effect waves-light btn" data-click-iniciar data-id="' + u["enrollmentId"] + '">Iniciar</a>';
				}
			}
			var tpl = $('.tpl-training').html();
			var data = { "id": t["id"], "title": t["name"], "img": "/lms" + t["image"], "description": t["objectiveNoHtml"], "btn": btn, "parent": t["parentId"] };
			var html = Mustache.render(tpl, data);
			console.log("html", html)
			$('#course-list').append(html);
			
			
		}
		lms.loading.hide();
		
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
	
});
