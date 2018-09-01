function createDataset(fields, constraints, sortFields) {
	
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("enderuf");
	dataset.addColumn("apelido");
	dataset.addColumn("codpessoarepresentante");
	dataset.addColumn("enderbairro");
	dataset.addColumn("endercidade");
	dataset.addColumn("endercep");
	dataset.addColumn("codrepresentante");
	dataset.addColumn("nroregcore");
	dataset.addColumn("inscinss");
	dataset.addColumn("cnpjcpfnumero");
	dataset.addColumn("enderrua");
	dataset.addColumn("cnpjcpfdigito");
	dataset.addColumn("nomerazao");
	
	var representante = "20009";
	if (constraints != null) {
		for (var c in constraints){
			if (constraints[c].getFieldName() == "representante"){
				representante = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
		var json = '{"dados":[{"enderuf":"MG","apelido":"THIAGO","codpessoarepresentante":"168805","enderbairro":"GUARAPIRANGA","endercidade":"PONTE NOVA","endercep":"35430206","codrepresentante":"12252","nroregcore":"NOTIFICACAO","inscinss":"13415359343","cnpjcpfnumero":"79805466","enderrua":"RUA CARLOS MARQUES","cnpjcpfdigito":"28","nomerazao":"THIAGO MAIKAE MONTEIRO PLACIDIO"}],"metadados":{"limiteinicio":0,"erro":"","limitequantidade":10,"totalregistros":1,"quantidaderegistros":1,"fields":"codpessoarepresentante,codrepresentante,nomerazao,apelido,cnpjcpfnumero,cnpjcpfdigito,enderrua,enderbairro,endercidade,enderuf,endercep,nroregcore,inscinss","parametros":{"limit":"10","codrepresentante":"12252"},"order":"nomerazao"}}';
		log.info("ds_comissoes")
		
/*        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/comissao?sessionid=123abc&codrepresentante=" + representante + "&mes=" + mes + "&ano=" + ano + "&order=codlancamento&offset=0&limit=10",
            method : 'get',     
            timeoutService: '1000',
	        options : {
	            mediaType: 'application/json'
	        }
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if (vo.getResult()== null || vo.getResult().isEmpty()) {
        	dataset.addRow(new Array("erro", "Sem comissão para o periodo solicitado " + mes + "/" + ano, "", "", "", "", "", "", "", "", "", "", "", "", "", "")); 
        } else {*/
            var result = JSON.parse(json);
//            var result = JSON.parse(vo.getResult());
            var list = result["dados"];
            for (var i=0; i<list.length; i++) {
            	var dados = list[i];
        	    dataset.addRow(new Array(dados["enderuf"],
			    		 dados["apelido"],
			    		 dados["codpessoarepresentante"],
			    		 dados["enderbairro"],
			    		 dados["endercidade"],
			    		 dados["endercep"],
			    		 dados["codrepresentante"],
			    		 dados["nroregcore"],
			    		 dados["inscinss"],
			    		 dados["cnpjcpfnumero"],
			    		 dados["enderrua"],
			    		 dados["cnpjcpfdigito"],
			    		 dados["nomerazao"]));
            }
            
  //      }
    } catch(err) {
    	log.info(err.message)
    	dataset.addRow(new Array("erro", "Representante não encontrato " + representante, "", "", "", "", "", "", "", "", "", "", "")); 
    }
    
	return dataset;
	
}