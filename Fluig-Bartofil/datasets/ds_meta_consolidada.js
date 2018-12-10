function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("metavlrvenda");
	dataset.addColumn("diasuteisrestantes");

	var representante = "12252";
	var datainicio = "01-10-2018";
	var datafim = "31-10-2018";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "data-inicio"){
				datainicio = constraints[c].getInitialValue(); 
			} else if (constraints[c].getFieldName() == "data-fim"){
				datafim = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{ "metavlrvenda":"272000", "diasuteisrestantes":"11.62" }],}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/representante/" + representante + "/pedidos?sessionid=123abc&datainclusaoinicio=" + datainicio + "&datainclusaofim=" + datafim + "&fields=metavlrvenda,diasuteisrestantes",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem comissão para o periodo solicitado " + mes + "/" + ano, "", "", "", "", "", "", "", "", "", "", "", "", "", "")); 
        } else {
//            var result = JSON.parse(json);
            var result = JSON.parse(vo.getResult());
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
        	    dataset.addRow(new Array(dados["metavlrvenda"],
			    		 dados["diasuteisrestantes"]));
            }
            
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "", "", "", "", "", "", "", "", "")); 
    }
    
	return dataset;
	
}