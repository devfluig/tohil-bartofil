<div id="campanha_parceiros_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros"
	data-params="campanhaparceiros.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}'})">

	<div class="page-header">
		<h2>${i18n.getTranslation('posicao.rca.campanha')}</h2>
	</div>
	
	<div class="list-group">
	    <div class="list-group-item active">
	        <h4 class="list-group-item-heading">SUA PONTUA&Ccedil;&Atilde;O</h4>
	        <div class="list-group-item-text">
				<form class="form-inline" role="form">
					<label>Ordem pr&ecirc;mio:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="ordem-premio-trimestre" readonly>
			    	</div>
					<label>Situa&ccedil;&atilde;o:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="situacao-trimestre" readonly >
			    	</div>
					<label>Data processamento:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="data-processamento-trimestre" readonly >
			    	</div>
					<label>Pontos:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="pontos-trimestre" readonly>
			    	</div>
				</form>	
	        </div>
	    </div>
	</div>
	
	
	<ul class="nav nav-pills clearfix" role="tablist">
	    <li class="active" data-click-tab-parceiro data-tab="tab-colocacao"><a href="#">${i18n.getTranslation('colocacao.trimestre')}</a></li>
	    <li data-click-tab-parceiro data-tab="tab-detalhamento"><a href="#">${i18n.getTranslation('detalhamento')}</a></li>
	</ul>
	<br>
	<form class="form-inline tab-colocacao" role="form">
		<label>${i18n.getTranslation('ordernar.por')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="ordenar" data-change-ordenar-parceiro>
    			<option value="ordem" data-type="integer">${i18n.getTranslation('colocacao')}</option>
    			<option value="nome" data-type="string">${i18n.getTranslation('nome')}</option>
    			<option value="pontos" data-type="integer">${i18n.getTranslation('pontos')}</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('por.pagina')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao" data-change-paginacao-parceiro>
    			<option value="30">30</option>
    			<option value="50">50</option>
    			<option value="75">75</option>
    			<option value="100">100</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('busca')}:</label>
        <div class="form-group">
            <input type="text" class="form-control" id="busca" placeholder="${i18n.getTranslation('digite.texto')}">
        </div>
		<label class="fs-text-uppercase">${i18n.getTranslation('trimestre')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="trimestre" data-change-trimestre-parceiro>
    			<option value="1">1</option>
    			<option value="2">2</option>
    			<option value="3">3</option>
    			<option value="4">4</option>
    		</select>
    	</div>
	</form>
	<br>
   	<table id="table-ranking" class="table table-striped with-border table-hover table-condensed tab-colocacao">
   		<thead>
   			<tr class="primary">
   				<th class="fs-txt-left">${i18n.getTranslation('codigo')}</th>
   				<th class="fs-txt-left">${i18n.getTranslation('pontos')}</th>
   				<th class="fs-txt-left">${i18n.getTranslation('ordem')}</th>
   				<th class="fs-txt-right">${i18n.getTranslation('premio')}</th>
   				<th class="fs-txt-left">${i18n.getTranslation('equipe')}</th>
   			</tr>
   		</thead>
   		<tbody>
   		</tbody>
   	</table>
   	<script type="text/template" class="tpl-item-ranking">
    	{{#items}}
 			<tr class="{{premiado}}">
 				<td class="fs-txt-left">{{codigo}}</td>
 				<td class="fs-txt-left">{{pontos}}</td>
 				<td class="fs-txt-left">{{ordem}}</td>
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
	            		 <div class="col-md-4 col-md-offset-8">
						   	<table class="table table-striped with-border table-hover table-condensed">
						   		<thead>
						   			<tr class="primary">
						   				<th class="fs-txt-left">${i18n.getTranslation('inicio')}</th>
						   				<th class="fs-txt-left">${i18n.getTranslation('final')}</th>
						   				<th class="fs-txt-left">${i18n.getTranslation('apurado')}</th>
						   				<th class="fs-txt-left">${i18n.getTranslation('pontos')}</th>
						   			</tr>
						   		</thead>
						   		<tbody>
							    	{{#items}}
							 			<tr>
							 				<td class="fs-txt-center">{{datainicio}}</td>
							 				<td class="fs-txt-center">{{datafinal}}</td>
							 				<td class="fs-txt-center">{{apurado}}</td>
							 				<td class="fs-txt-center">{{pontos}}</td>
							 			</tr>
							       	{{/items}}
						   		</tbody>
						   	</table>
	            		 </div>
	            	</div>
	            </div>
	        </div>
	    </div>   		
	</script>
   		
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

