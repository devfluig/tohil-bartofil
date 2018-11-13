<div id="extrato_campanha_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide toprint widget-extrato"
	data-params="extratocampanha.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}' })">

	<div class="page-header">
		<h2>${i18n.getTranslation('extrato.comissao')}</h2>
	</div>

	<div class="panel-group" id="accordion">
	    <div class="panel panel-info detalhado">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion">${i18n.getTranslation('extrato.comissao.representante.detalhado')}</a>
	            </h4>
	        </div>
	        <div id="collapseThree" class="panel-collapse collapse in">
	            <div class="panel-body">
	            	<div class="table-responsive">
		            	<table id="table-lancamentos" class="table table-striped table-hover table-condensed">
		            		<thead class="detalhado">
		            			<tr>
		            				<th>${i18n.getTranslation('data.lancto')}</th>
		            				<th>${i18n.getTranslation('evt')}</th>
		            				<th>${i18n.getTranslation('carga')}</th>
		            				<th>${i18n.getTranslation('nota.fiscal')}</th>
		            				<th class="text-uppercase">${i18n.getTranslation('pedido')}</th>
		            				<th class="fs-txt-center">${i18n.getTranslation('parc')}</th>
		            				<th>${i18n.getTranslation('historico')}</th>
		            				<th>${i18n.getTranslation('valor')}</th>
		            				<th class="fs-txt-center">${i18n.getTranslation('d.c')}</th>
		            			</tr>
		            		</thead>
		            		<tbody>
		            		</tbody>
		            		<tfoot>
		            		</tfoot>
		            	</table>
		            </div>
				</div>
	        </div>
	    </div>
	    <div class="panel panel-info">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion">${i18n.getTranslation('extrato.comissao.representante.mes')}&nbsp;<span class="title-periodo"></span></a>
	            </h4>
	        </div>
	        <div id="collapseOne" class="panel-collapse collapse in">
	            <div class="panel-body">
	            	<div class="table-responsive">
		            	<table id="table-meses" class="table table-striped table-hover table-condensed">
		            		<thead>
		            			<tr>
		            				<th class="fs-txt-center">${i18n.getTranslation('data.entrada.pedido')}</th>
		            				<th class="fs-txt-center">${i18n.getTranslation('valor')}</th>
		            			</tr>
		            		</thead>
		            		<tbody></tbody>
		            		<tfoot></tfoot>
		            	</table>
		            </div>
				</div>
	        </div>
	    </div>
	    <div class="panel panel-info">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion">${i18n.getTranslation('extrato.comissao.representante.resumo')}</a>
	            </h4>
	        </div>
	        <div id="collapseOne" class="panel-collapse collapse in">
	            <div class="panel-body">
	            	<div class="table-responsive">
		            	<table id="table-eventos" class="table table-striped table-hover table-condensed">
		            		<thead>
		            			<tr>
		            				<th class="fs-txt-center">${i18n.getTranslation('codigo')}</th>
		            				<th class="fs-txt-center no-mobile">${i18n.getTranslation('descricao')}</th>
		            				<th class="fs-txt-center">${i18n.getTranslation('valor.debito')}</th>
		            				<th class="fs-txt-center">${i18n.getTranslation('valor.credito')}</th>
		            			</tr>
		            		</thead>
		            		<tbody>
		            		</tbody>
		            	</table>
		            </div>
				</div>
	        </div>
	    </div>
    </div>	
	
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

