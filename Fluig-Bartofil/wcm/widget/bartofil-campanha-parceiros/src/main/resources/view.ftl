<div id="campanha_parceiros_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros"
	data-params="campanhaparceiros.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}'})">

	<div class="page-header">
		<h2>CAMPANHA TRIMESTRAL</h2>
	</div>
	
	
	<div class="list-group">
	    <div class="list-group-item active">
	        <h4 class="list-group-item-heading">SUA PONTUA&Ccedil;&Atilde;O</h4>
	        <div class="list-group-item-text">
	        </div>
	    </div>
	</div>
	
   	<script type="text/template" class="tpl-my-ranking">
		<form class="form-horizontal" role="form">
			<div class="form-group">
				<label class="col-sm-2 control-label">Sua classifica&ccedil;&atilde;o atual:</label>
				<div class="col-sm-2">
		            <input type="text" class="form-control fs-txt-right" id="ordem-premio-trimestre" readonly value="{{ordem}}">
	    		</div>
				<label class="col-sm-2 control-label">Sua premia&ccedil;&atilde;o atual:</label>
	    		<div class="col-sm-2">
	            	<input type="text" class="form-control" id="premiacao-atual" readonly value="{{premiacao}}" >
	    		</div>
				<label class="col-sm-2 control-label">Sua pontua&ccedil;&atilde;o atual:</label>
	    		<div class="col-sm-2">
	            	<input type="text" class="form-control fs-txt-right" id="pontos-trimestre" readonly value="{{pontos}}">
	    		</div>
	    	</div>
	    	<div class="form-group">
	    		<label class="col-sm-2 control-label">Situa&ccedil;&atilde;o atual da campanha:</label>
	    		<div class="col-sm-2">
	            	<input type="text" class="form-control fs-txt-right" id="situacao-trimestre" readonly value="{{{situacao}}}" >
	    		</div>
	    		<label class="col-sm-2 control-label">Informa&ccedil;&otilde;es atualizadas em:</label>
	    		<div class="col-sm-2">
	            	<input type="text" class="form-control" id="data-processamento-trimestre" readonly value="{{data}}" >
	    		</div>
				<label class="col-sm-2 control-label">Seu grupo na Campanha:</label>
	    		<div class="col-sm-2">
	            	<input type="text" class="form-control" id="grupo-trimestre" readonly value="{{grupo}}" >
	    		</div>
	    	</div>
		</form>
	</script>	
	
	<div class="row">
		<label class="radio-inline">
	    	<input type="radio" name="radio-classificacao" id="tab-colocacao" data-click-tab-parceiro checked data-tab="tab-colocacao" value="tab-colocacao">Classifica&ccedil;&atilde;o
		</label>
		<label class="radio-inline">
	    	<input type="radio" name="radio-classificacao" id="tab-detalhamento" data-click-tab-parceiro data-tab="tab-detalhamento" value="tab-detalhamento">Apuração detalhada
		</label>
	</div>
	<br>
	<form class="form-inline tab-colocacao" role="form">
		<label class='nav-representative fs-display-none'>PESQUISA POR C&Oacute;DIGO:</label>
        <div class="form-group nav-representative fs-display-none">
            <input type="text" class="form-control" id="busca" placeholder="Digite o c&oacute;digo de RCA">
        </div>
		<label class="fs-text-uppercase">${i18n.getTranslation('trimestre')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="trimestre" data-change-trimestre-parceiro>
    			<option value="01">1</option>
    			<option value="02">2</option>
    			<option value="03">3</option>
    			<option value="04">4</option>
    		</select>
    	</div>
    	<div class="form-group">
    		<a class="btn btn-default" href="#" data-click-minha-colocacao role="button">Ver minha coloca&ccedil;&atilde;o</a>
    	</div>
	</form>
	<br>
	<div class="table-responsive">
	   	<table id="table-ranking" class="table table-striped with-border table-hover table-condensed tab-colocacao">
	   		<thead>
	   			<tr class="primary">
	   				<th class="fs-txt-right">${i18n.getTranslation('codigo')}</th>
	   				<th class="fs-txt-right">${i18n.getTranslation('pontos')}</th>
	   				<th class="fs-txt-right">${i18n.getTranslation('ordem')}</th>
	   				<th class="fs-txt-right">${i18n.getTranslation('premio')}</th>
	   				<th class="fs-txt-left">${i18n.getTranslation('equipe')}</th>
	   			</tr>
	   		</thead>
	   		<tbody>
	   		</tbody>
	   	</table>
	</div>
   	<script type="text/template" class="tpl-item-ranking">
    	{{#items}}
 			<tr class="{{premiado}}">
 				<td class="fs-txt-right">{{{codigo}}}</td>
 				<td class="fs-txt-right">{{pontos}}</td>
 				<td class="fs-txt-right">{{{ordem}}}</td>
 				<td class="fs-txt-right">{{{premio}}}</td>
 				<td class="fs-txt-left">{{equipe}}</td>
 			</tr>
       	{{/items}}
   	</script>
   	
   	<div class="panel-group tab-detalhamento fs-display-none"></div>
   		
   	<script type="text/template" class="tpl-detalhamento">
	    <div class="panel panel-default">
	        <div class="panel-heading">
	            <h4 class="panel-title">
	                <a class="collapse-icon" data-toggle="collapse" data-parent="#accordion" href="{{hashid}}">
	                	<span class="badge {{classbadge}}" style="float: right;margin-right: 25px;">{{total}}</span>
	                	{{quesito}}
	                </a>
	            </h4>
	        </div>
	        <div id="{{id}}" class="panel-collapse collapse">
	            <div class="panel-body">
	            	<div class="row"> 
	            		 <div class="col-md-12">
							<div class="table-responsive">
							   	<table class="table table-striped with-border table-hover table-condensed">
							   		<thead>
							   			<tr class="primary">
							   				<th class="fs-txt-left">Inicio</th>
							   				<th class="fs-txt-left">Final</th>
							   				<th class="fs-txt-right">Pontos Apurados</th>
							   				<th class="fs-txt-right">Cobran&ccedil;a</th>
							   				<th class="fs-txt-right">Pontos</th>
							   				<th class="fs-txt-left">Detalhe</th>
							   			</tr>
							   		</thead>
							   		<tbody>
								    	{{#items}}
								 			<tr>
								 				<td class="fs-txt-left">{{datainicio}}</td>
								 				<td class="fs-txt-left">{{datafinal}}</td>
								 				<td class="fs-txt-right">{{pontosapurados}}</td>
								 				<td class="fs-txt-right">{{cobranca}}</td>
								 				<td class="fs-txt-right">{{pontos}}</td>
								 				<td class="fs-txt-left">{{detalhe}}</td>
								 			</tr>
								       	{{/items}}
							   		</tbody>
							   	</table>
							 </div>
	            		 </div>
	            	</div>
	            </div>
	        </div>
	    </div>   		
	</script>
   		
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

