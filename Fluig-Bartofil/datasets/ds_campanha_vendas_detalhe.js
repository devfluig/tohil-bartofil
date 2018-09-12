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
	
	var campanha = "160";
	var representante = null;
	var offset = "0";
	var limit = "20";
	var grupo = "1";
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
			} else if (constraints[c].getFieldName() == "grupo") {
				grupo = constraints[c].getInitialValue(); 
			}
		}
	}
	
	try {
//		var json = '{"dados":[{"tipapuracao":"V","situacao":"Premiado","ordempremio":"1","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"5864.2","codparticipante":"12224","vlrpremio":"400","nomeparticipante":"CAIO","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"Premiado","ordempremio":"2","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"5288.2","codparticipante":"13661","vlrpremio":"300","nomeparticipante":"GERALDO","codgrupo":"1","descequipe":"Minas Gerais 2"},{"tipapuracao":"V","situacao":"Premiado","ordempremio":"3","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2902.04","codparticipante":"23185","vlrpremio":"200","nomeparticipante":"REGINALDO","codgrupo":"1","descequipe":"Centro-oeste"},{"tipapuracao":"V","situacao":"","ordempremio":"4","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2877.81","codparticipante":"21439","vlrpremio":"","nomeparticipante":"FRANCILMAR","codgrupo":"1","descequipe":"Nordeste 1"},{"tipapuracao":"V","situacao":"","ordempremio":"5","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2751.82","codparticipante":"22906","vlrpremio":"","nomeparticipante":"ADRIANO","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"6","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2681.84","codparticipante":"13558","vlrpremio":"","nomeparticipante":"OSMAR","codgrupo":"1","descequipe":"Minas Gerais 3"},{"tipapuracao":"V","situacao":"","ordempremio":"7","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2571.52","codparticipante":"21264","vlrpremio":"","nomeparticipante":"OZORIO","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"8","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2568.58","codparticipante":"30835","vlrpremio":"","nomeparticipante":"CARPEGIANI","codgrupo":"1","descequipe":"Minas Gerais 4"},{"tipapuracao":"V","situacao":"","ordempremio":"9","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2505.9","codparticipante":"12252","vlrpremio":"","nomeparticipante":"THIAGO","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"10","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2482.15","codparticipante":"30275","vlrpremio":"","nomeparticipante":"NASCIMENTO","codgrupo":"1","descequipe":"Nordeste 2"},{"tipapuracao":"V","situacao":"","ordempremio":"11","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2468.45","codparticipante":"10134","vlrpremio":"","nomeparticipante":"MARCOS EDUARDO","codgrupo":"1","descequipe":"RMBH"},{"tipapuracao":"V","situacao":"","ordempremio":"12","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2437.85","codparticipante":"32203","vlrpremio":"","nomeparticipante":"EDSON","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"13","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2390.64","codparticipante":"21767","vlrpremio":"","nomeparticipante":"AIRLAN","codgrupo":"1","descequipe":"Bahia 1"},{"tipapuracao":"V","situacao":"","ordempremio":"14","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2361.09","codparticipante":"32267","vlrpremio":"","nomeparticipante":"DEUZIMAR","codgrupo":"1","descequipe":"Nordeste 3"},{"tipapuracao":"V","situacao":"","ordempremio":"15","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2344.17","codparticipante":"21457","vlrpremio":"","nomeparticipante":"RILDO","codgrupo":"1","descequipe":"Norte 1"},{"tipapuracao":"V","situacao":"","ordempremio":"16","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2181.9","codparticipante":"22323","vlrpremio":"","nomeparticipante":"GUILHERME","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"17","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2111.83","codparticipante":"31427","vlrpremio":"","nomeparticipante":"TARCIZIO","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"18","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2104.26","codparticipante":"30078","vlrpremio":"","nomeparticipante":"JAELSON","codgrupo":"1","descequipe":"Bahia 1"},{"tipapuracao":"V","situacao":"","ordempremio":"19","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"2013.84","codparticipante":"21614","vlrpremio":"","nomeparticipante":"EDNILSON","codgrupo":"1","descequipe":"Bahia 1"},{"tipapuracao":"V","situacao":"","ordempremio":"20","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1996.3","codparticipante":"30693","vlrpremio":"","nomeparticipante":"IVAN","codgrupo":"1","descequipe":"Bahia 1"},{"tipapuracao":"V","situacao":"","ordempremio":"21","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1937.77","codparticipante":"23455","vlrpremio":"","nomeparticipante":"SIDINEI","codgrupo":"1","descequipe":"Bahia 1"},{"tipapuracao":"V","situacao":"","ordempremio":"22","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1882.19","codparticipante":"21412","vlrpremio":"","nomeparticipante":"WESLEY","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"23","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1825.61","codparticipante":"30787","vlrpremio":"","nomeparticipante":"ELIANA","codgrupo":"1","descequipe":"Minas Gerais 3"},{"tipapuracao":"V","situacao":"","ordempremio":"24","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1807.44","codparticipante":"32294","vlrpremio":"","nomeparticipante":"GLEITON","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"25","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1745.42","codparticipante":"20195","vlrpremio":"","nomeparticipante":"UMBERTO","codgrupo":"1","descequipe":"Bahia 1"},{"tipapuracao":"V","situacao":"","ordempremio":"26","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1733.94","codparticipante":"20707","vlrpremio":"","nomeparticipante":"ELIEZER","codgrupo":"1","descequipe":"Minas Gerais 2"},{"tipapuracao":"V","situacao":"","ordempremio":"27","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1733.38","codparticipante":"13039","vlrpremio":"","nomeparticipante":"EUCLIDES","codgrupo":"1","descequipe":"Nordeste 2"},{"tipapuracao":"V","situacao":"","ordempremio":"28","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1723.47","codparticipante":"23372","vlrpremio":"","nomeparticipante":"FRANCISCO","codgrupo":"1","descequipe":"Nordeste 3"},{"tipapuracao":"V","situacao":"","ordempremio":"29","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1693.46","codparticipante":"22320","vlrpremio":"","nomeparticipante":"EDIVANA","codgrupo":"1","descequipe":"Minas Gerais 1"},{"tipapuracao":"V","situacao":"","ordempremio":"30","descpremio":"","dtaprorrogada":"2018-09-30 00:00:00","pontos":"1685.37","codparticipante":"12741","vlrpremio":"","nomeparticipante":"RANE","codgrupo":"1","descequipe":"Minas Gerais 2"}],"metadados":{"limiteinicio":0,"erro":"","limitequantidade":30,"totalregistros":964,"quantidaderegistros":30,"fields":"","parametros":{"codcampanha":"160","limit":"30"},"order":"ordempremio"}}';
//		log.info("ds_comissoes")
		
		var where = "";
		if (representante != null) {
			where = "&codparticipante=" + representante
		}
		if (grupo != null) {
			where = "&codgrupo=" + grupo
		}
		
        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'RCA',
            endpoint : "/v1/campanha/" + campanha + "/detalhe?sessionid=123abc" + where + "&order=ordempremio,codgrupo&offset=" + offset + "&limit=" + limit,
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
    	dataset.addRow(new Array("erro", "Sem detalhe para a campanha solicitada", "", "", "", "", "", "", "", "", "")); 
    }

    
	return dataset;
	
}