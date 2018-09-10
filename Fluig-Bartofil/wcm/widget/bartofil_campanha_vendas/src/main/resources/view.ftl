<div id="campanha_vendas_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-campanha"
	data-params="campanhavendas.instance({instanceId: ${instanceId}, foldercampanha: '${foldercampanha!''}'})">

	<div class="page-header">
		<h1>${i18n.getTranslation('divulgacao.campanha')}</h1>
	</div>

	<form class="form-inline itens-campanha" role="form">
		<label>${i18n.getTranslation('ordernar.por')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="ordenar" data-change-ordenar>
    			<option value="1">${i18n.getTranslation('data.prorrogado')}</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('por.pagina')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao" data-change-paginacao>
    			<option value="8">8</option>
    			<option value="16">16</option>
    			<option value="24">24</option>
    			<option value="32">32</option>
    			<option value="">Todas</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('busca')}:</label>
        <div class="form-group">
            <input type="text" class="form-control" id="busca" placeholder="${i18n.getTranslation('digite.texto')}">
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
				            <p style="padding-top: 10px;"><span class="label label-default">Iniciado em {{dainiciado}}</span><span class="label {{classlabel}}">{{labelfim}}</span></p>
				        </div>
				    </div>
				</div>
	        {{/items}}
	    </div>
    </script>
	
   	<div class="table-responsive fs-display-none premiados">
		<div class="panel panel-default">
		    <div class="panel-heading">DETALHES DA CAMPANHA<button type="button" class="btn btn-default fs-float-right" data-click-fechar>Fechar</button></div>
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
				    				<th>${i18n.getTranslation('nome.rca')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('apurado')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('premiacao')}</th>
				    				<th>${i18n.getTranslation('equipe')}</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    			<tr class="success">
				    				<td class="fs-txt-center">Premiado</td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">3</td>
				    				<td class="fs-txt-center">20683</td>
				    				<td>Marcelo</td>
				    				<td class="fs-txt-center">10.221,80</td>
				    				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;1.100,00</td>
				    				<td>Bahia 2</td>
				    			</tr>
				    		</tbody>
				    	</table>
						<ul class="list-group">
						    <li class="list-group-item list-group-item-info">Ranking Geral</li>
						</ul>	    		
				    	<table id="table-ranking" class="table table-striped with-border table-hover table-condensed">
				    		<thead>
				    			<tr class="primary">
				    				<th class="fs-txt-center">${i18n.getTranslation('situacao')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('gp')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('pos')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('rca')}</th>
				    				<th>${i18n.getTranslation('nome.rca')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('apurado')}</th>
				    				<th class="fs-txt-center">${i18n.getTranslation('premiacao')}</th>
				    				<th>${i18n.getTranslation('equipe')}</th>
				    			</tr>
				    		</thead>
				    		<tbody>
				    			<tr class="success">
				    				<td class="fs-txt-center">Premiado</td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">20683</td>
				    				<td>Marcelo</td>
				    				<td class="fs-txt-center">10.221,80</td>
				    				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;1.100,00</td>
				    				<td>Bahia 2</td>
				    			</tr>
				    			<tr class="success">
				    				<td class="fs-txt-center">Premiado</td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">2</td>
				    				<td class="fs-txt-center">31940</td>
				    				<td>Anderson</td>
				    				<td class="fs-txt-center">7.790,77</td>
				    				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;1.000,00</td>
				    				<td>Norte 2</td>
				    			</tr>
				    			<tr class="success">
				    				<td class="fs-txt-center">Premiado</td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">3</td>
				    				<td class="fs-txt-center">22860</td>
				    				<td>Anderson</td>
				    				<td class="fs-txt-center">7.550,16</td>
				    				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;900,00</td>
				    				<td>Rio de Janeiro</td>
				    			</tr>
				    			<tr class="success">
				    				<td class="fs-txt-center">Premiado</td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">4</td>
				    				<td class="fs-txt-center">22046</td>
				    				<td>Donato</td>
				    				<td class="fs-txt-center">7.337,02</td>
				    				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;800,00</td>
				    				<td>Rio de Janeiro</td>
				    			</tr>
				    			<tr class="success">
				    				<td class="fs-txt-center">Premiado</td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">5</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;700,00</td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">6</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">7</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">7</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">7</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">7</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">7</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">7</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    			<tr>
				    				<td></td>
				    				<td class="fs-txt-center">1</td>
				    				<td class="fs-txt-center">7</td>
				    				<td class="fs-txt-center">12725</td>
				    				<td>Joao Alves</td>
				    				<td class="fs-txt-center">7.312,06</td>
				    				<td></td>
				    				<td>Minas Gerais 4</td>
				    			</tr>
				    		</tbody>
				    	</table>
		    		</div>
		    		<div class="col-md-5 col-sm-3 list-imagens-detail">
			            <span class="fluigicon fluigicon-chevron-left fluigicon-md prev-image" data-image-prev></span>
			            <img src="/bartofil_campanha_vendas/resources/images/campanha1.png image-detail" style="width: 80%">
			            <span class="fluigicon fluigicon-chevron-right fluigicon-md next-image" data-image-next></span>
		    		</div>
		    	</div>
		    </div>
		</div>   		
    </div>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

