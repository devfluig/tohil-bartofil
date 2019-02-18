<div id="campanha_parceiros_anual_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros-anual"
	data-params="campanhaparceirosanual.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}'})">

	<div class="page-header">
		<h2>CAMPANHA PARCEIROS ANUAL 100%</h2>
	</div>
	
	<div class="list-group">
	    <div class="list-group-item active">
	        <h4 class="list-group-item-heading">SUA PONTUA&Ccedil;&Atilde;O</h4>
	        <div>
				<form class="form-horizontal" role="form">
					<div class="form-group">
						<label class="col-sm-2 control-label">Ordem pr&ecirc;mio:</label>
						<div class="col-sm-1">
				            <input type="text" class="form-control fs-txt-right" id="ordem-premio-anual" readonly >
			    		</div>
			    		<label class="col-sm-1 control-label">Situa&ccedil;&atilde;o:</label>
			    		<div class="col-sm-2">
			            	<input type="text" class="form-control fs-txt-right" id="situacao-anual" readonly >
			    		</div>
						<label class="col-sm-1 control-label">Pontos:</label>
			    		<div class="col-sm-2">
			            	<input type="text" class="form-control fs-txt-right" id="status-anual" readonly >
			    		</div>
			    	</div>
			    	<div class="form-group">
			    		<label class="col-sm-2 control-label">Data processamento:</label>
			    		<div class="col-sm-2">
			            	<input type="text" class="form-control" id="data-processamento-anual" readonly >
			    		</div>
						<label class="col-sm-2 control-label">Grupo:</label>
			    		<div class="col-sm-5">
			            	<input type="text" class="form-control" id="grupo-anual" readonly >
			    		</div>
			    	</div>
	        	</form>
	        </div>
	    </div>
	</div>
	
	<ul class="nav nav-pills clearfix" role="tablist">
	    <li class="active" data-click-tab-parceiro-anual data-tab="tab-colocacao-anual"><a href="#">ANUAL</a></li>
	    <li data-click-tab-parceiro-anual data-tab="tab-detalhamento-anual"><a href="#">DETALHAMENTO</a></li>
	</ul>
	<br>
	
	<form class="form-inline tab-colocacao-anual" role="form">
		<label>${i18n.getTranslation('ordernar.por')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="ordenar-anual" data-change-ordenar-parceiro-anual>
    			<option value="ordem" data-type="integer">${i18n.getTranslation('colocacao')}</option>
    			<option value="codigo" data-type="string">C&Oacute;DIGO</option>
    			<option value="pontos" data-type="integer">${i18n.getTranslation('pontos')}</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('por.pagina')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao-anual" data-change-paginacao-parceiro-anual>
    			<option value="30">30</option>
    			<option value="50">50</option>
    			<option value="75">75</option>
    			<option value="100">100</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('busca')}:</label>
        <div class="form-group">
            <input type="text" class="form-control" id="busca-anual" placeholder="Digite o texto">
        </div>
	</form>
	<br>
	<div class="table-responsive">
	   	<table id="table-campanha-anual" class="table table-striped with-border table-hover table-condensed tab-campannha-anual tab-colocacao-anual">
	   		<thead>
	   			<tr class="primary">
	   				<th class="fs-txt-right">C&oacute;digo</th>
	   				<th class="fs-txt-right">Pontos</th>
	   				<th class="fs-txt-right">Ordem</th>
	   				<th class="fs-txt-right">Pr&ecirc;mio</th>
	   				<th class="fs-txt-left">Equipe</th>
	   			</tr>
	   		</thead>
	   		<tbody>
	   		</tbody>
	   	</table>
	</div>
   	<script type="text/template" class="tpl-item-campanha-anual">
    	{{#items}}
 			<tr class="{{premiado}}">
 				<td class="fs-txt-right">{{{codigo}}}</td>
 				<td class="fs-txt-right">{{pontos}}</td>
 				<td class="fs-txt-right">{{ordem}}</td>
 				<td class="fs-txt-right">{{{premio}}}</td>
 				<td class="fs-txt-left">{{equipe}}</td>
 				<td class="fs-txt-left">{{grupo}}</td>
 			</tr>
       	{{/items}}
   	</script>
   	
   	<div class="panel-group tab-detalhamento-anual fs-display-none"></div>
   		
   	<script type="text/template" class="tpl-detalhamento-anual">
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

