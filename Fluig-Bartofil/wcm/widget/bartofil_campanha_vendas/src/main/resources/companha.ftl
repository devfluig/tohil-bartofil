<div id="campanha_vendas_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
	data-params="campanhavendas.instance()">

	<div class="page-header">
		<h1>${i18n.getTranslation('diculgacao.campanha')}</h1>
	</div>

	<div class="row">
		<form class="navbar-form navbar-left" role="search">
			<label>${i18n.getTranslation('ordernar.por')}:</label>
	    	<div class="form-group">
	    		<select class="form-control" id="ordenar" data-change-ordenar>
	    			<option value="1">${i18n.getTranslation('data.prorrogado')}</option>
	    		</select>
	    	</div>
			<label>${i18n.getTranslation('por.pagina')}:</label>
	    	<div class="form-group">
	    		<select class="form-control" id="ordenar" data-change-ordenar>
	    			<option value="10">10</option>
	    			<option value="20">20</option>
	    			<option value="50">50</option>
	    			<option value="100">100</option>
	    		</select>
	    	</div>
			<label>${i18n.getTranslation('busca')}:</label>
	        <div class="form-group">
	            <input type="text" class="form-control" id="busca" placeholder="${i18n.getTranslation('digite.texto')}">
	        </div>
		</form>
	</div>	
	
   	<div class="table-responsive">
    	<table id="table-campanhas" class="table table-striped table-hover table-condensed">
    		<thead>
    			<tr>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('cod')}</th>
    				<th class="text-uppercase">${i18n.getTranslation('campanha')}</th>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('posicao')}</th>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('gp')}</th>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('inicio')}</th>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('final')}</th>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('prorrogado')}</th>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('apuracao')}</th>
    				<th class="text-uppercase fs-txt-center">${i18n.getTranslation('acao')}</th>
    			</tr>
    		</thead>
    		<tbody>
    			<tr>
    				<td class="fs-txt-center">1556</td>
    				<td>AMERICAN PETS - VALOR VENDA</td>
    				<td class="fs-txt-center">357/998</td>
    				<td class="fs-txt-center">1</td>
    				<td class="fs-txt-center">01/04/2017</td>
    				<td class="fs-txt-center">30/06/2017</td>
    				<td class="fs-txt-center">31/07/2017</td>
    				<td class="fs-txt-center">31/07/2017</td>
    				<td>
    					<button type="button" class="btn btn-primary" onclick="$('#table-premissao').removeClass('fs-display-none')"><span class="fluigicon fluigicon-role-lists fluigicon-sm"></span>&nbsp;C</button>
    					<button type="button" class="btn btn-danger" disabled>R$ 0,00&nbsp;<span class="fluigicon fluigicon-thumbs-down fluigicon-sm"></span></button>
    				</td>
    			</tr>
    			<tr>
    				<td class="fs-txt-center">1557</td>
    				<td>AMERICAN - VALOR VENDA</td>
    				<td class="fs-txt-center">2/998</td>
    				<td class="fs-txt-center">1</td>
    				<td class="fs-txt-center">01/04/2017</td>
    				<td class="fs-txt-center">30/06/2017</td>
    				<td class="fs-txt-center">31/07/2017</td>
    				<td class="fs-txt-center">31/07/2017</td>
    				<td>
    					<button type="button" class="btn btn-primary" onclick="$('#table-premissao').removeClass('fs-display-none')"><span class="fluigicon fluigicon-role-lists fluigicon-sm"></span>&nbsp;C</button>
    					<button type="button" class="btn btn-success">R$ 100,00&nbsp;<span class="fluigicon fluigicon-thumbs-up fluigicon-sm"></button>
    				</td>
    			</tr>
    		</tbody>
    	</table>
    </div>
   	<div class="table-responsive">
    	<table id="table-premissao" class="table table-striped with-border table-hover table-condensed fs-display-none">
    		<thead>
    			<tr class="primary">
    				<th class="fs-txt-center">${i18n.getTranslation('situacao')}</th>
    				<th class="fs-txt-center">${i18n.getTranslation('gp')}</th>
    				<th class="fs-txt-center">${i18n.getTranslation('ord')}</th>
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
    				<td class="fs-txt-center" colspan="8"><button type="button" class="btn btn-default" onclick="$('#table-premissao').addClass('fs-display-none')">Fechar</button></td>
    			</tr>
    		</tbody>
    	</table>
    </div>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

