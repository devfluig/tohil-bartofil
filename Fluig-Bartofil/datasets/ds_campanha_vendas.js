function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("tipapuracao");
	dataset.addColumn("nroempresa");
	dataset.addColumn("desccampanha");
	dataset.addColumn("dtaprorrogada");
	dataset.addColumn("dtaencerramento");
	dataset.addColumn("codcampanha");
	dataset.addColumn("ordempremio");
	dataset.addColumn("dtaprocessamento");
	dataset.addColumn("descgrupo");
	dataset.addColumn("codparticipante");
	dataset.addColumn("sitpremiado");
	dataset.addColumn("dtainicio");
	dataset.addColumn("codgrupo");
	dataset.addColumn("status");
	dataset.addColumn("descpercautorizado");	
	
	var representante = "12252";
	var limit = 999;
	var offset = 0;
	var periodo = "201904";
	var tipo = "O";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante") {
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "limit") {
				limit = +(constraints[c].getInitialValue()); 
			} else if (constraints[c].getFieldName() == "offset") {
				offset = +(constraints[c].getInitialValue()); 
			} else if (constraints[c].getFieldName() == "tipcampanha") {
				tipo = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "anomes") {
				periodo = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"tipapuracao":"V","nroempresa":"10","desccampanha":"KRONA FAMILIA 01 - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"160","ordempremio":"9/954","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"ISLA-VALOR DE VENDA","dtaprorrogada":"2018-10-31 00:00:00","dtaencerramento":"2018-10-31 00:00:00","codcampanha":"184","ordempremio":"172/1032","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-08-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"F","nroempresa":"10","desccampanha":"M REIS-COMISSAO EXTRA","dtaprorrogada":"2018-10-31 00:00:00","dtaencerramento":"2018-10-31 00:00:00","codcampanha":"181","ordempremio":"17/174","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"Premiado","dtainicio":"2018-08-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"TEKBOND - VALOR DE VENDAS","dtaprorrogada":"2018-08-31 00:00:00","dtaencerramento":"2018-08-31 00:00:00","codcampanha":"165","ordempremio":"122/1098","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"E"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"RIFFEL VALOR DE VENDA","dtaprorrogada":"2018-07-31 00:00:00","dtaencerramento":"2018-07-31 00:00:00","codcampanha":"155","ordempremio":"160/668","dtaprocessamento":"2018-08-14 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-06-01 00:00:00","codgrupo":"1","status":"P"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"SISVOO FAZENDEIRO - VALOR DE VENDA","dtaprorrogada":"2018-08-31 00:00:00","dtaencerramento":"2018-08-31 00:00:00","codcampanha":"144","ordempremio":"78/885","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-06-01 00:00:00","codgrupo":"1","status":"E"},{"tipapuracao":"F","nroempresa":"10","desccampanha":"MERIAL-COMISSAO EXTRA","dtaprorrogada":"2018-08-31 00:00:00","dtaencerramento":"2018-08-31 00:00:00","codcampanha":"176","ordempremio":"67/577","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"Premiado","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"E"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"SAAD CALCADOS - VALOR DE VENDA","dtaprorrogada":"2018-08-31 00:00:00","dtaencerramento":"2018-08-31 00:00:00","codcampanha":"175","ordempremio":"90/687","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"E"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"KRONA FAMILIA 04 - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"163","ordempremio":"9/1057","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"PULVERIZADORES DUCAMPO - VALOR DE VENDA.","dtaprorrogada":"2018-07-31 00:00:00","dtaencerramento":"2018-07-31 00:00:00","codcampanha":"156","ordempremio":"213/991","dtaprocessamento":"2018-08-14 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-06-01 00:00:00","codgrupo":"1","status":"P"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"CAMBUCI SA - VALOR DE VENDA","dtaprorrogada":"2018-08-15 00:00:00","dtaencerramento":"2018-07-31 00:00:00","codcampanha":"154","ordempremio":"266/879","dtaprocessamento":"2018-08-29 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-06-01 00:00:00","codgrupo":"1","status":"P"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"BAYER-VALOR DE VENDAS","dtaprorrogada":"2018-11-30 00:00:00","dtaencerramento":"2018-11-30 00:00:00","codcampanha":"203","ordempremio":"126/177","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"KRONA FAMILIA 05 - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"164","ordempremio":"9/905","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"CONDOR  - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"180","ordempremio":"47/1008","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-08-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"290678-VANSIL-VALOR DE VENDA","dtaprorrogada":"2018-10-31 00:00:00","dtaencerramento":"2018-10-31 00:00:00","codcampanha":"190","ordempremio":"3/814","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-08-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"481-MERIAL-VALOR DE VENDA","dtaprorrogada":"2018-10-31 00:00:00","dtaencerramento":"2018-10-31 00:00:00","codcampanha":"191","ordempremio":"79/516","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-08-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"SOPRANO - VALOR DE VENDA","dtaprorrogada":"2018-07-31 00:00:00","dtaencerramento":"2018-06-30 00:00:00","codcampanha":"140","ordempremio":"817/887","dtaprocessamento":"2018-08-14 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-05-01 00:00:00","codgrupo":"1","status":"P"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"PENEIRA SAO JORGE - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"173","ordempremio":"25/177","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"LONAX-VALOR DE VENDA","dtaprorrogada":"2018-08-31 00:00:00","dtaencerramento":"2018-08-31 00:00:00","codcampanha":"147","ordempremio":"75/138","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-06-01 00:00:00","codgrupo":"1","status":"E"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"KRONA GERENCIA INTERIOR - VALOR VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"158","ordempremio":"6/121","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"Premiado","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"KRONA FAMILIA 02 - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"161","ordempremio":"14/830","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"KRONA FAMILIA 03 - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"162","ordempremio":"31/765","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"TEKBOND - ARALDITE VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-08-31 00:00:00","codcampanha":"168","ordempremio":"262/761","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"ELANCO-VALOR DE VENDAS","dtaprorrogada":"2018-07-31 00:00:00","dtaencerramento":"2018-07-31 00:00:00","codcampanha":"145","ordempremio":"3/459","dtaprocessamento":"2018-08-14 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-06-01 00:00:00","codgrupo":"1","status":"P"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"FORJARIA JUPITER - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"170","ordempremio":"101/716","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"FABIANI ELANCO - VALOR DE VENDA","dtaprorrogada":"2018-11-30 00:00:00","dtaencerramento":"2018-11-30 00:00:00","codcampanha":"194","ordempremio":"36/399","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"EUROFARMA-VALOR DE VENDA","dtaprorrogada":"2018-11-30 00:00:00","dtaencerramento":"2018-11-30 00:00:00","codcampanha":"197","ordempremio":"151/318","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"X","nroempresa":"10","desccampanha":"PARCEIROS 100% - 2018 - GERENCIA BRASIL INTERIOR","dtaprorrogada":"2018-12-31 00:00:00","dtaencerramento":"2018-12-31 00:00:00","codcampanha":"87","ordempremio":"12/118","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"Premiado","dtainicio":"2018-01-01 00:00:00","codgrupo":"1","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"BLACK DECKER-VALOR DE VENDA","dtaprorrogada":"2018-08-31 00:00:00","dtaencerramento":"2018-08-31 00:00:00","codcampanha":"143","ordempremio":"15/1159","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"","dtainicio":"2018-06-01 00:00:00","codgrupo":"1","status":"E"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"TECSUL - VALOR DE VENDA ","dtaprorrogada":"2018-11-30 00:00:00","dtaencerramento":"2018-11-30 00:00:00","codcampanha":"196","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"SOPRANO-VALOR DE VENDAS","dtaprorrogada":"2018-11-30 00:00:00","dtaencerramento":"2018-11-30 00:00:00","codcampanha":"202","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"HYDRA - DUCHA E RESISTENCIA HYDRAMAX - VALOR DE VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"179","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-08-01 00:00:00","codgrupo":"","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"SAAD CALCADOS - VALOR DE VENDA","dtaprorrogada":"2018-11-30 00:00:00","dtaencerramento":"2018-11-30 00:00:00","codcampanha":"199","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"OXFORD - VALOR DE VENDAS","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"189","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-08-01 00:00:00","codgrupo":"","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"OUROFINO-VALOR DE VENDA","dtaprorrogada":"2018-08-31 00:00:00","dtaencerramento":"2018-07-31 00:00:00","codcampanha":"139","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-05-01 00:00:00","codgrupo":"","status":"E"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"COMEP - VALOR DE VENDA","dtaprorrogada":"2018-10-31 00:00:00","dtaencerramento":"2018-10-31 00:00:00","codcampanha":"200","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"CAMPANHA DE VENDA CUTELARIA CIMO","dtaprorrogada":"2018-10-31 00:00:00","dtaencerramento":"2018-10-31 00:00:00","codcampanha":"193","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-09-01 00:00:00","codgrupo":"","status":"A"},{"tipapuracao":"V","nroempresa":"10","desccampanha":"KRONA GERENCIA LITORAL - VALOR VENDA","dtaprorrogada":"2018-09-30 00:00:00","dtaencerramento":"2018-09-30 00:00:00","codcampanha":"159","ordempremio":"N&atilde;o pontuado","dtaprocessamento":"2018-09-05 00:00:00","descgrupo":"GRUPO ","codparticipante":"","sitpremiado":"","dtainicio":"2018-07-01 00:00:00","codgrupo":"","status":"A"}],"metadados":{"limiteinicio":0,"erro":"","limitequantidade":999,"totalregistros":38,"quantidaderegistros":38,"fields":"","parametros":{"divulgasite":"S","limit":"999","codparticipante":"12252"},"order":"codparticipante"}}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/campanha?sessionid=123abc&codparticipante=" + representante + "&order=ordempremio&anomes=" + periodo + "&tipcampanha=" + tipo + "&offset=" + offset + "&limit=" + limit,
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem campanha para esse representante " + representante, "", "", "", "", "", "", "", "", "", "", "", "")); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());
            
            var list = result["dados"];
            for (var i=offset; i<list.length; i++) {
            	var dados = list[i];
            	
        	    dataset.addRow(new Array(dados["tipapuracao"],
							    		 dados["nroempresa"],
							    		 dados["desccampanha"],
							    		 dados["dtaprorrogada"],
							    		 dados["descdtaencerramento"],
							    		 dados["codcampanha"],
							    		 dados["ordempremio"],
							    		 dados["dtaprocessamento"],
							    		 dados["descgrupo"],
							    		 dados["codparticipante"],
							    		 dados["sitpremiado"],
							    		 dados["descdtainicio"],
							    		 dados["codgrupo"],
							    		 dados["status"],
							    		 dados["descpercautorizado"]));
        	    log.info("offset:" + offset + ":" + i + ":" + limit);
        	    if (i >= limit) { 
        	    	break; 
        	    }
            }
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem campanha para esse representante " + representante, "", "", "", "", "", "", "", "", "", "", "", "")); 
    }

	
	return dataset;
	
	
}