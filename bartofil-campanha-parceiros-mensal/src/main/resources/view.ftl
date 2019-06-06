<div id="campanha_mensal_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros-mensal"
	data-params="campanhaparceirosmensal.instance({instanceId: ${instanceId}, foldercampanha: '${foldercampanha!''}', grouprca: '${grouprca!''}'})">

	<div class="page-header">
		<h1>CAMPANHA DE PARCEIROS MENSAL</h1>
	</div>

	<form class="form-inline header-itens-campanha-mensal" role="form">
		<label>${i18n.getTranslation('ordernar.por')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="ordenar-mensal" data-change-ordenar-mensal>
    			<option value="id" data-type="integer">Nº DO CONCURSO</option>
    			<option value="dtainicio" data-type="date">DATA INICIO</option>
    			<option value="dtaprorrogado" data-type="date">${i18n.getTranslation('data.prorrogado')}</option>
    			<option value="dtaencerrado" data-type="date">DATA ENCERRAMENTO</option>
    			<option value="descricao" data-type="string">DESCRI&Ccedil;&Atilde;O</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('busca')}:</label>
        <div class="form-group">
            <input type="text" class="form-control" id="busca-concurso-mensal" placeholder="${i18n.getTranslation('digite.texto')}">
        </div>
	</form>
	<br>
	
    <script type="text/template" class="tpl-continuous-scroll-campanhas-mensal">
		<div class="row clearfix itens-campanha-mensal">
	        {{#items}}
				<div class="col-sm-4 col-md-3">
				    <div class="thumbnail" data-click-campanha-mensal data-id="{{id}}">
				        <img id="img-mensal-{{id}}" src="{{image}}" style="height: 300px;">
				        <div class="caption">
				            <h4>{{id}} - {{descricao}}</h4>
				            <p>{{{posicao}}}<button type="button" class="btn {{classbutton}} fs-float-right"><span class="fluigicon fluigicon-query-ordered"></span>&nbsp;Prêmios</button></p>
				            <p style="padding-top: 5px;"><span class="label label-default">Iniciada {{dainiciado}}</span><span class="label {{classlabel}}">{{labelfim}}</span></p>
				        </div>
				    </div>
				</div>
	        {{/items}}
	    </div>
    </script>
	
   	<div class="table-responsive fs-display-none premiados-mensal">
		<div class="panel panel-info">
		    <div class="panel-heading" style="height: 53px;"><span class="title-detail-mensal">DETALHES</span><button type="button" class="btn btn-default fs-float-right" data-click-fechar-mensal>Voltar</button></div>
		    <div class="panel-body">
		    	<div class="row">
		    		<div class="col-md-7 col-sm-9">
						<ul class="list-group">
						    <li class="list-group-item active">Minha posição</li>
						</ul>	    		
				    	<table id="table-myranking-mensal" class="table table-striped with-border table-hover table-condensed">
				    		<thead>
				    			<tr class="primary">
				    				<th class="fs-txt-left">${i18n.getTranslation('situacao')}</th>
				    				<th class="fs-txt-right">Grupo</th>
				    				<th class="fs-txt-right">Posi&ccedil;&atilde;o</th>
				    				<th class="fs-txt-right">${i18n.getTranslation('rca')}</th>
				    				<th class="fs-txt-right">Pontos</th>
				    				<th class="fs-txt-right">${i18n.getTranslation('premiacao')}</th>
				    				<th class="fs-txt-left">${i18n.getTranslation('equipe')}</th>
				    				<th class="fs-txt-left">Detalhes</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    		</tbody>
				    	</table>
						<ul class="list-group">
						    <li class="list-group-item active">Classifica&ccedil;&atilde;o do Concurso</li>
						</ul>	    		
				    	<table id="table-ranking-vendas-mensal" class="table table-striped with-border table-hover table-condensed">
				    		<thead>
				    			<tr class="primary">
				    				<th class="fs-txt-left">${i18n.getTranslation('situacao')}</th>
				    				<th class="fs-txt-right">Grupo</th>
				    				<th class="fs-txt-right">Posi&ccedil;&atilde;o</th>
				    				<th class="fs-txt-right">${i18n.getTranslation('rca')}</th>
				    				<th class="fs-txt-right">Pontos</th>
				    				<th class="fs-txt-right">${i18n.getTranslation('premiacao')}</th>
				    				<th class="fs-txt-left">${i18n.getTranslation('equipe')}</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    		</tbody>
				    	</table>
				    	
					   	<script type="text/template" class="tpl-item-ranking-vendas-mensal">
					    	{{#items}}
					 			<tr class="{{premiado}}">
					 				<td class="fs-txt-left">{{{situacao}}}</td>
					 				<td class="fs-txt-right">{{grupo}}</td>
					 				<td class="fs-txt-right">{{posicao}}</td>
					 				<td class="fs-txt-right">{{{rca}}}</td>
					 				<td class="fs-txt-right">{{{pontos}}}</td>
					 				<td class="fs-txt-right">{{{premio}}}</td>
					 				<td class="fs-txt-left">{{equipe}}</td>
					 			</tr>
					       	{{/items}}
					   	</script>
				    	
		    		</div>
		    		<div class="col-md-5 col-sm-3 list-imagens-detail-mensal">
			            <a href="#" data-image-prev-mensal><span class="fluigicon fluigicon-chevron-left fluigicon-md prev-image"></span></a>
			            <img src="" class="image-detail">
			            <a href="#" data-image-next-mensal><span class="fluigicon fluigicon-chevron-right fluigicon-md next-image"></span></a>
		    		</div>
		    	</div>
		    </div>
		</div>   		
    </div>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

