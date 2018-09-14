<div id="campanha_parceiros_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide widget-parceiros"
	data-params="campanhaparceiros.instance({instanceId: ${instanceId}})">

	<div class="page-header">
		<h1>${i18n.getTranslation('posicao.rca.campanha')}</h1>
	</div>
	
	<div class="panel panel-info">
	    <div class="panel-heading">${i18n.getTranslation('campanha.parceiros.100')}</div>
	    <div class="panel-body">
	    	<div class="row">
	    		<div class="col-md-1 col-sm-1 user-avatar">
				    <script type="text/template" class="tpl-avatar">
				    	<img data-update-image-profile="{{userCode}}" data-image-size="X_SMALL_PICTURE" src="/social/api/rest/social/image/profile/{{userCode}}/X_SMALL_PICTURE" class="fluig-style-guide thumb-profile thumb-profile-md"></img>
				    </script>
	    		</div>
	    		
	    		<div class="col-md-11 col-sm-11">
					<form class="form-horizontal" role="form">
						<div class="form-group">
					        <label for="codrca" class="col-sm-1 control-label">${i18n.getTranslation('cod.rca')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="codrca" readonly >
					        </div>
					        <label for="gerencia" class="col-sm-1 control-label">${i18n.getTranslation('gerencia')}</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="gerencia" readonly >
					        </div>
					        <label for="totalpontos" class="col-sm-1 control-label">${i18n.getTranslation('total.pontos')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="totalpontos" readonly >
					        </div>
					    </div>						
						<div class="form-group">
					        <label for="nomerca" class="col-sm-1 control-label">${i18n.getTranslation('nome.rca')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="nomerca" readonly >
					        </div>
					        <label for="equipe" class="col-sm-1 control-label">${i18n.getTranslation('equipe')}</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="equipe" readonly >
					        </div>
					        <label for="colocacao" class="col-sm-1 control-label">${i18n.getTranslation('colocacao')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="colocacao" readonly >
					        </div>
					    </div>						
						<div class="form-group">
					        <label for="divisao" class="col-sm-offset-3 col-sm-1 control-label">${i18n.getTranslation('divisao')}</label>
					        <div class="col-sm-3">
					            <input type="text" class="form-control" id="divisao" readonly >
					        </div>
					        <label for="premio" class="col-sm-1 control-label">${i18n.getTranslation('premio')}</label>
					        <div class="col-sm-2">
					            <input type="text" class="form-control" id="premio" readonly >
					        </div>
					    </div>						
					</form>
	    		</div>
	    	</div>
		</div>
		<div class="panel-footer fs-txt-center" style="height: 40px">
			<label class="label label-info fs-float-left" id="dataprocessamento" style="font-size: 100%;">${i18n.getTranslation('data.proces')}: 10/09/2018</label>
		</div>		
	</div>
	
	<ul class="nav nav-pills clearfix" role="tablist">
	    <li class="active" data-click-tab data-tab="tab-colocacao"><a href="#">COLOCA&Ccedil;&Atilde;O TRIMESTRE</a></li>
	    <li data-click-tab data-tab="tab-detalhamento"><a href="#">DETALHAMENTO</a></li>
	</ul>
	<br>
	<form class="form-inline tab-colocacao" role="form">
		<label>${i18n.getTranslation('ordernar.por')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="ordenar" data-change-ordenar>
    			<option value="ordem" data-type="integer">COLOCA&Ccedil;&Atilde;O</option>
    			<option value="nome" data-type="string">NOME</option>
    			<option value="pontos" data-type="integer">PONTOS</option>
    		</select>
    	</div>
		<label>${i18n.getTranslation('por.pagina')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao" data-change-paginacao>
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
		<label>${i18n.getTranslation('trimestre')}:</label>
    	<div class="form-group">
    		<select class="form-control" id="paginacao" data-change-trimestre>
    			<option value="1">1</option>
    			<option value="2">2</option>
    			<option value="3">3</option>
    			<option value="4">4</option>
    		</select>
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
	
   	<table id="table-ranking" class="table table-striped with-border table-hover table-condensed tab-colocacao">
   		<thead>
   			<tr class="primary">
   				<th class="fs-txt-center">${i18n.getTranslation('codigo')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('nome.rca')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('pontos')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('ordem')}</th>
   				<th>${i18n.getTranslation('premio')}</th>
   				<th class="fs-txt-center">${i18n.getTranslation('equipe')}</th>
   			</tr>
   		</thead>
   		<tbody>
   			<tr class="success">
   				<td class="fs-txt-center">Premiado</td>
   				<td class="fs-txt-center">20683</td>
   				<td>Marcelo</td>
   				<td class="fs-txt-center">10.221,80</td>
   				<td class="fs-txt-center"><span class="fluigicon fluigicon-certificate fluigicon-sm"></span>&nbsp;1.100,00</td>
   				<td>Bahia 2</td>
   			</tr>
   		</tbody>
   	</table>
   	
   	<table id="table-ranking" class="table table-striped with-border table-hover table-condensed tab-detalhamento fs-display-none">
   	</table>
   	
   <script type="text/template" class="tpl-item-ranking">
       {{#items}}
 			<tr class="{{premiado}}">
 				<td class="fs-txt-center">{{codigo}}</td>
 				<td class="fs-txt-center">{{nome}}</td>
 				<td class="fs-txt-center">{{pontos}}</td>
 				<td class="fs-txt-center">{{ordem}}</td>
 				<td>{{premio}}</td>
 				<td class="fs-txt-center">{{equipe}}</td>
 			</tr>
       {{/items}}
   </script>
   	
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

