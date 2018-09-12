<div id="campanha_vendas_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-campanha"
	data-params="campanhavendas.instance({instanceId: ${instanceId}, foldercampanha: '${foldercampanha!''}', grouprca: '${grouprca!''}'})">

	<div class="page-header">
		<h1>${i18n.getTranslation('divulgacao.campanha')}</h1>
	</div>

	<form class="form-inline header-itens-campanha" role="form">
		<label>${i18n.getTranslation('ordernar.por')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="ordenar" data-change-ordenar>
    			<option value="id" data-type="integer">C&Oacute;DIGO</option>
    			<option value="dtainicio" data-type="date">DATA INICIO</option>
    			<option value="dtaprorrogado" data-type="date">${i18n.getTranslation('data.prorrogado')}</option>
    			<option value="dtaencerrado" data-type="date">DATA ENCERRAMENTO</option>
    			<option value="descricao" data-type="string">DESCRI&Ccedil;&Atilde;O</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('por.pagina')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao" data-change-paginacao>
    			<option value="8">8</option>
    			<option value="16">16</option>
    			<option value="24">24</option>
    			<option value="32">32</option>
    			<option value="999">Todas</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('busca')}:</label>
        <div class="form-group">
            <input type="text" class="form-control" id="busca" placeholder="${i18n.getTranslation('digite.texto')}">
        </div>
		<label class="fs-md-space nav-representative fs-display-none">${i18n.getTranslation('representante')}:</label>
    	<div class="form-group nav-representative fs-display-none">
    		<select class="form-control" id="listrepresentatives" data-change-representante>
			    <script type="text/template" class="tpl-representante">
			        {{#items}}
		    			<option value="{{id}}">{{name}}</option>
			        {{/items}}
			    </script>
    		</select>
    	</div>
	</form>
	<br>
	
    <script type="text/template" class="tpl-continuous-scroll-campanhas">
		<div class="row clearfix itens-campanha">
	        {{#items}}
				<div class="col-sm-4 col-md-3">
				    <div class="thumbnail" data-click-campanha data-id="{{id}}">
				        <img id="img{{id}}" src="{{image}}" style="height: 300px;">
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
	
   	<div class="table-responsive fs-display-none premiados">
		<div class="panel panel-info">
		    <div class="panel-heading" style="height: 53px;">DETALHES DA CAMPANHA<button type="button" class="btn btn-default fs-float-right" data-click-fechar>Voltar</button></div>
		    <div class="panel-body">
		    	<div class="row">
		    		<div class="col-md-7 col-sm-9">
						<ul class="list-group">
						    <li class="list-group-item active">Minha posição</li>
						</ul>	    		
				    	<table id="table-myranking" class="table table-striped with-border table-hover table-condensed">
				    		<thead>
				    			<tr class="primary">
				    				<th class="fs-txt-center">${i18n.getTranslation('situacao')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('gp')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('pos')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('rca')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('apurado')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('premiacao')}</th>
				    				<th>${i18n.getTranslation('equipe')}</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    		</tbody>
				    	</table>
						<ul class="list-group">
						    <li class="list-group-item list-group-item-warning">Ranking Geral</li>
						</ul>	    		
				    	<table id="table-ranking" class="table table-striped with-border table-hover table-condensed">
				    		<thead>
				    			<tr class="primary">
				    				<th class="fs-txt-center">${i18n.getTranslation('situacao')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('gp')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('pos')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('rca')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('apurado')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('premiacao')}</th>
				    				<th>${i18n.getTranslation('equipe')}</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    		</tbody>
				    	</table>
		    		</div>
		    		<div class="col-md-5 col-sm-3 list-imagens-detail">
			            <a href="#" data-image-prev><span class="fluigicon fluigicon-chevron-left fluigicon-md prev-image"></span></a>
			            <img src="/bartofil_campanha_vendas/resources/images/campanha1.png" class="image-detail" style="width: 90%">
			            <a href="#" data-image-next><span class="fluigicon fluigicon-chevron-right fluigicon-md next-image"></span></a>
		    		</div>
		    	</div>
		    </div>
		</div>   		
    </div>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

