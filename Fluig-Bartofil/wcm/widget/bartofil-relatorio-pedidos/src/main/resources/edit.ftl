<div id="relatorio_pedidos_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="relatorioPedidos.instance({instanceId: ${instanceId}, grouprca: '${grouprca!''}' })">

	<form class="form-horizontal" role="form">
	    <div class="form-group">
	        <label for="grouprca" class="col-sm-2 control-label">Grupo RCA:</label>
	        <div class="col-sm-3">
	            <input type="text" class="form-control" id="grouprca" name="grouprca" placeholder="Grupo" value="${grouprca!''}">
	        </div>
	    </div>
    </form>
    <button type="submit" class="btn btn-default" data-save-preferences>Salvar</button>

</div>

<script src="/webdesk/vcXMLRPC.js"></script>
