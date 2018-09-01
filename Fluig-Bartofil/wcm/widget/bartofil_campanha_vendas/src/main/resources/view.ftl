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
	        <div class="col-sm-3">
	            <input type="text" class="form-control" id="busca" placeholder="${i18n.getTranslation('digite.texto')}">
	        </div>
		</form>
	</div>	
	
	<div class="panel-group" id="accordion">
	    <div class="panel panel-info">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion">BCR COMERCIO E INDUSTRIA SA CNPJ 23.797.376/0001-74</a>
	            </h4>
	        </div>
	        <div id="collapseOne" class="panel-collapse collapse in">
	            <div class="panel-body">
					<form class="form-horizontal" role="form">
					    <div class="form-group">
					        <label for="endereco" class="col-sm-2 control-label">${i18n.getTranslation('endereco')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="endereco" readonly value="RODROVIA MG 329 KM 8 - TREVO DE ORATORIOS">
					        </div>
					        <label for="bairro" class="col-sm-2 control-label">${i18n.getTranslation('bairro')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="bairro" placeholder="Email" readonly value="ANA FLORENCIA">
					        </div>
					    </div>
					    <div class="form-group">
					        <label for="cepempresa" class="col-sm-2 control-label">${i18n.getTranslation('cep')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="cepempresa" readonly value="35340-970 - PONTE NOVA - MG">
					        </div>
					        <label for="inscricaoestadual" class="col-sm-2 control-label">${i18n.getTranslation('inscricaoestadual')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="inscricaoestadual" readonly value="21.027881.0023">
					        </div>
					    </div>
					</form>
				</div>
	        </div>
	    </div>
	    <div class="panel panel-info">
	        <div class="panel-heading">
	            <h4 class="panel-title fs-txt-center">
	                <a class="collapse-icon up" data-toggle="collapse" data-parent="#accordion">${i18n.getTranslation('extrato.representante.periodo')}:&nbsp;<span class="dias-periodo"></span></a>
	            </h4>
	        </div>
	        <div id="collapseTwo" class="panel-collapse collapse in">
	            <div class="panel-body">
					<form class="form-horizontal" role="form">
					    <div class="form-group">
					        <label for="nome" class="col-sm-2 control-label">${i18n.getTranslation('nome')}:</label>
					        <div class="col-sm-3">
					            <input type="email" class="form-control" id="nome" readonly value="THIAGO MAIKAE MONTEIRO PLACIDIO - 12252">
					        </div>
					        <label for="sequenciapessoa" class="col-sm-2 control-label">${i18n.getTranslation('seq.pessoa')}:</label>
					        <div class="col-sm-3">
					            <input type="email" class="form-control" id="sequenciapessoa" readonly value="168805">
					        </div>
					    </div>
					    <div class="form-group">
					        <label for="contato" class="col-sm-2 control-label">${i18n.getTranslation('contato')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="contato" readonly value="THIAGO">
					        </div>
					        <label for="cpfcnpj" class="col-sm-2 control-label">${i18n.getTranslation('cpf.cnpj')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="cpfcnpj" readonly value="029.805.466.28">
					        </div>
					    </div>
					    <div class="form-group">
					        <label for="enderecocontato" class="col-sm-2 control-label">${i18n.getTranslation('endereco')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="enderecocontato" readonly value="RUA CARLOS MARQUES, 281, AP01">
					        </div>
					        <label for="bairrocontato" class="col-sm-2 control-label">${i18n.getTranslation('bairro')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="bairrocontato" readonly value="GUARAPERANGA">
					        </div>
					    </div>
					    <div class="form-group">
					        <label for="cidadeuf" class="col-sm-2 control-label">${i18n.getTranslation('cidade.uf')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="cidadeuf" readonly value="PONTE NOVA / MG">
					        </div>
					        <label for="cepcontato" class="col-sm-2 control-label">${i18n.getTranslation('cep')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="cepcontato" readonly value="35430206">
					        </div>
					    </div>
					    <div class="form-group">
					        <label for="core" class="col-sm-2 control-label">${i18n.getTranslation('core')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="core" readonly value="NOTIFICACAO">
					        </div>
					        <label for="inss" class="col-sm-2 control-label">${i18n.getTranslation('inss')}:</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="inss" readonly value="13415359343">
					        </div>
					    </div>
					</form>
	            </div>
	        </div>
	    </div>
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
		            		<thead>
		            			<tr>
		            				<th>${i18n.getTranslation('data.lancto')}</th>
		            				<th>${i18n.getTranslation('evt')}</th>
		            				<th>${i18n.getTranslation('carga')}</th>
		            				<th>${i18n.getTranslation('nota.fiscal')}</th>
		            				<th class="text-uppercase">${i18n.getTranslation('periodo')}</th>
		            				<th class="fs-txt-center">${i18n.getTranslation('parc')}</th>
		            				<th>${i18n.getTranslation('historico')}</th>
		            				<th>${i18n.getTranslation('valor')}</th>
		            				<th class="fs-txt-center">${i18n.getTranslation('d.c')}</th>
		            			</tr>
		            		</thead>
		            		<tbody>
		            		</tbody>
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
		            		<tbody>
		            		</tbody>
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
		            				<th class="fs-txt-center">${i18n.getTranslation('descricao')}</th>
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
