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
	
	var representante = "12252";
	var tipapuracao = "X";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante") {
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "tipapuracao") {
				tipapuracao = constraints[c].getInitialValue(); 
			} 
			
		}
	}
	
	try {
		
		var json = '{"dados":[{"tipapuracao":"X","nroempresa":"10","desccampanha":"PARCEIROS 100% - 2018 - GERENCIA BRASIL INTERIOR","dtaprorrogada":"2018-12-31 00:00:00","dtaencerramento":"2018-12-31 00:00:00","codcampanha":"87","ordempremio":"23/118","dtaprocessamento":"2018-12-02 00:00:00","descgrupo":"GRUPO 01","codparticipante":"12252","sitpremiado":"Premiado","dtainicio":"2018-01-01 00:00:00","codgrupo":"1","status":"A"}]}';
		
  		/*var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/representante/" + representante + "/campanha?sessionid=123abc&tipapuracao=" + tipapuracao + "&offset=0&limit=200",
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
        } else {*/
            var result = JSON.parse(json);
//            log.info(vo.getResult())
 //           var result = JSON.parse(vo.getResult());
            
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
            	
        	    dataset.addRow(new Array(dados["tipapuracao"],
							    		 dados["nroempresa"],
							    		 dados["desccampanha"],
							    		 dados["dtaprorrogada"],
							    		 dados["dtaencerramento"],
							    		 dados["codcampanha"],
							    		 dados["ordempremio"],
							    		 dados["dtaprocessamento"],
							    		 dados["descgrupo"],
							    		 dados["codparticipante"],
							    		 dados["sitpremiado"],
							    		 dados["dtainicio"],
							    		 dados["codgrupo"],
							    		 dados["status"]));
            }
   //     }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem campanha para esse representante " + err.message, "", "", "", "", "", "", "", "", "", "", "", "")); 
    }

	
	return dataset;
	
	
}