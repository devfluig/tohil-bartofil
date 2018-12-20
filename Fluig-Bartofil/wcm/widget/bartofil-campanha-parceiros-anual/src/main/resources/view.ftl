<div id="campanha_parceiros_anual_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros-anual"
	data-params="campanhaparceirosanual.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}'})">

	<div class="page-header">
		<h2>CAMPANHA PARCEIROS ANUAL 100%</h2>
	</div>
	
	<div class="list-group">
	    <div class="list-group-item active">
	        <h4 class="list-group-item-heading">SUA PONTUA&Ccedil;&Atilde;O</h4>
	        <div class="list-group-item-text">
				<form class="form-inline" role="form">
					<label>Ordem pr&ecirc;mio:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="ordem-premio-anual" readonly>
			    	</div>
					<label>Situa&ccedil;&atilde;o:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="situacao-anual" readonly >
			    	</div>
					<label>Data processamento:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="data-processamento-anual" readonly >
			    	</div>
					<label>Status:</label>
			    	<div class="form-group">
			            <input type="text" class="form-control" id="status-anual" readonly>
			    	</div>
				</form>	
	        </div>
	    </div>
	</div>
	
	
	<form class="form-inline tab-colocacao" role="form">
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
   	<table id="table-campanha-anual" class="table table-striped with-border table-hover table-condensed tab-campannha-anual">
   		<thead>
   			<tr class="primary">
   				<th class="fs-txt-left">C&oacute;digo</th>
   				<th class="fs-txt-left">Pontos</th>
   				<th class="fs-txt-left">Ordem</th>
   				<th class="fs-txt-right">Pr&ecirc;mio</th>
   				<th class="fs-txt-left">Equipe</th>
   			</tr>
   		</thead>
   		<tbody>
   		</tbody>
   	</table>
   	<script type="text/template" class="tpl-item-campanha-anual">
    	{{#items}}
 			<tr class="{{premiado}}">
 				<td class="fs-txt-left">{{{codigo}}}</td>
 				<td class="fs-txt-left">{{pontos}}</td>
 				<td class="fs-txt-left">{{ordem}}</td>
 				<td class="fs-txt-right">{{{premio}}}</td>
 				<td class="fs-txt-left">{{equipe}}</td>
 			</tr>
       	{{/items}}
   	</script>
   	
   	<script type="text/template" class="tpl-detalhamento-anual">
    	{{#items}}
 			<tr>
 				<td class="fs-txt-left">{{datainicio}}</td>
 				<td class="fs-txt-left">{{datafinal}}</td>
 				<td class="fs-txt-left">{{apurado}}</td>
 				<td class="fs-txt-left">{{pontos}}</td>
 			</tr>
       	{{/items}}
	</script>
   		
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

