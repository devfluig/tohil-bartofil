function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("tipapuracao");
	dataset.addColumn("situacao");
	dataset.addColumn("ordempremio");
	dataset.addColumn("descpremio");
	dataset.addColumn("dtaprorrogada");
	dataset.addColumn("pontos");
	dataset.addColumn("codparticipante");
	dataset.addColumn("vlrpremio");
	dataset.addColumn("nomeparticipante");
	dataset.addColumn("codgrupo");
	dataset.addColumn("descequipe");
	
	var representante = "12252";
	var tipapuracao = "X";
	var codcampanha = "87";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante") {
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "tipapuracao") {
				tipapuracao = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "codcampanha") {
				codcampanha = constraints[c].getInitialValue(); 
			} 
			
		}
	}
	
	try {
		
  		var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/representante/" + representante + "/campanhadetalhe?sessionid=123abc&tipapuracao=" + tipapuracao + "&codcampanha=" + codcampanha + "&offset=0&limit=200",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        
        log.info(data.endpoint)
        
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem campanha parceira para esse representante " + representante, "", "", "", "", "", "", "", "", "", "", "", "")); 
        } else {
//            var result = JSON.parse(json);
            log.info(vo.getResult())
            var result = JSON.parse(vo.getResult());
            
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
            	
        	    dataset.addRow(new Array(dados["tipapuracao"],
							    		 dados["situacao"],
							    		 dados["ordempremio"],
							    		 dados["descpremio"],
							    		 dados["dtaprorrogada"],
							    		 dados["pontos"],
							    		 dados["codparticipante"],
							    		 dados["vlrpremio"],
							    		 dados["nomeparticipante"],
							    		 dados["codgrupo"],
							    		 dados["descequipe"]));
           }
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem campanha para esse representante " + err.message, "", "", "", "", "", "", "", "", "", "", "", "")); 
    }

	
	return dataset;
	
	
}