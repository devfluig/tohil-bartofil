<div id="campanha_vendas_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="campanhavendas.instance({instanceId: ${instanceId}, foldercampanha: '${foldercampanha!''}', grouprca: '${grouprca!''}' })">

	<form class="form-horizontal" role="form">
	    <div class="form-group">
	        <label for="foldercampanha" class="col-sm-2 control-label">N&uacute;mero pasta Campanha:</label>
	        <div class="col-sm-3">
	            <input type="text" class="form-control" id="foldercampanha" name="foldercampanha" placeholder="Número" value="${foldercampanha!''}">
	        </div>
	    </div>
	    <div class="form-group">
	        <label for="grouprca" class="col-sm-2 control-label">Grupo RCA:</label>
	        <div class="col-sm-3">
	            <input type="text" class="form-control" id="grouprca" name="grouprca" placeholder="Grupo" value="${grouprca!''}">
	        </div>
	    </div>
    </form>
    <button type="submit" class="btn btn-default" data-save-preferences>Salvar</button>
</div>

<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>

