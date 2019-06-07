<div id="extrato_campanha_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide toprint widget-extrato"
	data-params="extratocampanha.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}' })">

	<div class="page-header">
		<h2>${i18n.getTranslation('extrato.comissao')}</h2>
	</div>

	<div class="panel-group" id="accordionextrato">
	    <div class="panel panel-info">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordionextrato">Extrato de comiss&atilde;o de RCA do m&ecirc;s&nbsp;<span class="title-periodo"></span></a>
	            </h4>
	        </div>
	        <div id="collapseOne" class="panel-collapse collapse in">
	            <div class="panel-body">
					<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
	            	<div class="table-responsive">
		            	<table id="table-meses" class="table table-striped table-hover table-condensed">
		            		<thead>
		            			<tr>
		            				<th class="fs-txt-left">M&Ecirc;S DO PEDIDO</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('valor')}</th>
		            			</tr>
		            		</thead>
		            		<tbody></tbody>
		            		<tfoot>
		            		</tfoot>
		            	</table>
		            </div>
					<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
				</div>
	        </div>
	    </div>
	    <div class="panel panel-info">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordionextrato">Extrato de comiss&atilde;o de RCA por evento</a>
	            </h4>
	        </div>
	        <div id="collapseOne" class="panel-collapse collapse in">
	            <div class="panel-body">
					<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
	            	<div class="table-responsive">
		            	<table id="table-eventos" class="table table-striped table-hover table-condensed">
		            		<thead>
		            			<tr>
		            				<th class="fs-txt-left">${i18n.getTranslation('codigo')}</th>
		            				<th class="fs-txt-left">${i18n.getTranslation('descricao')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('valor.debito')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('valor.credito')}</th>
		            			</tr>
		            		</thead>
		            		<tbody>
		            		</tbody>
		            		<tfoot>
		            			<tr>
		            				<td colspan=4>
										<a href="#" class="btn btn-primary btn-scroll fs-float-right" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
		            				</td>
		            			</tr>
		            		</tfoot>
		            	</table>
		            </div>
					<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
				</div>
	        </div>
	    </div>
	    <div class="panel panel-info">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordionextrato">${i18n.getTranslation('extrato.comissao.representante.detalhado')}</a>
	            </h4>
	        </div>
	        <div id="collapseThree" class="panel-collapse collapse in">
	            <div class="panel-body">
					<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
	            	<div class="table-responsive">
		            	<table id="table-lancamentos" class="table table-striped table-hover table-condensed">
		            		<thead>
		            			<tr>
		            				<th>${i18n.getTranslation('data.lancto')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('evt')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('carga')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('nota.fiscal')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('pedido')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('parc')}</th>
		            				<th>${i18n.getTranslation('historico')}</th>
		            				<th class="fs-txt-right">${i18n.getTranslation('valor')}</th>
		            				<th class="fs-txt-left">${i18n.getTranslation('d.c')}</th>
		            			</tr>
		            		</thead>
		            		<tbody>
		            		</tbody>
		            		<tfoot>
		            		</tfoot>
		            	</table>
		            </div>
					<a href="#" class="btn btn-primary btn-scroll" data-scroll-to-left role="button"><i class="fluigicon fluigicon-arrow-left icon-xs"></i></a>
				</div>
	        </div>
	    </div>
    </div>	
	
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

