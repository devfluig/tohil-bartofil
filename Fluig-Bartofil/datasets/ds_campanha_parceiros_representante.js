function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("apelido");
	dataset.addColumn("grupo");
	dataset.addColumn("gerencia");
	dataset.addColumn("pontos");
	dataset.addColumn("dataprocessamento");
	dataset.addColumn("nroequipe");
	dataset.addColumn("vlrpremio");
	dataset.addColumn("trimestre");
	dataset.addColumn("descequipe");
	dataset.addColumn("ordem");
	dataset.addColumn("nrorepresentante");
	dataset.addColumn("nroequipesuperior");
	dataset.addColumn("seqcampanha");
	dataset.addColumn("descgrupo");
	dataset.addColumn("situacao");
	
	var representante = null;
	var limit = 999;
	var offset = 0;
	var grupo = null;
	var periodo = "201901";
	var equipesuperior = null;
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante") {
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "limit") {
				limit = +(constraints[c].getInitialValue()); 
			} else if (constraints[c].getFieldName() == "offset") {
				offset = +(constraints[c].getInitialValue()); 
			} else if (constraints[c].getFieldName() == "grupo") {
				grupo = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "periodo") {
				periodo = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "equipesuperior") {
				equipesuperior = constraints[c].getInitialValue(); 
			} 
			
		}
	}
	
//	try {
		
		var where = "";
		if (grupo != null) {
			where += "&grupo=" + grupo;
		}
		if (equipesuperior != null) {
			//where += "&nroequipesuperior=" + equipesuperior;
		}
		if (representante != null) {
			where += "&nrorepresentante=" + representante;
		}
		
  		var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/parceiro" + (periodo != null ? '/' + periodo : '') + "?sessionid=123abc" + where + "&offset=" + offset + "&limit=" + limit,
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
            	
        	    dataset.addRow(new Array(dados["apelido"],
							    		 dados["grupo"],
							    		 dados["gerencia"],
							    		 dados["pontos"],
							    		 dados["dtaprocessamento"],
							    		 dados["nroequipe"],
							    		 dados["vlrpremio"],
							    		 dados["trimestre"],
							    		 dados["descequipe"],
							    		 dados["ordem"],
							    		 dados["nrorepresentante"],
							    		 dados["nroequipesuperior"],
							    		 dados["seqcampanha"],
							    		 dados["descgrupo"],
							    		 dados["situacao"]));
        	    log.info("offset:" + offset + ":" + i + ":" + limit);
            }

            
        }
  /*  } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Sem campanha para esse representante " + err.message, "", "", "", "", "", "", "", "", "", "", "", "")); 
    }*/

	
	return dataset;
	
	
}