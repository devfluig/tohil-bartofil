var campanhavendas = SuperWidget.extend({
	
	loading: FLUIGC.loading(window),
	offset: 0,
	limit: 8,
	list: [],
	instanceId: null,
	foldercampanha: null,
	context: "/bartofil_campanha_vendas",
	current: null,
	
	init : function() {
		$(".pageTitle").parent().remove();
		campanhavendas.getcampanha();
		campanhavendas.foldercampanha = this.foldercampanha;
		console.log(campanhavendas.foldercampanha)
	},

	bindings : {
		local : {},
		global : {
			"click-detalhado": ['click_showdetalhado'],
			"click-campanha": ['click_clickcampanha'],
			'save-preferences': ['click_savePreferences'],
			"click-fechar": ['click_clickfechar'],
		}
	},
	
	getcampanhabyid: function(id) {
		for (var i=0; i<campanhavendas.list.length; i++) {
			var c = campanhavendas.list[i];
			if (c["id"] == id) { return c; }
		}
		return null;
	},
	
	savePreferences: function(el, ev) {
		var args = {
			"foldercampanha": $('input[id="foldercampanha"]', this.DOM).val()
		};
		console.log(args);
		
		WCMSpaceAPI.PageService.UPDATEPREFERENCES({
		    async: true,
		    success: function (data) {
		    	console.log("UPDATEPREFERENCES", data);
		    },
		    fail: function (xhr, message, errorData) {
		    	console.log("UPDATEPREFERENCES fail", xhr, message, errorData);
		    }
		}, this.instanceId, args );
	},	
	
	clickcampanha: function(el, ev) {
		console.log("campanha");
		$(".premiados").removeClass("fs-display-none");
		$(".itens-campanha").addClass("fs-display-none")
		console.log($(el).data("id"));
		
		$('#table-myranking > tbody').html("");
		$('#table-ranking > tbody').html("");
		$(".prev-image").hide();
		$(".next-image").hide();
		$(".image-detail").attr("src", campanhavendas.context + "/resources/images/loading.gif");
		
		campanhavendas.current = campanhavendas.getcampanhabyid($(el).data("id"));
		
		var c1 = DatasetFactory.createConstraint("campanha", $(el).data("id"), $(el).data("id"), ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "20", "20", ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_campanha_vendas_detalhe", null, [c1, c2, c3], null, {"success": campanhavendas.onreadygetcampanhadetalhe} );
		
	},
	
	onreadygetcampanhadetalhe: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhavendas.loading.hide();
			WCMC.messageError('Campanhas de vendas não possui detalhes!');	    			
			return;
		}
		
		var values = rows["values"];
		for (var i = 0; i<values.length; i++) {
			var row = values[i];
			console.log(row)
		}
		
		
		campanhavendas.current;
		
	},
	
	clickfechar: function(el, ev) {
		console.log("campanha");
		$(".premiados").addClass("fs-display-none")
		$(".itens-campanha").removeClass("fs-display-none")
	},
	
	getcampanha: function() {
		var limit = $("#paginacao").val();
		
		var c1 = DatasetFactory.createConstraint("representante", WCMAPI.userLogin, WCMAPI.userLogin, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("offset", "0", "0", ConstraintType.MUST, false);
		var c3 = DatasetFactory.createConstraint("limit", "999", "999", ConstraintType.MUST, false);

		console.log(WCMAPI.userLogin, campanhavendas.offset, limit)
		
		DatasetFactory.getDataset("ds_campanha_vendas", null, [c1, c2, c3], null, {"success": campanhavendas.onreadygetcampanha} );
		
	},
	
	onreadygetcampanha: function(rows) {
		if (!rows || !rows["values"] || rows["values"].length == 0) {
			campanhavendas.loading.hide();
			WCMC.messageError('Representante não possui campanhas de vendas!');	    			
			return;
		}
		var values = rows["values"];
		console.log(values.length)
		for (var i=0; i<values.length; i++) {
			var row = values[i];
			var dtainicio = moment(row["dtainicio"]);
			var dtaprorrogado = moment(row["dtaprorrogada"]);
			var dtaencerrado = moment(row["dtaencerramento"]);
			var ordem = row["ordempremio"].split("/");
			if (ordem.length = 2) {
				ordem = "Posi&ccedil;&atilde;o <strong>" + ordem[0] + "" + (row["sitpremiado"] == "Premiado" ? '<span class="fluigicon fluigicon-certificate"></span>' : '') + "</strong> de <strong>" + ordem[1] + "</strong>";
			} else {
				ordem = row["ordempremio"];
			}
			var classbutton = "";
			if (row["sitpremiado"] == "Premiado") {
				classbutton = "btn-success";
			}
			var classlabel = "label-info";
			var labelfim = "Encerra em " + dtaencerrado.format("DD/MM/YYYY");
			if (row["status"] == "E") {
				classlabel = "label-danger";
				labelfim = "Encerrada em " + dtaencerrado.format("DD/MM/YYYY");
			} else if (row["status"] == "P") {
				classlabel = "label-warning";
				labelfim = "Prorrogada at&eacute; " + dtaprorrogado.format("DD/MM/YYYY");
			}
			
			var o = {
				"id": row["codcampanha"],
				"descricao": row["desccampanha"],
				"dainiciado": dtainicio.format("DD/MM/YYYY"),
				"posicao": ordem,
				"image": null,
				"classbutton": classbutton,
				"classlabel": classlabel,
				"labelfim": labelfim, 
				"listaimagens": []
				
			}
			campanhavendas.list.push(o);
		}
		
		campanhavendas.getdocuments();
		
//		campanhavendas.showcampanhas();
		
	},
	
	getdocuments: function() {
		
		var c1 = DatasetFactory.createConstraint("pasta", campanhavendas.foldercampanha, campanhavendas.foldercampanha, ConstraintType.MUST, false);
		var c2 = DatasetFactory.createConstraint("empresa", WCMAPI.tenantCode, WCMAPI.tenantCode, ConstraintType.MUST, false);

		DatasetFactory.getDataset("ds_lista_campanha_imagem", null, [c1, c2], null, {"success": campanhavendas.onreadygetdocuments} );
		
	},
	
	onreadygetdocuments: function (rows) {

		var docs = [];
		if (rows && rows["values"] && rows["values"].length > 0) {
			docs = rows["values"];
		}
		
		console.log(campanhavendas.list.length)
		
		for (var i=0; i<campanhavendas.list.length; i++) {
			var c = campanhavendas.list[i];
			var images = {};
			for (var x=0; x<docs.length; x++) {
				var row = docs[x];
				console.log("indocs", row, c)
				if (row["campanha"] == c["id"]) {
					images[row["numero"]] = null;
					console.log(row["descricao"], c["id"])
					if (row["descricao"] == c["id"]) {
						c["toloading"] = row["numero"]; 
						c["image"] = campanhavendas.context + "/resources/images/loading.gif";
						console.log(c)
					}
				}
			}
			
			console.log("novo", c, images)
			
			c["listaimagens"] = images; 
			
			if (c["image"] == null && $.isEmptyObject(images) == false) { 
				c["toloading"] = Object.keys(images)[0]; 
				c["image"] = campanhavendas.context + "/resources/images/loading.gif";
			} else if (c["toloading"] == null) {  
				c["image"] = campanhavendas.context + "/resources/images/no-img.png"; 
			}
			
			campanhavendas.list[i] = c;
		}
		
		campanhavendas.showcampanhas();
		
	},
	
	showcampanhas: function() {
		var control = 0;
		var lines = 0;
		var items = [];

		for (var i=campanhavendas.offset; i<campanhavendas.limit; i++) {
			var o = campanhavendas.list[i];
			if (o) {
				control++;
				items.push(o);
				if (control == 4) {
					var tpl = $('.tpl-continuous-scroll-campanhas').html();
					var data = { "items": items};
					console.log(data);
					var html = Mustache.render(tpl, data);
					$('.widget-campanha').append(html);
					
					control = 0;
					lines++;
					items = [];
				}
				
			}
		}		
		if (items.length > 0) {
			var tpl = $('.tpl-continuous-scroll-campanhas').html();
			var data = { "items": items};
			var html = Mustache.render(tpl, data);
			$('.widget-campanha').append(html);
		}
		campanhavendas.geturlfromfluig(0);
	},
	
	geturlfromfluig: function(index){
		if (index < campanhavendas.list.length) {
			var c = campanhavendas.list[index];
			console.log(index, c);
			if (c["toloading"]) {
				$.ajax(WCMAPI.serverURL + "/api/public/2.0/documents/getDownloadURL/" + c["toloading"]).done(function(data) {
				    console.log( "success", data );
				    $("#img" + c["id"]).attr("src", data.content);
				    console.log($("#img" + c["id"]))
				    c["toloading"] = null;
				    c["image"] = data.content;
				    campanhavendas.list[index] = c;
				}).fail(function() {
					console.log( "error" );
				    $("#img" + c["id"]).attr("src", campanhavendas.context + "/resources/images/no-img.png");
				}).complete(function() {
					index++;
					campanhavendas.geturlfromfluig(index);
				});
			} else {
				index++;
				campanhavendas.geturlfromfluig(index);
			}
		}
		
	}
	
	

});
