function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("tipo");
	dataset.addColumn("nrodocvenda");
	dataset.addColumn("bonus");
	dataset.addColumn("pesogeralcamp");
	dataset.addColumn("pontos");
	dataset.addColumn("dtainclusao");
	dataset.addColumn("seqproduto");
	dataset.addColumn("dtabaseexportacao");
	dataset.addColumn("qtdatendida");
	dataset.addColumn("percbasecomissao");
	dataset.addColumn("qtdembalagem");
	dataset.addColumn("uf");
	dataset.addColumn("nropedvendaorigem");
	dataset.addColumn("dtainclusaoitem");
	dataset.addColumn("nropedant90");
	dataset.addColumn("seqpessoa");
	dataset.addColumn("desccompleta");
	dataset.addColumn("cfa");
	dataset.addColumn("desclocalidade");
	dataset.addColumn("seqlocalidade");
	dataset.addColumn("codcampanha");
	dataset.addColumn("dtaprocessamento");
	dataset.addColumn("pesocfa");
	dataset.addColumn("codparticipante");
	dataset.addColumn("pesofornecedor");
	dataset.addColumn("pesoproduto");
	
	var campanha = "87";
	var representante = "12252";
	var offset = "0";
	var limit = "999";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "campanha"){
				campanha = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "offset"){
				offset = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "limit"){
				limit = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
		//var json = '{"dados":[{"tipo":"Devolucao","nrodocvenda":"994","bonus":"","pesogeralcamp":"0","pontos":"-.9","dtainclusao":"2018-04-11 00:00:00","seqproduto":"106481","dtabaseexportacao":"2018-04-11 00:00:00","qtdatendida":"1","percbasecomissao":"100","qtdembalagem":"1","uf":"MG","nropedvendaorigem":"8383553","dtainclusaoitem":"2018-04-11 00:00:00","nropedant90":"","seqpessoa":"380105","desccompleta":"TABLET M7S QUAD CORE PRETO MULTILASER","cfa":"3","desclocalidade":"MG-OURO PRETO/CACHOEIRA DO CAMPO","seqlocalidade":"7551","codcampanha":"87","dtaprocessamento":"2018-07-14 00:00:00","pesocfa":"1","codparticipante":"12252","pesofornecedor":"4","pesoproduto":"0"}],"metadados":{"limiteinicio":0,"erro":"","limitequantidade":1,"totalregistros":408696,"quantidaderegistros":1,"fields":"","parametros":{"seqcampanha":"87","limit":"1","codparticipante":"12252"},"order":1}}';

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/campanha/" + campanha + "/detalheParticipante?sessionid=123abc&codparticipante=" + representante + "&offset=" + offset + "&limit=" + limit,
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem detalhe para a campanha solicitada", "", "", "", "", "", "", "", "", "")); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());

            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
            	
        	    dataset.addRow(new Array(dados["tipo"],
			    		 dados["nrodocvenda"],
			    		 dados["bonus"],
			    		 dados["pesogeralcamp"],
			    		 dados["pontos"],
			    		 dados["dtainclusao"],
			    		 dados["seqproduto"],
			    		 dados["dtabaseexportacao"],
			    		 dados["qtdatendida"],
			    		 dados["percbasecomissao"],
			    		 dados["qtdembalagem"],
			    		 dados["uf"],
			    		 dados["nropedvendaorigem"],
			    		 dados["dtainclusaoitem"],
			    		 dados["nropedant90"],
			    		 dados["seqpessoa"],
			    		 dados["desccompleta"],
			    		 dados["cfa"],
			    		 dados["desclocalidade"],
			    		 dados["seqlocalidade"],
			    		 dados["codcampanha"],
			    		 dados["dtaprocessamento"],
			    		 dados["pesocfa"],
			    		 dados["codparticipante"],
			    		 dados["pesofornecedor"],
			    		 dados["pesoproduto"]));
            }
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem detalhe para a campanha solicitada", "", "", "", "", "", "", "", "", "")); 
    }

    
	return dataset;
	
}