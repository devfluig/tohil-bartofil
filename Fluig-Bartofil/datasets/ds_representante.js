function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("enderuf");
	dataset.addColumn("apelido");
	dataset.addColumn("valormensal12");
	dataset.addColumn("codpessoarepresentante");
	dataset.addColumn("endercidade");
	dataset.addColumn("codrepresentante");
	dataset.addColumn("grupoparceiro100");
	dataset.addColumn("descequipe");
	dataset.addColumn("foto");
	dataset.addColumn("valormensal6");
	dataset.addColumn("dataadmissao");
	dataset.addColumn("valormensal3");
	dataset.addColumn("nomerazao");

	var representante = "12252";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"enderuf":"MG","apelido":"THIAGO","valormensal12":"249547.49","codpessoarepresentante":"168805","endercidade":"PONTE NOVA","codrepresentante":"12252","grupoparceiro100":" - ","descequipe":"Minas Gerais 1","foto":"","valormensal6":"252231.88","dataadmissao":"2010-07-22 00:00:00","valormensal3":"257880.5","nomerazao":"THIAGO MAIKAE MONTEIRO PLACIDIO"}]}';
//		log.info("ds_comissoes")
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/representante/" + representante + "?sessionid=123abc&limit=1&fields=codrepresentante,codpessoarepresentante,nomerazao,apelido,endercidade,enderuf,dataadmissao,descequipe,grupoparceiro100,valormensal12,valormensal6,valormensal3,foto",
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
        	    dataset.addRow(new Array(dados["enderuf"],
			    		 dados["apelido"],
			    		 dados["valormensal12"],
			    		 dados["codpessoarepresentante"],
			    		 dados["endercidade"],
			    		 dados["codrepresentante"],
			    		 dados["grupoparceiro100"],
			    		 dados["descequipe"],
			    		 dados["foto"],
			    		 dados["valormensal6"],
			    		 dados["dataadmissao"],
			    		 dados["valormensal3"],
			    		 dados["nomerazao"]));
            }
            
        }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "", "", "", "", "", "", "", "", "")); 
    }
    
	return dataset;
	
}